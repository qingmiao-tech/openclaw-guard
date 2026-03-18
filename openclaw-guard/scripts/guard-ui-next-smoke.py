from __future__ import annotations

import argparse
import sys
from dataclasses import dataclass
from typing import List

from playwright.sync_api import Error as PlaywrightError
from playwright.sync_api import Page, TimeoutError as PlaywrightTimeoutError
from playwright.sync_api import sync_playwright

DEFAULT_URL = 'http://127.0.0.1:18088/next'
DEFAULT_TIMEOUT_MS = 15000
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
        self._open_next_shell()
        self._login_if_needed()
        self._verify_shell()
        self._visit_routes()
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

    def _verify_developer_mode_toggle(self) -> None:
        base = self.args.url.split('#', 1)[0]
        settings_url = f'{base}#/settings'
        openclaw_url = f'{base}#/openclaw'
        logs_url = f'{base}#/logs'
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
            if self.page.locator('.log-output').count():
                self.failures.append(SmokeFailure('Developer mode off should hide raw log output on the Logs page.'))
            if self.page.locator('.page-actions .inline-link').count():
                self.failures.append(SmokeFailure('Developer mode off should hide raw log copy actions on the Logs page.'))

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
                "() => document.querySelectorAll('.log-output').length >= 1",
                timeout=self.args.timeout,
            )
            if not self.page.locator('.page-actions .inline-link').count():
                self.failures.append(SmokeFailure('Developer mode on should reveal raw log copy actions on the Logs page.'))

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
    parser = argparse.ArgumentParser(description='OpenClaw Guard /next smoke test')
    parser.add_argument('--url', default=DEFAULT_URL, help=f'Guard /next URL, default: {DEFAULT_URL}')
    parser.add_argument('--password', default='', help='Login password if Guard auth is enabled')
    parser.add_argument('--timeout', type=int, default=DEFAULT_TIMEOUT_MS, help='Timeout in milliseconds for each wait')
    parser.add_argument('--headed', action='store_true', help='Run browser in headed mode for debugging')
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
