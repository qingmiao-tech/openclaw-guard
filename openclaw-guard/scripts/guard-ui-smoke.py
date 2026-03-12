from __future__ import annotations

import argparse
import sys
import time
from dataclasses import dataclass
from typing import Iterable, List

from playwright.sync_api import Error as PlaywrightError
from playwright.sync_api import Page, TimeoutError as PlaywrightTimeoutError
from playwright.sync_api import sync_playwright

DEFAULT_URL = 'http://127.0.0.1:18088/'
DEFAULT_TIMEOUT_MS = 15000
DEFAULT_LANG_MODE = 'both'
LOADING_TEXT = {
    'zh': '加载中',
    'en': 'Loading',
}
TAB_LABELS = {
    'zh': {
        'overview': '驾驶舱',
        'system': '运维',
        'openclaw': 'OpenClaw',
        'feishu': '飞书',
        'channels': '渠道',
        'ai': 'AI',
        'models': '模型',
        'notifications': '通知',
        'agents': 'Agent',
        'sessions': '会话',
        'activity': '活动',
        'files': '文件',
        'memory': '记忆',
        'search': '搜索',
        'costs': '成本',
        'cron': 'Cron',
        'git-sync': 'Git 同步',
        'security': '安全',
        'audit': '审计',
        'profiles': '预设',
        'harden': '加固',
        'logs': '日志',
    },
    'en': {
        'overview': 'Cockpit',
        'system': 'Operations',
        'openclaw': 'OpenClaw',
        'feishu': 'Feishu',
        'channels': 'Channels',
        'ai': 'AI',
        'models': 'Models',
        'notifications': 'Notifications',
        'agents': 'Agents',
        'sessions': 'Sessions',
        'activity': 'Activity',
        'files': 'Files',
        'memory': 'Memory',
        'search': 'Search',
        'costs': 'Costs',
        'cron': 'Cron',
        'git-sync': 'Git Sync',
        'security': 'Security',
        'audit': 'Audit',
        'profiles': 'Profiles',
        'harden': 'Harden',
        'logs': 'Logs',
    },
}
TAB_ALIASES = {
    'feishu': 'channels',
    'ai': 'models',
    'memory': 'files',
    'audit': 'security',
    'profiles': 'security',
    'harden': 'security',
}
ADVANCED_TABS = {'notifications', 'activity', 'costs', 'cron'}
DEFAULT_TABS = [
    'overview', 'system', 'openclaw', 'channels', 'models', 'agents', 'sessions',
    'files', 'search', 'git-sync', 'security', 'logs',
    'notifications', 'activity', 'costs', 'cron',
]


@dataclass
class SmokeFailure:
    message: str


class GuardUiSmoke:
    def __init__(self, page: Page, args: argparse.Namespace) -> None:
        self.page = page
        self.args = args
        self.console_errors: List[str] = []
        self.page_errors: List[str] = []
        self.failures: List[SmokeFailure] = []
        self.page.on('console', self._on_console)
        self.page.on('pageerror', self._on_page_error)

    def _on_console(self, msg) -> None:
        if msg.type == 'error':
            text = msg.text.strip()
            if text:
                self.console_errors.append(text)

    def _on_page_error(self, error) -> None:
        text = str(error).strip()
        if text:
            self.page_errors.append(text)

    def run(self) -> int:
        self._goto()
        self._ensure_authenticated()
        for lang in self._languages_to_test():
            self._switch_lang(lang)
            self._verify_shell_visible()
            self._verify_language_labels(lang)
            for tab_id in self.args.tabs:
                self._open_tab(tab_id, lang)
        self._report_console_errors()
        return 0 if not self.failures else 1

    def _goto(self) -> None:
        self.page.goto(self.args.url, wait_until='domcontentloaded', timeout=self.args.timeout)
        self.page.wait_for_load_state('networkidle', timeout=self.args.timeout)

    def _ensure_authenticated(self) -> None:
        login_form = self.page.locator('#guard-login-form')
        if not login_form.count():
            return
        if not self.args.password:
            self.failures.append(SmokeFailure('检测到登录页，但未提供 --password。'))
            return
        self.page.fill('#guard-login-pwd', self.args.password)
        self.page.click('#guard-login-btn')
        try:
            self.page.wait_for_selector('[data-tab]', timeout=self.args.timeout)
        except PlaywrightTimeoutError:
            error_text = self.page.locator('#guard-login-error').text_content() or '登录后未进入工作台'
            self.failures.append(SmokeFailure(f'登录失败: {error_text.strip()}'))
            return
        self.page.wait_for_load_state('networkidle', timeout=self.args.timeout)

    def _languages_to_test(self) -> Iterable[str]:
        if self.args.lang == 'both':
            return ('zh', 'en')
        return (self.args.lang,)

    def _switch_lang(self, lang: str) -> None:
        try:
            self.page.click(f'.lang-switch [data-lang="{lang}"]', timeout=self.args.timeout)
        except PlaywrightTimeoutError:
            self.failures.append(SmokeFailure(f'找不到语言切换按钮: {lang}'))
            return
        expected_label = TAB_LABELS[lang]['overview']
        try:
            self.page.wait_for_function(
                "(label) => Array.from(document.querySelectorAll('[data-tab]')).some((el) => (el.textContent || '').includes(label))",
                arg=expected_label,
                timeout=self.args.timeout,
            )
        except PlaywrightTimeoutError:
            self.failures.append(SmokeFailure(f'语言切换到 {lang} 后，导航文案未更新为 {expected_label}'))

    def _verify_shell_visible(self) -> None:
        try:
            self.page.wait_for_selector('[data-tab]', timeout=self.args.timeout)
            self.page.wait_for_selector('#guard-panel', timeout=self.args.timeout)
            self.page.wait_for_selector('.guard-icon-actions [data-global-action="refresh"]', timeout=self.args.timeout)
        except PlaywrightTimeoutError as exc:
            self.failures.append(SmokeFailure(f'工作台骨架未正常渲染: {exc}'))

    def _verify_language_labels(self, lang: str) -> None:
        expected = TAB_LABELS[lang]
        nav_text = ' '.join(self.page.locator('[data-tab]').all_text_contents())
        for key in ('overview', 'system', 'security', 'logs'):
            label = expected[key]
            if label not in nav_text:
                self.failures.append(SmokeFailure(f'{lang} 导航文案缺失: {label}'))

    def _open_tab(self, tab_id: str, lang: str) -> None:
        target_tab = self._normalize_tab_id(tab_id)
        self._ensure_tab_visible(target_tab)
        selector = f'[data-tab="{target_tab}"]'
        label = TAB_LABELS[lang].get(target_tab, TAB_LABELS[lang].get(tab_id, tab_id))
        try:
            self.page.click(selector, timeout=self.args.timeout)
            self.page.wait_for_function(
                "(target) => window.location.hash === '#' + target || !!document.querySelector(`[data-tab=\"${target}\"].active`)",
                arg=target_tab,
                timeout=self.args.timeout,
            )
            self._wait_panel_ready(lang)
            if self.page.locator('#guard-panel .empty').count() and self.page.locator('#guard-panel .empty').first.text_content():
                text = (self.page.locator('#guard-panel .empty').first.text_content() or '').strip()
                if text in {LOADING_TEXT[lang], LOADING_TEXT['zh'], LOADING_TEXT['en']}:
                    raise PlaywrightTimeoutError(f'页签 {tab_id} 停留在 loading')
            if target_tab == 'files':
                self._exercise_files_modes(lang)
            panel_text = (self.page.locator('#guard-panel').text_content() or '').strip()
            if len(panel_text) < 8:
                self.failures.append(SmokeFailure(f'{label} 页内容过少，可能未正常渲染。'))
        except (PlaywrightTimeoutError, PlaywrightError) as exc:
            self.failures.append(SmokeFailure(f'{label} 页打开失败: {exc}'))

    def _ensure_tab_visible(self, tab_id: str) -> None:
        if tab_id not in ADVANCED_TABS:
            return
        if self.page.locator(f'[data-tab="{tab_id}"]').count():
            return
        toggle = self.page.locator('[data-nav-action="toggle-advanced"]')
        if not toggle.count():
            self.failures.append(SmokeFailure(f'找不到展开高级功能的入口，无法打开 {tab_id}'))
            return
        toggle.click()
        self.page.wait_for_selector(f'[data-tab="{tab_id}"]', timeout=self.args.timeout)

    @staticmethod
    def _normalize_tab_id(tab_id: str) -> str:
        return TAB_ALIASES.get(tab_id, tab_id)

    def _exercise_files_modes(self, lang: str) -> None:
        labels = TAB_LABELS[lang]
        all_marker = '当前路径' if lang == 'zh' else 'Current Path'
        memory_marker = '核心记忆' if lang == 'zh' else 'Core Memory'
        try:
            self.page.wait_for_selector('[data-files-mode="all"]', timeout=self.args.timeout)
            self.page.wait_for_selector('[data-files-mode="memory"]', timeout=self.args.timeout)
            self.page.click('[data-files-mode="memory"]', timeout=self.args.timeout)
            self._wait_panel_ready(lang)
            self.page.wait_for_function(
                """
                ([mode, marker]) => {
                    const button = document.querySelector(`[data-files-mode="${mode}"]`);
                    const panel = document.querySelector('#guard-panel');
                    return !!button
                        && button.classList.contains('active')
                        && !!panel
                        && (panel.textContent || '').includes(marker);
                }
                """,
                arg=['memory', memory_marker],
                timeout=self.args.timeout,
            )
            self.page.wait_for_selector('#memory-filter-query', timeout=self.args.timeout)
            panel_text = (self.page.locator('#guard-panel').text_content() or '').strip()
            if memory_marker not in panel_text and 'SOUL' not in panel_text and 'MEMORY' not in panel_text:
                self.failures.append(SmokeFailure(f'{labels["files"]} 页切换到核心记忆视图后，未出现预期内容。'))
            memory_files = self.page.locator('[data-memory-file]')
            if memory_files.count():
                memory_files.first.click(timeout=self.args.timeout)
                self.page.wait_for_selector('[data-memory-action="reveal-in-files"]', timeout=self.args.timeout)
                self.page.click('[data-memory-action="reveal-in-files"]', timeout=self.args.timeout)
            else:
                self.page.click('[data-files-mode="all"]', timeout=self.args.timeout)
            self._wait_panel_ready(lang)
            self.page.wait_for_function(
                """
                ([mode, marker]) => {
                    const button = document.querySelector(`[data-files-mode="${mode}"]`);
                    const panel = document.querySelector('#guard-panel');
                    return !!button
                        && button.classList.contains('active')
                        && !!panel
                        && (panel.textContent || '').includes(marker);
                }
                """,
                arg=['all', all_marker],
                timeout=self.args.timeout,
            )
            panel_text = (self.page.locator('#guard-panel').text_content() or '').strip()
            if all_marker not in panel_text and labels['files'] not in panel_text:
                self.failures.append(SmokeFailure(f'{labels["files"]} 页切回全部文件视图后，未恢复预期内容。'))
        except (PlaywrightTimeoutError, PlaywrightError) as exc:
            self.failures.append(SmokeFailure(f'{labels["files"]} 页模式切换失败: {exc}'))

    def _wait_panel_ready(self, lang: str) -> None:
        loading_tokens = {LOADING_TEXT[lang], LOADING_TEXT['zh'], LOADING_TEXT['en']}
        deadline = time.time() + (self.args.timeout / 1000)
        while time.time() < deadline:
            panel = self.page.locator('#guard-panel')
            if not panel.count():
                time.sleep(0.1)
                continue
            text = (panel.text_content() or '').strip()
            empty_text = ''
            empty_locator = self.page.locator('#guard-panel .empty').first
            if empty_locator.count():
                empty_text = (empty_locator.text_content() or '').strip()
            if text and empty_text not in loading_tokens and text not in loading_tokens:
                return
            time.sleep(0.2)
        raise PlaywrightTimeoutError('页面内容超过超时时间仍未完成渲染')

    def _report_console_errors(self) -> None:
        for item in self.console_errors:
            self.failures.append(SmokeFailure(f'控制台 error: {item}'))
        for item in self.page_errors:
            self.failures.append(SmokeFailure(f'页面异常: {item}'))

    def print_report(self) -> None:
        if not self.failures:
            langs = ', '.join(self._languages_to_test())
            tabs = ', '.join(self.args.tabs)
            print(f'PASS guard-ui smoke | url={self.args.url} | lang={langs} | tabs={tabs}')
            return
        print('FAIL guard-ui smoke')
        for index, failure in enumerate(self.failures, start=1):
            print(f'{index}. {failure.message}')


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description='OpenClaw Guard UI smoke test')
    parser.add_argument('--url', default=DEFAULT_URL, help=f'Guard UI URL, default: {DEFAULT_URL}')
    parser.add_argument('--lang', choices=('zh', 'en', 'both'), default=DEFAULT_LANG_MODE, help='Language mode to verify')
    parser.add_argument('--password', default='', help='Login password if Guard auth is enabled')
    parser.add_argument('--timeout', type=int, default=DEFAULT_TIMEOUT_MS, help='Timeout in milliseconds for each wait')
    parser.add_argument('--tabs', default=','.join(DEFAULT_TABS), help='Comma separated tab ids to verify')
    parser.add_argument('--headed', action='store_true', help='Run browser in headed mode for debugging')
    args = parser.parse_args()
    args.tabs = [item.strip() for item in str(args.tabs).split(',') if item.strip()]
    return args


def main() -> int:
    args = parse_args()
    with sync_playwright() as playwright:
        browser = playwright.chromium.launch(headless=not args.headed)
        page = browser.new_page(viewport={'width': 1440, 'height': 1100})
        smoke = GuardUiSmoke(page, args)
        try:
            code = smoke.run()
        finally:
            smoke.print_report()
            browser.close()
    return code


if __name__ == '__main__':
    sys.exit(main())
