# OpenClaw Guard / 虾护卫

[中文](./README.md) | [English](./README.en.md)

OpenClaw Guard 是 OpenClaw 的原生运维与安全工作台，自带“防弹衣”与“复活甲”：以内置多档安全预设隔离越权风险，统一管理 Agent 的记忆、性格等 Markdown 资产，并结合 Git 深度同步，让你进可自由折腾，退可一键重生。

当前形态以轻量 Node CLI + 原生 Web 工作台为主，不再依赖外部 Mission Control 侧挂。

支持平台:
- Windows
- macOS
- Linux

## 适用场景

- 电脑上还没有安装 OpenClaw，需要先检测并补装
- OpenClaw 已安装，但需要统一管理 Gateway、Guard Web、AI、渠道、Git 同步
- Guard 页面卡住、样式异常、接口超时后，需要做完整重启而不是只重启 Gateway
- 需要在客户机上以更可控的方式做安装、运维和故障排查

## 安装

公开仓库已经发布到 GitHub:

- https://github.com/qingmiao-tech/openclaw-guard

当前公开发版线为 `0.9.0`。

在当前仓库内做本地开发:

```bash
cd openclaw-guard
npm install
```

公开安装方式:

```bash
# npm / npx
npm install -g openclaw-guard@0.9.0
npx -y openclaw-guard@0.9.0 init-machine --install-openclaw --start-web --port 18088

# curl / PowerShell
curl -fsSL https://raw.githubusercontent.com/qingmiao-tech/openclaw-guard/v0.9.0/install.sh | bash
powershell -NoProfile -ExecutionPolicy Bypass -Command "irm https://raw.githubusercontent.com/qingmiao-tech/openclaw-guard/v0.9.0/install.ps1 | iex"
```

仓库内也内置了同名安装脚本，默认指向 `qingmiao-tech/openclaw-guard`，但仍可通过参数或环境变量覆盖:

```bash
bash ./install.sh --version latest --port 18088 --dry-run
pwsh ./install.ps1 -Version latest -Port 18088 -DryRun
```

## 一键启动脚本

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

macOS 双击方式:

```text
start-web.command
stop-web.command
status-web.command
```

脚本行为统一为:

- 先检查 `node` / `npm` 是否可用
- 如果本地还没有 `node_modules`，自动执行 `npm install`
- 如果 Guard Web 已经在后台运行，先停止旧实例
- 重新构建最新版本
- 再启动新的后台实例
- 最后输出当前状态与访问地址

停止脚本行为:

- 检查目标端口当前是否存在 Guard Web 后台实例
- 若存在则执行停止，并等待进程真正退出
- 最后输出当前状态，方便确认服务已经关闭

状态脚本行为:

- 读取当前 Guard Web 后台状态
- 展示当前端口、PID、访问地址和日志位置
- 在未运行时给出下一步启动提示

如果你更习惯命令行，也可以直接执行:

```bash
npm run web:bg:restart
npm run web:bg:down
npm run web:bg:show-status
```

默认端口是 `18088`，也支持自定义端口，例如:

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

开发模式启动:

```bash
npx tsx src/index.ts web --port 18088
```

构建后启动:

```bash
npm run build
node dist/index.js web --port 18088
```

常用本地地址:

- `http://127.0.0.1:18088`
- `http://127.0.0.1:18088/workbench`

## 常用 CLI

```bash
# 系统与 OpenClaw 基础信息
npx tsx src/index.ts info

# 安全审计
npx tsx src/index.ts audit

# 启动 Web 工作台
npx tsx src/index.ts web --port 18088

# 查看标准 Guard Web 后台报告
npx tsx src/index.ts web-status --port 18088 --lang zh
npx tsx src/index.ts web-status --port 18088 --lang en --json

# 初始化当前机器（可预演）
npx tsx src/index.ts init-machine --install-openclaw --start-web --port 18088 --dry-run --json

# 查看 Gateway 服务状态
npx tsx src/index.ts service status

# 启动 / 停止 / 重启 Gateway
npx tsx src/index.ts service start
npx tsx src/index.ts service stop
npx tsx src/index.ts service restart

# 查看 Guard 完整重启状态
npx tsx src/index.ts guard status

# 完整重启 Guard Web
npx tsx src/index.ts guard restart --port 18088

# 完整重启 Guard Web，并联动重启 Gateway
npx tsx src/index.ts guard restart --port 18088 --restart-gateway
```

## Web 工作台入口

Guard Web 已把根路由 `/` 切到新的原生工作台，核心页签包括:

- 驾驶舱
- 运维
- OpenClaw
- 渠道
- AI
- 通知
- Agent
- 会话
- 活动
- 文件
- 记忆
- 搜索
- 成本
- Cron
- Git 同步
- 审计
- 预设
- 加固
- 日志

其中“渠道”页统一承接消息入口配置，公开版默认保留官方 `Feishu / Lark`、Telegram、Slack、Discord 等渠道，不再单独提供顶级“飞书”页签。

兼容说明:

- 如果访问历史链接 `/#feishu`，前端会自动跳转到 `/#channels`
- 跳转后会默认选中 `Feishu / Lark` 渠道详情，方便兼容旧书签与旧操作习惯

其中“运维”页是当前唯一的服务控制入口，用来集中处理:

- Gateway 启停与重启
- Guard Web 后台托管
- 完整重启 Guard
- Guard + Gateway 全重启
- 本地 Env 管理
- 缓存预热
- 运行路径与快照

## OpenClaw 未安装时的处理

如果目标机器还没有安装 OpenClaw，可以直接在工作台的 `OpenClaw` 页使用安装能力。

当前策略:

- Guard 先按“托管前缀 -> 当前 PATH -> npm 默认 prefix”的顺序检测本机是否已存在 `openclaw` CLI
- 若已存在现有安装，优先复用，不强行覆盖
- 若未安装，再把 OpenClaw 装到 Guard 的用户级托管前缀
- 安装完成后会把托管 bin 目录注入当前进程 PATH，方便后续运维链路直接复用

说明:

- 默认托管前缀:
  - Windows: `%USERPROFILE%\\.openclaw\\guard\\npm-global`
  - macOS / Linux: `~/.openclaw/guard/npm-global`
- `init-machine` 支持 `--managed-prefix` 覆盖默认托管目录
- 当前自动安装仍依赖 `Node.js + npm`
- Gateway 继续独立运维，本轮不会在初始化链路里自动安装或启动

## 完整重启 Guard

### 什么时候要用“完整重启 Guard”

适合以下情况:

- Guard 页面一直处于加载中，但 Gateway 本身未必异常
- 切菜单后页面状态混乱，需要让 Guard Web 自己重启一轮
- 前端资源已更新，但当前页面仍拿着旧脚本或旧缓存
- 需要切换到新的后台托管实例

不适合替代以下动作:

- 只想恢复 OpenClaw Gateway: 用 `重启 Gateway`
- 只想关闭当前 Guard Web: 用 `一键停后台服务`

### Web 中的使用方式

1. 右上角全局按钮: `完整重启 Guard`
2. 运维页按钮: `完整重启 Guard`
3. 运维页按钮: `Guard + Gateway 全重启`

### CLI 中的使用方式

```bash
# 仅重启 Guard Web
npx tsx src/index.ts guard restart --port 18088

# Guard Web 和 Gateway 一起重启
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

### 行为说明

完整重启 Guard 不是简单地“先停再起”按钮拼接，而是后台接力式重启:

1. 当前页面发起重启请求
2. Guard 调度独立后台任务
3. 旧 Guard Web 进程退出
4. 新 Guard Web 实例在同端口重新托管启动
5. 如果勾选联动，则继续重启 Gateway
6. 前端通过轮询 `restart-status` 判断是否恢复

这样做的目的，是避免当前请求进程直接把自己杀掉，导致链路半途断掉。

## 运维建议

建议按下面的顺序处理问题:

1. 先看“驾驶舱”，判断是页面问题、Gateway 问题，还是 OpenClaw 未安装
2. 进入“运维”，执行 Guard Web / Gateway 相关操作
3. 如果是安装问题，进入 `OpenClaw` 页处理安装或升级
4. 如果是配置问题，继续到 `AI`、`渠道`（内含 `Feishu / Lark`）、`Git 同步`
5. 如果是运行态问题，查看 `会话`、`活动`、`日志`

公开版当前不暴露“自定义飞书”或独立插件入口，后续扩展能力会通过通用插件机制迭代。

## 常见排障

### 1. 页面能打开，但一直转圈

优先检查:

- 是否命中了旧缓存
- Guard Web 是否需要完整重启
- OpenClaw 状态接口是否返回过慢

建议动作:

- 先点右上角 `完整重启 Guard`
- 如仍异常，再到“运维”页执行 `Guard + Gateway 全重启`

### 2. 只想恢复 OpenClaw 服务

直接使用:

```bash
npx tsx src/index.ts service restart
```

或在“运维”页点击 `Restart Gateway`。

### 3. 想把当前页面纳入后台托管

在“运维”页使用:

- `纳入后台托管`
- `一键停后台服务`

适用于当前页面已经打开，但还没有被 Guard 写入后台运行记录的情况。

### 4. OpenClaw 没装

进入 `OpenClaw` 页查看:

- 安装状态
- 安装条件
- 安装前检查
- 平台说明

再执行:

- `安装 / 修复`
- `更新到最新`

## 验证建议

提交或发版前，至少验证以下链路:

1. `npm run build`
2. `npm test`
3. `npm run pack:dry-run`
4. 浏览器点击 `完整重启 Guard` 后，页面能在短暂断开后恢复
5. 浏览器点击 `Guard + Gateway 全重启` 后，Guard 和 Gateway 都能恢复

## 当前说明

- 文档中的“完整重启 Guard”已对应当前代码实现
- 根路由 `/` 默认进入新工作台
- 旧版兼容页仅作为历史兼容用途保留，不是主入口
