# OpenClaw Guard

[中文](./README.md) | [English](./README.en.md)

OpenClaw Guard is the native operations and security workbench for OpenClaw, built with armor and a recovery path: layered security presets reduce overreach risks, agent assets such as memory and personality Markdown files are managed in one place, and deep Git sync lets you experiment freely and restore fast.

The current product shape is a lightweight Node CLI plus a native web workbench. It no longer depends on the older Mission Control sidecar approach.

Supported platforms:
- Windows
- macOS
- Linux

## When to use it

- OpenClaw is not installed on the machine yet, and you want Guard to detect and install it first
- OpenClaw is already installed, but you want one place to manage Gateway, Guard Web, AI settings, channels, and Git sync
- The Guard UI is stuck, styles are broken, or APIs are timing out, and you need a full Guard restart instead of restarting Gateway only
- You need a more controllable install, operations, and troubleshooting experience on a customer machine

## Installation

The public repository is available on GitHub:

- https://github.com/qingmiao-tech/openclaw-guard

The current public release line is `0.9.0`.

For local development inside this repository:

```bash
cd openclaw-guard
npm install
```

Public install options:

```bash
# npm / npx
npm install -g openclaw-guard@0.9.0
npx -y openclaw-guard@0.9.0 init-machine --install-openclaw --start-web --port 18088

# curl / PowerShell
curl -fsSL https://raw.githubusercontent.com/qingmiao-tech/openclaw-guard/v0.9.0/install.sh | bash
powershell -NoProfile -ExecutionPolicy Bypass -Command "irm https://raw.githubusercontent.com/qingmiao-tech/openclaw-guard/v0.9.0/install.ps1 | iex"
```

The repository also ships the same install scripts locally. They default to `qingmiao-tech/openclaw-guard`, but you can still override them with parameters or environment variables:

```bash
bash ./install.sh --version latest --port 18088 --dry-run
pwsh ./install.ps1 -Version latest -Port 18088 -DryRun
```

## One-click web scripts

Windows:

```bat
start-web.bat
stop-web.bat
status-web.bat
```

macOS / Linux:

```bash
bash ./start-web.sh
bash ./stop-web.sh
bash ./status-web.sh
```

macOS double-click entry points:

```text
start-web.command
stop-web.command
status-web.command
```

Unified behavior of the start scripts:

- Check whether `node` and `npm` are available first
- Run `npm install` automatically if `node_modules` does not exist yet
- Stop the previous Guard Web instance first if it is already running in the background
- Rebuild the latest version
- Start a fresh background instance
- Print the current status and URLs at the end

Unified behavior of the stop scripts:

- Check whether the target port is currently occupied by a Guard Web background instance
- Stop it if it exists and wait until the process actually exits
- Print the current status so you can confirm shutdown

Unified behavior of the status scripts:

- Read the current Guard Web background state
- Show the current port, PID, URLs, and log locations
- Print the next recommended action when nothing is running

If you prefer the CLI directly, you can also run:

```bash
npm run web:bg:restart
npm run web:bg:down
npm run web:bg:show-status
```

The default port is `18088`, and custom ports are supported as well:

```bash
bash ./start-web.sh --port 18090
bash ./stop-web.sh --port 18090
bash ./status-web.sh --port 18090
```

```bat
start-web.bat --port 18090
stop-web.bat --port 18090
status-web.bat --port 18090
```

Start in development mode:

```bash
npx tsx src/index.ts web --port 18088
```

Start from the build output:

```bash
npm run build
node dist/index.js web --port 18088
```

Common local URLs:

- `http://127.0.0.1:18088`
- `http://127.0.0.1:18088/workbench`

## Common CLI commands

```bash
# System and OpenClaw basics
npx tsx src/index.ts info

# Security audit
npx tsx src/index.ts audit

# Start the web workbench
npx tsx src/index.ts web --port 18088

# Read the standardized Guard Web background report
npx tsx src/index.ts web-status --port 18088 --lang zh
npx tsx src/index.ts web-status --port 18088 --lang en --json

# Initialize the current machine (dry-run supported)
npx tsx src/index.ts init-machine --install-openclaw --start-web --port 18088 --dry-run --json

# Check Gateway status
npx tsx src/index.ts service status

# Start / stop / restart Gateway
npx tsx src/index.ts service start
npx tsx src/index.ts service stop
npx tsx src/index.ts service restart

# Check Guard restart status
npx tsx src/index.ts guard status

# Fully restart Guard Web
npx tsx src/index.ts guard restart --port 18088

# Fully restart Guard Web and Gateway together
npx tsx src/index.ts guard restart --port 18088 --restart-gateway
```

## Web workbench

Guard Web now routes `/` to the native workbench by default. The main tabs are:

- Dashboard
- Ops
- OpenClaw
- Channels
- AI
- Notifications
- Agent
- Sessions
- Activity
- Files
- Memory
- Search
- Costs
- Cron
- Git Sync
- Audit
- Profiles
- Harden
- Logs

The `Channels` page is the single home for messaging entry points in the public release. Official `Feishu / Lark`, Telegram, Slack, Discord, and similar channels are managed there. There is no longer a separate top-level Feishu tab.

Compatibility notes:

- If you visit the legacy `/#feishu` link, the frontend redirects automatically to `/#channels`
- After the redirect, the `Feishu / Lark` channel is selected automatically so old bookmarks and habits still work

The `Ops` page is the only service control entry point. It centralizes:

- Gateway start, stop, and restart
- Guard Web background management
- Full Guard restart
- Guard + Gateway full restart
- Local env management
- Cache prewarm
- Runtime paths and snapshots

## When OpenClaw is not installed

If OpenClaw is not installed on the target machine, you can use the install capability directly from the `OpenClaw` page in the workbench.

Current strategy:

- Guard detects an existing `openclaw` CLI in this order: managed prefix, current `PATH`, then npm default prefix
- If an existing installation is found, Guard reuses it instead of replacing it by force
- If nothing is found, OpenClaw is installed into Guard's user-level managed prefix
- After installation, the managed `bin` directory is injected into the current process `PATH` so the following operations can reuse it immediately

Notes:

- Default managed prefix:
  - Windows: `%USERPROFILE%\\.openclaw\\guard\\npm-global`
  - macOS / Linux: `~/.openclaw/guard/npm-global`
- `init-machine` supports `--managed-prefix` to override the default location
- Automatic installation still depends on `Node.js + npm`
- Gateway stays outside of the machine-init flow in this release and is not installed or started automatically there

## Full Guard restart

### When to use a full Guard restart

Good fit for cases like:

- The Guard UI keeps loading forever, but Gateway itself may still be healthy
- Tab switches leave the UI state inconsistent and you want Guard Web to restart itself cleanly
- Frontend assets were updated, but the current page still holds old scripts or stale cache
- You want to switch over to a fresh managed Guard Web instance

Not a replacement for:

- Recovering OpenClaw Gateway only: use `Restart Gateway`
- Closing only the current Guard Web instance: use `Stop Background Web`

### From the web UI

1. Global top-right button: `完整重启 Guard`
2. Ops page button: `完整重启 Guard`
3. Ops page button: `Guard + Gateway 全重启`

### From the CLI

```bash
# Restart Guard Web only
npx tsx src/index.ts guard restart --port 18088

# Restart Guard Web and Gateway together
npx tsx src/index.ts guard restart --port 18088 --restart-gateway
```

### API

```http
GET /api/guard/restart-status
POST /api/guard/restart
Content-Type: application/json

{
  "restartGateway": true
}
```

### How it works

A full Guard restart is not just a simple stop-then-start button chain. It uses a handoff flow in the background:

1. The current page sends a restart request
2. Guard schedules an independent background task
3. The old Guard Web process exits
4. A new Guard Web instance starts under managed mode on the same port
5. If requested, Gateway is restarted after that
6. The frontend polls `restart-status` until recovery is complete

This avoids killing the request process in-place and breaking the restart chain halfway through.

## Recommended operations flow

Use this order when troubleshooting:

1. Check `Dashboard` first to decide whether the issue is the page itself, Gateway, or missing OpenClaw
2. Go to `Ops` for Guard Web and Gateway actions
3. If it is an installation issue, open the `OpenClaw` page for install or upgrade actions
4. If it is a configuration issue, continue with `AI`, `Channels` including `Feishu / Lark`, and `Git Sync`
5. If it is a runtime issue, inspect `Sessions`, `Activity`, and `Logs`

The public release does not expose a separate "custom Feishu" or standalone plugin entry yet. Future extensibility will come through a generic plugin mechanism.

## Common troubleshooting

### 1. The page opens but keeps spinning

Check these first:

- Whether you are still hitting stale cache
- Whether Guard Web needs a full restart
- Whether OpenClaw status APIs are responding too slowly

Recommended actions:

- Click `完整重启 Guard` first
- If the issue remains, run `Guard + Gateway 全重启` from the `Ops` page

### 2. You only want to recover OpenClaw

Use:

```bash
npx tsx src/index.ts service restart
```

Or click `Restart Gateway` on the `Ops` page.

### 3. You want to bring the current page under managed background mode

Use the following on the `Ops` page:

- `纳入后台托管`
- `一键停后台服务`

This is useful when the current page is already open, but Guard has not written it into the managed background runtime yet.

### 4. OpenClaw is missing

Open the `OpenClaw` page and check:

- Install status
- Install prerequisites
- Pre-install checks
- Platform notes

Then run:

- `安装 / 修复`
- `更新到最新`

## Verification checklist

Before a commit or a release, verify at least these flows:

1. `npm run build`
2. `npm test`
3. `npm run pack:dry-run`
4. After clicking `完整重启 Guard`, the page disconnects briefly and then recovers
5. After clicking `Guard + Gateway 全重启`, both Guard and Gateway recover

## Current notes

- The "full Guard restart" wording in this document matches the current implementation
- `/` now defaults to the new native workbench
- The legacy compatibility page is kept only for backward compatibility and is no longer the main entry point
