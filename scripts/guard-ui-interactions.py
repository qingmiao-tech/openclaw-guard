from __future__ import annotations

import argparse
import sys
import time
from dataclasses import dataclass
from pathlib import PurePosixPath, PureWindowsPath
from typing import Iterable, List, Optional

from playwright.sync_api import Error as PlaywrightError
from playwright.sync_api import Page, TimeoutError as PlaywrightTimeoutError
from playwright.sync_api import sync_playwright

DEFAULT_URL = 'http://127.0.0.1:18088/'
DEFAULT_TIMEOUT_MS = 15000

@dataclass
class InteractionFailure:
    message: str


class GuardUiInteractions:
    def __init__(self, page: Page, args: argparse.Namespace) -> None:
        self.page = page
        self.args = args
        self.failures: List[InteractionFailure] = []
        self.console_errors: List[str] = []
        self.page_errors: List[str] = []
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
            self._exercise_chrome_controls(lang)
            self._exercise_notifications(lang)
            self._exercise_files(lang)
            self._exercise_security(lang)
            self._exercise_git_sync(lang)
        self._report_runtime_errors()
        return 0 if not self.failures else 1

    def _goto(self) -> None:
        self.page.goto(self.args.url, wait_until='domcontentloaded', timeout=self.args.timeout)
        self._wait_for_shell_or_login()

    def _wait_for_shell_or_login(self) -> None:
        self.page.wait_for_function(
            "() => !!document.querySelector('[data-tab]') || !!document.querySelector('#guard-login-form')",
            timeout=self.args.timeout,
        )
        self.page.wait_for_timeout(300)

    def _ensure_authenticated(self) -> None:
        if not self.page.locator('#guard-login-form').count():
            return
        if not self.args.password:
            self.failures.append(InteractionFailure('检测到登录页，但未提供 --password。'))
            return
        self.page.fill('#guard-login-pwd', self.args.password)
        self.page.click('#guard-login-btn')
        self.page.wait_for_selector('[data-tab]', timeout=self.args.timeout)
        self.page.wait_for_timeout(300)

    def _languages_to_test(self) -> Iterable[str]:
        if self.args.lang == 'both':
            return ('zh', 'en')
        return (self.args.lang,)

    def _open_top_menu(self, menu_id: str) -> None:
        self.page.click(f'[data-top-menu-trigger="{menu_id}"]', timeout=self.args.timeout, force=True)
        self.page.wait_for_function(
            "(menuId) => !!document.querySelector(`[data-top-menu=\"${menuId}\"].open`)",
            arg=menu_id,
            timeout=self.args.timeout,
        )

    def _switch_lang(self, lang: str) -> None:
        try:
            self._open_top_menu('lang')
            self.page.click(f'[data-top-menu="lang"].open [data-lang="{lang}"]', timeout=self.args.timeout, force=True)
            self.page.wait_for_function(
                "(target) => window.localStorage.getItem('openclaw-guard.lang') === target",
                arg=lang,
                timeout=self.args.timeout,
            )
            self.page.wait_for_function(
                "(target) => Array.from(document.querySelectorAll('[data-tab]')).some((node) => (node.textContent || '').trim() === target || (node.textContent || '').includes(target))",
                arg='Home' if lang == 'en' else '首页',
                timeout=self.args.timeout,
            )
            self.page.wait_for_function(
                "(menuId) => !document.querySelector(`[data-top-menu=\"${menuId}\"].open`)",
                arg='lang',
                timeout=self.args.timeout,
            )
            self.page.wait_for_timeout(250)
        except (PlaywrightTimeoutError, PlaywrightError) as exc:
            self.failures.append(InteractionFailure(f'{lang} 语言切换测试失败: {exc}'))

    def _exercise_chrome_controls(self, lang: str) -> None:
        try:
            target_theme = 'dark' if lang == 'zh' else 'light'
            self._open_top_menu('theme')
            self.page.click(f'[data-top-menu="theme"].open [data-theme-pref="{target_theme}"]', timeout=self.args.timeout)
            self.page.wait_for_function(
                "(pref) => document.documentElement.dataset.themePreference === pref",
                arg=target_theme,
                timeout=self.args.timeout,
            )
            self._open_top_menu('theme')
            self.page.click('[data-top-menu="theme"].open [data-theme-pref="auto"]', timeout=self.args.timeout)
            self.page.wait_for_function(
                "() => document.documentElement.dataset.themePreference === 'auto'",
                timeout=self.args.timeout,
            )
        except (PlaywrightTimeoutError, PlaywrightError) as exc:
            self.failures.append(InteractionFailure(f'{lang} 顶部控制交互测试失败: {exc}'))

    def _open_tab(self, tab_id: str) -> None:
        self.page.click(f'[data-tab="{tab_id}"]', timeout=self.args.timeout)
        self.page.wait_for_function(
            "(target) => window.location.hash === '#' + target || !!document.querySelector(`[data-tab=\"${target}\"].active`)",
            arg=tab_id,
            timeout=self.args.timeout,
        )
        self._wait_panel_ready()

    def _wait_panel_ready(self) -> None:
        deadline = time.time() + (self.args.timeout / 1000)
        while time.time() < deadline:
            panel = self.page.locator('#guard-panel')
            if not panel.count():
                time.sleep(0.1)
                continue
            if self.page.locator('#guard-panel .guard-loading-card').count():
                time.sleep(0.2)
                continue
            text = (panel.text_content() or '').strip()
            empty_locator = self.page.locator('#guard-panel .empty').first
            empty_text = (empty_locator.text_content() or '').strip() if empty_locator.count() else ''
            if text and text not in {'加载中', 'Loading'} and empty_text not in {'加载中', 'Loading'}:
                return
            time.sleep(0.2)
        raise PlaywrightTimeoutError('页面内容超过超时时间仍未完成渲染')

    def _dismiss_modal_if_present(self) -> bool:
        overlay = self.page.locator('.guard-modal-overlay')
        if not overlay.count():
            return False
        if self.page.locator('[data-dialog-cancel]').count():
            self.page.click('[data-dialog-cancel]')
        elif self.page.locator('[data-dialog-close]').count():
            self.page.click('[data-dialog-close]')
        else:
            self.page.press('body', 'Escape')
        self.page.wait_for_timeout(150)
        return True

    def _exercise_notifications(self, lang: str) -> None:
        try:
            self._open_tab('notifications')
            self.page.evaluate("() => document.querySelector('[data-notify-view=\"reminders\"]')?.click()")
            self.page.wait_for_selector('#notify-search', timeout=self.args.timeout)
            self.page.evaluate("() => document.querySelector('[data-notify-view=\"timeline\"]')?.click()")
            self.page.wait_for_timeout(300)
            self.page.evaluate("() => document.querySelector('[data-notify-view=\"reminders\"]')?.click()")
            self.page.wait_for_selector('#notify-search', timeout=self.args.timeout)
            self.page.fill('#notify-search', 'session')
            self.page.wait_for_timeout(250)
            self.page.fill('#notify-search', '')
            self.page.wait_for_timeout(250)
            clear_button = self.page.locator('[data-notify-bulk="clear-all"]')
            if clear_button.count():
                clear_button.click()
                self.page.wait_for_selector('.guard-modal-overlay', timeout=self.args.timeout)
                self._dismiss_modal_if_present()
        except (PlaywrightTimeoutError, PlaywrightError) as exc:
            self.failures.append(InteractionFailure(f'{lang} 通知交互测试失败: {exc}'))

    def _exercise_files(self, lang: str) -> None:
        try:
            self._open_tab('files')
            self.page.wait_for_selector('[data-file-action="new-file"]', timeout=self.args.timeout)
            self.page.click('[data-file-action="new-file"]')
            self.page.wait_for_selector('.guard-modal-overlay', timeout=self.args.timeout)
            self._dismiss_modal_if_present()

            pair = self._find_two_files()
            if not pair:
                self.failures.append(InteractionFailure(f'{lang} 文件交互测试失败: 当前受控目录下没有找到两个可切换文件。'))
                return

            first_path, second_path = pair
            self._click_file_entry(first_path)
            self.page.wait_for_timeout(500)
            self._wait_for_file_editor(first_path)

            self._click_file_entry(second_path)
            self.page.wait_for_timeout(600)
            if self.page.locator('.guard-modal-overlay').count():
                raise PlaywrightTimeoutError('未修改内容时切换文件仍弹出了未保存确认框')
            self._wait_for_file_editor(second_path)

            self._click_file_entry(first_path)
            self.page.wait_for_timeout(500)
            self._wait_for_file_editor(first_path)
            editor = self.page.locator('#file-editor')
            original = editor.input_value()
            editor.fill(original + '\n# guard ui interaction smoke')
            self._click_file_entry(second_path)
            self.page.wait_for_selector('.guard-modal-overlay', timeout=self.args.timeout)
            self.page.click('[data-dialog-cancel]')
            self.page.wait_for_timeout(400)
            self._wait_for_file_editor(first_path)
            if '# guard ui interaction smoke' not in self.page.locator('#file-editor').input_value():
                raise PlaywrightTimeoutError('取消切换后，当前编辑内容没有被保留。')
            self._click_file_entry(second_path)
            self.page.wait_for_selector('.guard-modal-overlay', timeout=self.args.timeout)
            self.page.click('[data-dialog-confirm]')
            self.page.wait_for_timeout(600)
            self._wait_for_file_editor(second_path)
        except (PlaywrightTimeoutError, PlaywrightError) as exc:
            self.failures.append(InteractionFailure(f'{lang} 文件交互测试失败: {exc}'))

    def _exercise_security(self, lang: str) -> None:
        try:
            self._open_tab('security')
            self.page.wait_for_selector('[data-security-view="audit"]', timeout=self.args.timeout)
            self.page.click('[data-security-view="modes"]')
            self.page.wait_for_selector('[data-security-view="modes"].active', timeout=self.args.timeout)
            self.page.wait_for_timeout(350)
            self.page.click('[data-security-view="hardening"]')
            self.page.wait_for_selector('[data-security-view="hardening"].active', timeout=self.args.timeout)
            self.page.wait_for_selector('[data-security-platform]', timeout=self.args.timeout)
            self.page.click('[data-security-view="audit"]')
            self.page.wait_for_selector('[data-security-view="audit"].active', timeout=self.args.timeout)
            self.page.wait_for_timeout(350)
            panel_text = (self.page.locator('#guard-panel').text_content() or '').strip()
            expected = '安全检查' if lang == 'zh' else 'Security Checks'
            if expected not in panel_text:
                raise PlaywrightTimeoutError(f'安全页切回审计后未出现预期文案: {expected}')
        except (PlaywrightTimeoutError, PlaywrightError) as exc:
            self.failures.append(InteractionFailure(f'{lang} 安全页交互测试失败: {exc}'))

    def _find_two_files(self) -> Optional[List[str]]:
        visited_dirs = set()
        root_paths = self.page.locator('[data-root-path]').evaluate_all(
            "(nodes) => nodes.map((node) => node.getAttribute('data-root-path')).filter(Boolean)"
        )
        for root_path in [None, *root_paths]:
            if root_path:
                self.page.evaluate(
                    "(target) => { const el = Array.from(document.querySelectorAll('[data-root-path]')).find((node) => node.getAttribute('data-root-path') === target); if (el) el.click(); }",
                    root_path,
                )
                self._wait_panel_ready()
                self.page.wait_for_timeout(400)
            for _ in range(10):
                entries = self.page.locator('[data-file-entry]').evaluate_all(
                    "(nodes) => nodes.map((node) => ({ path: node.getAttribute('data-file-entry'), type: node.getAttribute('data-entry-type') }))"
                )
                files = [item['path'] for item in entries if item.get('type') == 'file' and item.get('path')]
                if len(files) >= 2:
                    self.page.wait_for_timeout(500)
                    return files[:2]
                dirs = [item['path'] for item in entries if item.get('type') == 'dir' and item.get('path') and item.get('path') not in visited_dirs]
                if dirs:
                    next_dir = dirs[0]
                    visited_dirs.add(next_dir)
                    self.page.evaluate(
                        "(target) => { const el = Array.from(document.querySelectorAll('[data-file-entry][data-entry-type=\"dir\"]')).find((node) => node.getAttribute('data-file-entry') === target); if (el) el.click(); }",
                        next_dir,
                    )
                    self._wait_panel_ready()
                    self.page.wait_for_timeout(400)
                    continue
                up_button = self.page.locator('[data-file-action="go-up"]')
                if up_button.count() and up_button.get_attribute('disabled') is None:
                    up_button.click()
                    self._wait_panel_ready()
                    self.page.wait_for_timeout(400)
                    continue
                break
        return None

    def _click_file_entry(self, target_path: str) -> None:
        self.page.evaluate(
            "(target) => { const el = Array.from(document.querySelectorAll('[data-file-entry][data-entry-type=\"file\"]')).find((node) => node.getAttribute('data-file-entry') === target); if (el) el.click(); }",
            target_path,
        )

    def _wait_for_file_editor(self, target_path: str) -> None:
        target_name = self._basename(target_path)
        deadline = time.time() + (self.args.timeout / 1000)
        while time.time() < deadline:
            editor = self.page.locator('#file-editor')
            if editor.count():
                heading = editor.evaluate("(node) => node.closest('.card')?.querySelector('h3')?.textContent || ''")
                if target_name in str(heading):
                    return
            self.page.wait_for_timeout(200)
        raise PlaywrightTimeoutError(f'编辑器没有切到目标文件: {target_name}')

    def _exercise_git_sync(self, lang: str) -> None:
        try:
            self._open_tab('git-sync')
            self.page.wait_for_selector('[data-git-sync-view="recovery"]', timeout=self.args.timeout)
            self.page.click('[data-git-sync-view="recovery"]', timeout=self.args.timeout, force=True)
            self.page.wait_for_timeout(300)
            self.page.click('[data-git-sync-view="advanced"]', timeout=self.args.timeout, force=True)
            self.page.wait_for_selector('[data-git-action="check-sync"]', timeout=self.args.timeout)
            self.page.click('[data-git-sync-advanced-view="scope"]', timeout=self.args.timeout, force=True)
            self.page.wait_for_selector('[data-git-action="copy-stageable-list"]', timeout=self.args.timeout)
            self.page.click('[data-git-sync-advanced-view="gitignore"]', timeout=self.args.timeout, force=True)
            self.page.wait_for_selector('[data-git-action="preview-gitignore"]', timeout=self.args.timeout)
            self.page.click('[data-git-action="preview-gitignore"]')
            self.page.wait_for_timeout(500)
            self.page.click('[data-git-action="copy-embedded-guide"]')
            self.page.wait_for_timeout(400)
            self.page.click('[data-git-sync-advanced-view="auth"]', timeout=self.args.timeout, force=True)
            self.page.wait_for_selector('[data-git-action="connect"]', timeout=self.args.timeout)
            self.page.click('[data-git-sync-advanced-view="overview"]', timeout=self.args.timeout, force=True)
            self.page.wait_for_selector('[data-git-action="check-sync"]', timeout=self.args.timeout)
            self.page.click('[data-git-sync-view="recovery"]', timeout=self.args.timeout, force=True)
            self.page.wait_for_timeout(300)
            if self.page.locator('.guard-modal-overlay').count():
                self._dismiss_modal_if_present()
            toast = self.page.locator('#guard-toast')
            if toast.count():
                toast_text = (toast.text_content() or '').strip()
                if toast_text and 'error' in (toast.get_attribute('class') or ''):
                    raise PlaywrightTimeoutError(f'备份与恢复提示返回错误: {toast_text}')
        except (PlaywrightTimeoutError, PlaywrightError) as exc:
            self.failures.append(InteractionFailure(f'{lang} 备份与恢复交互测试失败: {exc}'))

    def _report_runtime_errors(self) -> None:
        for item in self.console_errors:
            self.failures.append(InteractionFailure(f'控制台 error: {item}'))
        for item in self.page_errors:
            self.failures.append(InteractionFailure(f'页面异常: {item}'))

    def print_report(self) -> None:
        if not self.failures:
            langs = ', '.join(self._languages_to_test())
            print(f'PASS guard-ui interactions | url={self.args.url} | lang={langs}')
            return
        print('FAIL guard-ui interactions')
        for index, failure in enumerate(self.failures, start=1):
            print(f'{index}. {failure.message}')

    @staticmethod
    def _basename(value: str) -> str:
        if '\\' in value:
            return PureWindowsPath(value).name
        return PurePosixPath(value).name


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description='OpenClaw Guard UI interaction smoke test')
    parser.add_argument('--url', default=DEFAULT_URL, help=f'Guard UI URL, default: {DEFAULT_URL}')
    parser.add_argument('--lang', choices=('zh', 'en', 'both'), default='both', help='Language mode to verify')
    parser.add_argument('--password', default='', help='Login password if Guard auth is enabled')
    parser.add_argument('--timeout', type=int, default=DEFAULT_TIMEOUT_MS, help='Timeout in milliseconds for each wait')
    parser.add_argument('--headed', action='store_true', help='Run browser in headed mode for debugging')
    return parser.parse_args()


def main() -> int:
    args = parse_args()
    with sync_playwright() as playwright:
        browser = playwright.chromium.launch(headless=not args.headed)
        page = browser.new_page(viewport={'width': 1440, 'height': 1100})
        suite = GuardUiInteractions(page, args)
        try:
            code = suite.run()
        finally:
            suite.print_report()
            browser.close()
    return code


if __name__ == '__main__':
    sys.exit(main())
