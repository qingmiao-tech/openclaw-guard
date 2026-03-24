from __future__ import annotations

import argparse
import sys
from dataclasses import dataclass
from typing import List
from urllib.parse import urlsplit

from playwright.sync_api import Error as PlaywrightError
from playwright.sync_api import Page, TimeoutError as PlaywrightTimeoutError
from playwright.sync_api import sync_playwright

DEFAULT_URL = 'http://127.0.0.1:18088/'
DEFAULT_TIMEOUT_MS = 15000
ENTRY_PATHS = ['/', '/workbench', '/next']
TARGET_ROUTES = [
    '#/',
    '#/operations',
    '#/openclaw',
    '#/channels',
    '#/models',
    '#/security',
    '#/recovery',
    '#/roles',
    '#/files',
    '#/search',
    '#/sessions',
    '#/logs',
    '#/notifications',
    '#/cron',
    '#/settings',
]


@dataclass
class SmokeFailure:
    message: str


class GuardNextSmoke:
    def __init__(self, page: Page, args: argparse.Namespace) -> None:
        self.page = page
        self.args = args
        self.failures: List[SmokeFailure] = []
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
        self._verify_entry_points()
        self._open_next_shell()
        self._login_if_needed()
        self._verify_shell()
        self._visit_routes()
        self._verify_cron_editor_flow()
        self._verify_files_draft_protection()
        self._verify_recovery_flow()
        self._verify_developer_mode_toggle()
        self._open_theme_menu()
        self._open_language_menu()
        self._logout()
        self._report_runtime_errors()
        return 0 if not self.failures else 1

    def _open_next_shell(self) -> None:
        self.page.goto(self.args.url, wait_until='domcontentloaded', timeout=self.args.timeout)
        self.page.wait_for_function(
            "() => !!document.querySelector('.login-screen') || !!document.querySelector('.guard-shell')",
            timeout=self.args.timeout,
        )
        self.page.wait_for_timeout(300)

    def _verify_entry_points(self) -> None:
        parsed = urlsplit(self.args.url)
        base = f'{parsed.scheme}://{parsed.netloc}'.rstrip('/')
        for entry_path in ENTRY_PATHS:
            try:
                self.page.goto(f'{base}{entry_path}', wait_until='domcontentloaded', timeout=self.args.timeout)
                self.page.wait_for_function(
                    "() => !!document.querySelector('.login-screen') || !!document.querySelector('.guard-shell')",
                    timeout=self.args.timeout,
                )
            except (PlaywrightTimeoutError, PlaywrightError) as exc:
                self.failures.append(SmokeFailure(f'Entry {entry_path} failed: {exc}'))

    def _login_if_needed(self) -> None:
        if not self.page.locator('.login-screen').count():
            return
        self._assert_login_form_rendered()
        if not self.args.password:
            self.failures.append(SmokeFailure('Login page is visible but --password is missing.'))
            return
        try:
            self.page.fill('.login-form input[type="password"]', self.args.password)
            self.page.click('.login-submit')
            self.page.wait_for_selector('.guard-shell', timeout=self.args.timeout)
        except (PlaywrightTimeoutError, PlaywrightError) as exc:
            error_text = (self.page.locator('.login-error').first.text_content() or '').strip()
            detail = error_text or str(exc)
            self.failures.append(SmokeFailure(f'Login failed: {detail}'))

    def _assert_login_form_rendered(self) -> None:
        try:
            self.page.wait_for_selector('.login-card', timeout=self.args.timeout)
            self.page.wait_for_selector('.login-form input[type="password"]', timeout=self.args.timeout)
            self.page.wait_for_selector('.login-submit', timeout=self.args.timeout)
        except PlaywrightTimeoutError as exc:
            self.failures.append(SmokeFailure(f'Login screen did not render correctly: {exc}'))

    def _verify_shell(self) -> None:
        try:
            self.page.wait_for_selector('.guard-shell', timeout=self.args.timeout)
            self.page.wait_for_selector('.guard-shell__sidebar', timeout=self.args.timeout)
            self.page.wait_for_selector('.guard-shell__content', timeout=self.args.timeout)
            self.page.wait_for_selector('.topbar-actions .toolbar-menu', timeout=self.args.timeout)
        except PlaywrightTimeoutError as exc:
            self.failures.append(SmokeFailure(f'Next shell did not render correctly: {exc}'))

    def _visit_routes(self) -> None:
        base = self.args.url.split('#', 1)[0]
        for route_hash in TARGET_ROUTES:
            try:
                self.page.goto(f'{base}{route_hash}', wait_until='domcontentloaded', timeout=self.args.timeout)
                self.page.wait_for_selector('.guard-shell', timeout=self.args.timeout)
                self.page.wait_for_function(
                    "(expectedHash) => window.location.hash === expectedHash",
                    arg=route_hash,
                    timeout=self.args.timeout,
                )
                self.page.wait_for_selector('.page-stack', timeout=self.args.timeout)
            except (PlaywrightTimeoutError, PlaywrightError) as exc:
                self.failures.append(SmokeFailure(f'Route {route_hash} failed: {exc}'))

    def _verify_cron_editor_flow(self) -> None:
        base = self.args.url.split('#', 1)[0]
        cron_url = f'{base}#/cron'
        try:
            self.page.goto(cron_url, wait_until='domcontentloaded', timeout=self.args.timeout)
            self.page.wait_for_selector('.page-stack', timeout=self.args.timeout)
            self.page.wait_for_selector('[data-testid="cron-filter-all"]', timeout=self.args.timeout)
            self.page.wait_for_selector('[data-testid="cron-editor-name"]', timeout=self.args.timeout)

            for filter_id in ['enabled', 'disabled', 'all']:
                selector = f'[data-testid="cron-filter-{filter_id}"]'
                self.page.click(selector)
                self.page.wait_for_timeout(150)
                class_name = self.page.locator(selector).first.get_attribute('class') or ''
                if 'pill-button--active' not in class_name:
                    self.failures.append(SmokeFailure(f'Cron filter {filter_id} should become active when clicked.'))

            name_input = self.page.locator('[data-testid="cron-editor-name"]').first
            original_name = name_input.input_value()
            draft_name = 'guard-next-smoke-draft'

            name_input.fill(draft_name)
            self.page.wait_for_timeout(150)
            self.page.click('[data-testid="cron-editor-reset"]')
            self.page.wait_for_timeout(200)
            if name_input.input_value() == draft_name:
                self.failures.append(SmokeFailure('Cron editor reset should discard the temporary draft input.'))

            if original_name and name_input.input_value() == original_name:
                self.page.wait_for_timeout(50)

            job_cards = self.page.locator('[data-testid="cron-job-card"]')
            if not job_cards.count():
                print('[guard-next-smoke] SKIP cron edit flow: no cron jobs were available')
                return

            self.page.locator('[data-testid="cron-job-edit"]').first.click()
            self.page.wait_for_timeout(250)

            mode_pill = self.page.locator('[data-testid="cron-editor-mode"]').first
            mode_class = mode_pill.get_attribute('class') or ''
            if 'pill--warning' not in mode_class:
                self.failures.append(SmokeFailure('Cron editor should switch into edit mode after clicking Edit.'))

            if not name_input.input_value().strip():
                self.failures.append(SmokeFailure('Cron edit mode should hydrate the editor with the selected job draft.'))

            self.page.click('[data-testid="cron-editor-reset"]')
            self.page.wait_for_timeout(250)
            mode_class = mode_pill.get_attribute('class') or ''
            if 'pill--success' not in mode_class:
                self.failures.append(SmokeFailure('Cron editor reset should return the editor to create mode.'))
        except (PlaywrightTimeoutError, PlaywrightError) as exc:
            self.failures.append(SmokeFailure(f'Cron editor flow failed: {exc}'))

    def _verify_files_draft_protection(self) -> None:
        base = self.args.url.split('#', 1)[0]
        files_url = f'{base}#/files'
        settings_hash = '#/settings'
        try:
            self.page.goto(files_url, wait_until='domcontentloaded', timeout=self.args.timeout)
            self.page.wait_for_selector('.page-stack', timeout=self.args.timeout)
            editor_kind = self._open_first_editable_entry()
            if not editor_kind:
                print('[guard-next-smoke] SKIP files draft protection: no editable file or memory entry was available')
                return

            textarea_selector = '[data-testid="file-editor-textarea"]' if editor_kind == 'file' else '[data-testid="memory-editor-textarea"]'
            state_selector = '[data-testid="file-editor-state"]' if editor_kind == 'file' else '[data-testid="memory-editor-state"]'
            textarea = self.page.locator(textarea_selector).first

            original_value = textarea.input_value()
            marker = '\n# guard-next-smoke-unsaved-draft'
            draft_value = original_value + (marker if marker not in original_value else '\n# guard-next-smoke-unsaved-draft-2')

            textarea.fill(draft_value)
            self.page.wait_for_timeout(200)
            self.page.click('[data-testid="files-soft-refresh"]')
            self.page.wait_for_timeout(500)

            if textarea.input_value() != draft_value:
                self.failures.append(SmokeFailure('Files soft refresh should preserve the current unsaved editor draft.'))

            state_class = self.page.locator(state_selector).first.get_attribute('class') or ''
            if 'pill--warning' not in state_class:
                self.failures.append(SmokeFailure('Files editor should remain in the unsaved state after a soft refresh.'))

            self.page.evaluate("(nextHash) => { window.location.hash = nextHash; }", settings_hash)
            self.page.wait_for_selector('.confirm-dialog', timeout=self.args.timeout)
            self.page.click('.confirm-dialog__footer .inline-link:first-child')
            self.page.wait_for_function(
                "() => window.location.hash === '#/files'",
                timeout=self.args.timeout,
            )

            self.page.evaluate("(nextHash) => { window.location.hash = nextHash; }", settings_hash)
            self.page.wait_for_selector('.confirm-dialog', timeout=self.args.timeout)
            self.page.click('.confirm-dialog__footer .inline-link:last-child')
            self.page.wait_for_function(
                "() => window.location.hash === '#/settings'",
                timeout=self.args.timeout,
            )
            self.page.wait_for_selector('.page-stack', timeout=self.args.timeout)
        except (PlaywrightTimeoutError, PlaywrightError) as exc:
            self.failures.append(SmokeFailure(f'Files draft protection flow failed: {exc}'))

    def _verify_recovery_flow(self) -> None:
        base = self.args.url.split('#', 1)[0]
        recovery_url = f'{base}#/recovery'
        try:
            self.page.goto(recovery_url, wait_until='domcontentloaded', timeout=self.args.timeout)
            self.page.wait_for_selector('.page-stack', timeout=self.args.timeout)
            self.page.wait_for_selector('[data-tab-id="center"]', timeout=self.args.timeout)
            self.page.wait_for_selector('[data-testid="recovery-save-input"]', timeout=self.args.timeout)

            save_input = self.page.locator('[data-testid="recovery-save-input"]').first
            save_input.fill('guard-next-smoke-recovery-draft')
            self.page.wait_for_timeout(150)
            if save_input.input_value() != 'guard-next-smoke-recovery-draft':
                self.failures.append(SmokeFailure('Recovery save label input should accept a temporary draft value.'))

            self.page.click('[data-tab-id="advanced"]')
            self.page.wait_for_function(
                "() => document.querySelector('[data-tab-id=\"advanced\"]')?.getAttribute('aria-selected') === 'true'",
                timeout=self.args.timeout,
            )
            self.page.wait_for_selector('[data-testid="recovery-remote-url"]', timeout=self.args.timeout)

            remote_url = self.page.locator('[data-testid="recovery-remote-url"]').first
            remote_url.fill('https://github.com/example/guard-next-smoke.git')
            self.page.wait_for_timeout(150)
            if remote_url.input_value() != 'https://github.com/example/guard-next-smoke.git':
                self.failures.append(SmokeFailure('Recovery remote URL field should remain editable in advanced mode.'))

            self.page.click('[data-tab-id="center"]')
            self.page.wait_for_function(
                "() => document.querySelector('[data-tab-id=\"center\"]')?.getAttribute('aria-selected') === 'true'",
                timeout=self.args.timeout,
            )
            self.page.wait_for_selector('[data-testid="recovery-save-input"]', timeout=self.args.timeout)

            recovery_points = self.page.locator('[data-testid="recovery-point-card"]')
            if recovery_points.count():
                if not self.page.locator('[data-testid="recovery-restore-button"]').first.count():
                    self.failures.append(SmokeFailure('Recovery timeline should render a restore button when recovery points exist.'))
            else:
                empty_state = (self.page.locator('.page-empty').last.text_content() or '').strip()
                if not empty_state:
                    self.failures.append(SmokeFailure('Recovery empty state should remain readable when no recovery points exist.'))
        except (PlaywrightTimeoutError, PlaywrightError) as exc:
            self.failures.append(SmokeFailure(f'Recovery flow failed: {exc}'))

    def _open_first_editable_entry(self) -> str | None:
        all_tab = self.page.locator('.page-tabs__button[data-tab-id="all"]').first
        if all_tab.count():
            all_tab.click()
            self.page.wait_for_function(
                "() => document.querySelector('.page-tabs__button[data-tab-id=\"all\"]')?.getAttribute('aria-selected') === 'true'",
                timeout=self.args.timeout,
            )
        self.page.wait_for_selector('.catalog-list__item[data-root-id]', timeout=self.args.timeout)
        self.page.wait_for_timeout(250)

        root_ids = self.page.eval_on_selector_all(
            '.catalog-list__item[data-root-id]',
            "(nodes) => nodes.map((node) => node.getAttribute('data-root-id') || '').filter(Boolean)",
        )
        prioritized_root_ids = self._prioritize_root_ids(root_ids)
        for root_id in prioritized_root_ids:
            if not self._select_files_root(root_id):
                continue
            editor_kind = self._open_editable_entry_in_current_root()
            if editor_kind:
                return editor_kind

        memory_tab = self.page.locator('.page-tabs__button[data-tab-id="memory"]').first
        if memory_tab.count():
            memory_tab.click()
            self.page.wait_for_function(
                "() => document.querySelector('.page-tabs__button[data-tab-id=\"memory\"]')?.getAttribute('aria-selected') === 'true'",
                timeout=self.args.timeout,
            )
            self.page.wait_for_timeout(300)

        memory_entries = self.page.locator('[data-entry-kind="memory"]')
        if memory_entries.count():
            memory_entries.first.click()
            self.page.wait_for_selector('[data-testid="memory-editor-textarea"]', timeout=self.args.timeout)
            return 'memory'

        if prioritized_root_ids:
            current_path = self.page.locator('.mini-list__item--stack p').first.text_content() or ''
            print(
                '[guard-next-smoke] Files roots inspected but no editable entry was found. '
                f'roots={prioritized_root_ids} currentPath={current_path.strip()}'
            )
        return None

    def _prioritize_root_ids(self, root_ids: list[str]) -> list[str]:
        normalized = [root_id for root_id in root_ids if root_id]
        if not self.args.fixture_root_id:
            return normalized

        preferred = [root_id for root_id in normalized if self.args.fixture_root_id in root_id]
        fallback = [root_id for root_id in normalized if self.args.fixture_root_id not in root_id]
        return preferred + fallback

    def _select_files_root(self, root_id: str) -> bool:
        selector = f'.catalog-list__item[data-root-id="{root_id}"]'
        root = self.page.locator(selector).first
        if not root.count():
            return False

        root.click()
        self.page.wait_for_function(
            """
            (selectedRootId) => {
              const root = document.querySelector(`.catalog-list__item[data-root-id="${selectedRootId}"]`);
              return !!root && root.classList.contains('catalog-list__item--active');
            }
            """,
            arg=root_id,
            timeout=self.args.timeout,
        )
        self.page.wait_for_timeout(200)
        return True

    def _open_editable_entry_in_current_root(self) -> str | None:
        for _ in range(4):
            file_entries = self.page.locator('[data-entry-kind="file"]')
            if file_entries.count():
                file_entries.first.click()
                self.page.wait_for_selector('[data-testid="file-editor-textarea"]', timeout=self.args.timeout)
                return 'file'

            directory_entries = self.page.locator('[data-entry-kind="directory"]')
            if not directory_entries.count():
                break
            directory_entries.first.click()
            self.page.wait_for_timeout(250)

        return None

    def _verify_developer_mode_toggle(self) -> None:
        base = self.args.url.split('#', 1)[0]
        settings_url = f'{base}#/settings'
        openclaw_url = f'{base}#/openclaw'
        logs_url = f'{base}#/logs'
        sessions_url = f'{base}#/sessions'
        toggle = self.page.locator('.settings-toggle input[type="checkbox"]').first
        try:
            self.page.goto(settings_url, wait_until='domcontentloaded', timeout=self.args.timeout)
            self.page.wait_for_selector('.settings-toggle input[type="checkbox"]', timeout=self.args.timeout)
            initial_checked = toggle.is_checked()

            toggle.set_checked(False)
            self.page.wait_for_function(
                "() => document.documentElement.dataset.developerMode === 'off'",
                timeout=self.args.timeout,
            )

            self.page.goto(openclaw_url, wait_until='domcontentloaded', timeout=self.args.timeout)
            self.page.wait_for_selector('.page-stack', timeout=self.args.timeout)
            self.page.wait_for_timeout(300)
            if self.page.locator('.code-panel').count():
                self.failures.append(SmokeFailure('Developer mode off should hide raw panels on the OpenClaw page.'))

            self.page.goto(logs_url, wait_until='domcontentloaded', timeout=self.args.timeout)
            self.page.wait_for_selector('.page-stack', timeout=self.args.timeout)
            self.page.wait_for_timeout(300)
            if self.page.locator('[data-testid="logs-raw-output"]').count():
                self.failures.append(SmokeFailure('Developer mode off should hide raw log output on the Logs page.'))
            if self.page.locator('[data-testid="logs-copy-action"]').count():
                self.failures.append(SmokeFailure('Developer mode off should hide raw log copy actions on the Logs page.'))

            self.page.goto(sessions_url, wait_until='domcontentloaded', timeout=self.args.timeout)
            self.page.wait_for_selector('.page-stack', timeout=self.args.timeout)
            self.page.wait_for_timeout(300)
            if self.page.locator('[data-testid="sessions-memory-runtime-details"]').count():
                self.failures.append(SmokeFailure('Developer mode off should hide session memory runtime details.'))

            self.page.goto(settings_url, wait_until='domcontentloaded', timeout=self.args.timeout)
            self.page.wait_for_selector('.settings-toggle input[type="checkbox"]', timeout=self.args.timeout)
            toggle.set_checked(True)
            self.page.wait_for_function(
                "() => document.documentElement.dataset.developerMode === 'on'",
                timeout=self.args.timeout,
            )

            self.page.goto(openclaw_url, wait_until='domcontentloaded', timeout=self.args.timeout)
            self.page.wait_for_selector('.page-stack', timeout=self.args.timeout)
            self.page.wait_for_function(
                "() => document.querySelectorAll('.code-panel').length >= 1",
                timeout=self.args.timeout,
            )

            self.page.goto(logs_url, wait_until='domcontentloaded', timeout=self.args.timeout)
            self.page.wait_for_selector('.page-stack', timeout=self.args.timeout)
            self.page.wait_for_function(
                "() => document.querySelectorAll('[data-testid=\"logs-raw-output\"]').length >= 1",
                timeout=self.args.timeout,
            )
            if not self.page.locator('[data-testid="logs-copy-action"]').count():
                self.failures.append(SmokeFailure('Developer mode on should reveal raw log copy actions on the Logs page.'))

            self.page.goto(sessions_url, wait_until='domcontentloaded', timeout=self.args.timeout)
            self.page.wait_for_selector('.page-stack', timeout=self.args.timeout)
            self.page.wait_for_function(
                "() => document.querySelectorAll('[data-testid=\"sessions-memory-runtime-details\"]').length >= 1",
                timeout=self.args.timeout,
            )

            self.page.goto(settings_url, wait_until='domcontentloaded', timeout=self.args.timeout)
            self.page.wait_for_selector('.settings-toggle input[type="checkbox"]', timeout=self.args.timeout)
            toggle.set_checked(initial_checked)
            self.page.wait_for_function(
                "(expected) => document.documentElement.dataset.developerMode === expected",
                arg='on' if initial_checked else 'off',
                timeout=self.args.timeout,
            )
        except (PlaywrightTimeoutError, PlaywrightError) as exc:
            self.failures.append(SmokeFailure(f'Developer mode toggle flow failed: {exc}'))

    def _open_theme_menu(self) -> None:
        try:
            theme_menu = self.page.locator('.topbar-actions .toolbar-menu').nth(0)
            theme_menu.hover()
            self.page.wait_for_selector('.topbar-actions .toolbar-menu:nth-child(1) .toolbar-popover', timeout=self.args.timeout)
            self.page.click('.topbar-actions .toolbar-menu:nth-child(1) .toolbar-popover__item:nth-child(2)')
            self.page.wait_for_function(
                "() => document.documentElement.dataset.theme === 'light'",
                timeout=self.args.timeout,
            )
            theme_menu.hover()
            self.page.click('.topbar-actions .toolbar-menu:nth-child(1) .toolbar-popover__item:nth-child(1)')
        except (PlaywrightTimeoutError, PlaywrightError) as exc:
            self.failures.append(SmokeFailure(f'Theme menu interaction failed: {exc}'))

    def _open_language_menu(self) -> None:
        try:
            lang_menu = self.page.locator('.topbar-actions .toolbar-menu').nth(1)
            lang_menu.hover()
            self.page.wait_for_selector('.topbar-actions .toolbar-menu:nth-child(2) .toolbar-popover', timeout=self.args.timeout)
            self.page.click('.topbar-actions .toolbar-menu:nth-child(2) .toolbar-popover__item:nth-child(2)')
            self.page.wait_for_function(
                "() => document.documentElement.lang === 'en'",
                timeout=self.args.timeout,
            )
            lang_menu.hover()
            self.page.click('.topbar-actions .toolbar-menu:nth-child(2) .toolbar-popover__item:nth-child(1)')
            self.page.wait_for_function(
                "() => document.documentElement.lang === 'zh-CN'",
                timeout=self.args.timeout,
            )
        except (PlaywrightTimeoutError, PlaywrightError) as exc:
            self.failures.append(SmokeFailure(f'Language menu interaction failed: {exc}'))

    def _logout(self) -> None:
        account_menu = self.page.locator('.topbar-actions .toolbar-menu').nth(2)
        if not account_menu.count():
            self.failures.append(SmokeFailure('Account menu is missing, cannot validate logout flow.'))
            return
        try:
            account_menu.hover()
            self.page.wait_for_selector('.toolbar-popover__item--danger', timeout=self.args.timeout)
            self.page.click('.toolbar-popover__item--danger')
            self.page.wait_for_selector('.confirm-dialog', timeout=self.args.timeout)
            self.page.click('.confirm-dialog__footer .inline-link:last-child')
            self.page.wait_for_selector('.login-screen', timeout=self.args.timeout)
        except (PlaywrightTimeoutError, PlaywrightError) as exc:
            self.failures.append(SmokeFailure(f'Logout flow failed: {exc}'))

    def _report_runtime_errors(self) -> None:
        for item in self.console_errors:
            self.failures.append(SmokeFailure(f'Console error: {item}'))
        for item in self.page_errors:
            self.failures.append(SmokeFailure(f'Page error: {item}'))

    def print_report(self) -> None:
        if not self.failures:
            print(f'PASS guard-next smoke | url={self.args.url}')
            return
        print('FAIL guard-next smoke')
        for index, failure in enumerate(self.failures, start=1):
            print(f'{index}. {failure.message}')


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description='OpenClaw Guard next-ui smoke test')
    parser.add_argument('--url', default=DEFAULT_URL, help=f'Guard default UI URL, default: {DEFAULT_URL}')
    parser.add_argument('--password', default='', help='Login password if Guard auth is enabled')
    parser.add_argument('--timeout', type=int, default=DEFAULT_TIMEOUT_MS, help='Timeout in milliseconds for each wait')
    parser.add_argument('--headed', action='store_true', help='Run browser in headed mode for debugging')
    parser.add_argument('--fixture-root-id', default='', help='Optional managed-root id fragment for a smoke fixture workspace')
    return parser.parse_args()


def main() -> int:
    args = parse_args()
    with sync_playwright() as playwright:
        browser = playwright.chromium.launch(headless=not args.headed)
        page = browser.new_page(viewport={'width': 1440, 'height': 1100})
        smoke = GuardNextSmoke(page, args)
        try:
            code = smoke.run()
        finally:
            smoke.print_report()
            browser.close()
    return code


if __name__ == '__main__':
    sys.exit(main())
