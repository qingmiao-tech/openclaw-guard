<p align="center">
  <img src="./web/logo.png" alt="OpenClaw Guard logo" width="76" />
  <img src="./web/readme-wordmark.svg" alt="OpenClaw Guard / Xia Guard" width="540" />
</p>

<p align="center"><strong>The OpenClaw console with built-in armor and recovery.</strong></p>
<p align="center">Security presets reduce overreach risk, Markdown assets such as memory and role files stay organized, and backup & recovery keeps experimentation reversible.</p>

<p align="center"><a href="./README.md">中文</a> · <a href="./README.en.md">English</a></p>

<p align="center">
  <a href="https://github.com/qingmiao-tech/openclaw-guard/actions/workflows/ci.yml"><img alt="Build" src="https://img.shields.io/github/actions/workflow/status/qingmiao-tech/openclaw-guard/ci.yml?branch=main&style=for-the-badge&label=build" /></a>
  <a href="https://github.com/qingmiao-tech/openclaw-guard/releases"><img alt="Release" src="https://img.shields.io/github/v/release/qingmiao-tech/openclaw-guard?style=for-the-badge&label=release" /></a>
  <a href="https://github.com/qingmiao-tech/openclaw-guard/blob/main/package.json"><img alt="Version" src="https://img.shields.io/github/package-json/v/qingmiao-tech/openclaw-guard?style=for-the-badge&label=version&color=0ea5e9" /></a>
  <a href="https://github.com/qingmiao-tech/openclaw-guard/blob/main/LICENSE"><img alt="License" src="https://img.shields.io/github/license/qingmiao-tech/openclaw-guard?style=for-the-badge&label=license&color=22c55e" /></a>
</p>

<p align="center">
  <img src="./web/readme-hero.png" alt="OpenClaw Guard hero banner" />
</p>

## What It Is

OpenClaw Guard is a native operations and security workbench for OpenClaw. It is opinionated about three promises first:

- Get it running: inspect the machine, install or repair OpenClaw, and bring up Guard Web.
- Keep it protected: guide users through backup & recovery for memory, roles, workspaces, and key assets.
- Help it self-recover: provide safer defaults, runtime diagnostics, logs, repair actions, and rollback paths.

If you do not want to think about Git, Cron, OAuth, or plugin architecture on day one, Guard's home page focuses on the few steps that matter first.

## Good Fits

- You are setting up a new machine and want a guided path from OpenClaw installation to a working console.
- You want one place to manage OpenClaw, Gateway, models, built-in channels, security presets, and recovery points.
- You want the freedom to experiment without losing the option to get back to a known-good state.

## 3-Minute Start

### 1. Install and start Guard

```bash
npx -y openclaw-guard@0.9.0 init-machine --install-openclaw --start-web --port 18088
```

Or use the install scripts:

```bash
curl -fsSL https://raw.githubusercontent.com/qingmiao-tech/openclaw-guard/v0.9.0/install.sh | bash
powershell -NoProfile -ExecutionPolicy Bypass -Command "irm https://raw.githubusercontent.com/qingmiao-tech/openclaw-guard/v0.9.0/install.ps1 | iex"
```

### 2. Open the workbench

- Main entry: `http://127.0.0.1:18088/workbench`
- The root route also lands in the Guard workbench: `http://127.0.0.1:18088/`

### 3. Follow the 4 main paths from the home page

- Install / Repair OpenClaw
- Configure Models
- Connect Channels
- Turn On Backup & Recovery

The home page is designed to answer three questions first:

- Can the system work right now?
- What is the most recommended next action?
- Are there any risks or blockers that need attention?

## Core Launch Features

- Guided home page: a path-first console instead of a flat wall of metrics.
- OpenClaw lifecycle management: install, repair, update, rollback, uninstall, and diagnostics.
- Backup & Recovery: presented first as "save now", "go back to a point", and "continue forward after restore".
- Security center: security checks, permission modes, and host-hardening guidance in one place.
- Workspace tools: roles, files, search, and core memory assets under a calmer structure.
- Redacted diagnostics export: safe to attach in GitHub issues or remote support sessions.

## Platform Matrix

| Platform | Status | Notes |
| --- | --- | --- |
| Windows | Supported | Managed install, launcher scripts, workbench, and diagnostics export are supported. |
| macOS | Supported | Launcher scripts, workbench flow, security guidance, and recovery flow are supported. |
| Linux | Supported | Machine-init guidance currently focuses on Debian/Ubuntu, Fedora/RHEL, and Arch families. |

## Common Entry Points

### CLI

```bash
# Start Guard Web
openclaw-guard web --port 18088

# Read the standardized Guard Web report
openclaw-guard web-status --port 18088 --lang zh
openclaw-guard web-status --port 18088 --lang en --json

# Machine initialization with dry-run support
openclaw-guard init-machine --install-openclaw --start-web --port 18088 --dry-run --json

# OpenClaw lifecycle management
openclaw-guard openclaw status
openclaw-guard openclaw update
openclaw-guard openclaw rollback --history-id <id>
```

### One-click launchers

Convenience wrappers live under [`launchers/`](./launchers):

- Windows: `launchers\start-web.bat` / `launchers\stop-web.bat` / `launchers\status-web.bat`
- macOS / Linux: `bash ./launchers/start-web.sh`
- macOS double-click entry: `launchers/start-web.command`

## Diagnostics and Support

Before opening an issue or asking for help, export the redacted diagnostics bundle:

- Use the download action on the home page
- Or call: `GET /api/support/diagnostics?download=1`

The diagnostics bundle includes:

- Versions and runtime state
- Guard Web / Gateway / OpenClaw status
- Backup & Recovery overview
- Recent logs and notifications
- Security summary

The diagnostics bundle does not expose:

- Raw API keys, tokens, secrets, cookies, or passwords
- Raw local usernames
- Raw home-directory style sensitive paths

## Known Limits

- The cost feature remains an estimate, not a billing view, and stays out of the primary navigation.
- Custom channel plugins are intentionally not part of the public launch promise yet. The current focus is built-in channels plus stable extension hooks.
- Advanced Git remains available for technical users, while ordinary users are guided through backup & recovery language instead.
- Linux machine-init does not attempt to cover every distribution or package layout in the first public release.

## FAQ

### 1. How does Guard relate to OpenClaw?

OpenClaw is the runtime. Guard is the control console around it for installation, operations, safer defaults, and recovery.

### 2. What happens after I restore an older point?

Guard keeps moving forward on the same main line. A restore creates a new restore commit on the current branch instead of rewriting history or forcing a branch workflow on users.

### 3. Can I use Backup & Recovery without understanding Git?

Yes. The default recovery view hides raw Git details and focuses on "save now", "restore to this point", and "is it already protected in the cloud?".

### 4. Why are some advanced capabilities not highlighted on the home page?

The public launch prioritizes first-use clarity. The home page emphasizes installation, models, channels, backup & recovery, and security before exposing more technical tools.

## How To Open An Issue

This reporting order usually produces the fastest debugging loop:

1. Download the redacted diagnostics bundle.
2. Describe what you expected and what happened instead.
3. Provide the minimum reproducible path:
   for example, "fresh Windows machine -> run init-machine -> open workbench -> click update on the OpenClaw page".
4. Attach screenshots only after the diagnostics bundle and steps are already included.

Issue entry:

- [GitHub Issues](https://github.com/qingmiao-tech/openclaw-guard/issues/new/choose)

## Local Development

```bash
cd openclaw-guard
npm install
npm run build
npm test
```

Development mode:

```bash
npx tsx src/index.ts web --port 18088
```

Run from the build output:

```bash
node dist/index.js web --port 18088
```

## License

[MIT](./LICENSE)
