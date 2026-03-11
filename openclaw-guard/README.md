# OpenClaw Guard / 虾护卫

OpenClaw Guard 是 OpenClaw 的原生运维与安全工作台，统一承接安装检测、Guard Web 启停、Gateway 服务管理、Git 同步、缓存预热、运行态查看与安全配置。

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

```bash
cd openclaw-guard
npm install
```

## 一键启动脚本

Windows:

```bat
start-web.bat
```

macOS / Linux:

```bash
bash ./start-web.sh
```

脚本行为统一为:

- 先检查 `node` / `npm` 是否可用
- 如果本地还没有 `node_modules`，自动执行 `npm install`
- 如果 Guard Web 已经在后台运行，先停止旧实例
- 重新构建最新版本
- 再启动新的后台实例
- 最后输出当前状态与访问地址

如果你更习惯命令行，也可以直接执行:

```bash
npm run web:bg:restart
```

默认端口是 `18088`，也支持自定义端口，例如:

```bash
bash ./start-web.sh --port 18090
```

```bat
start-web.bat --port 18090
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
- 飞书
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

- Guard 先检测本机是否已存在 `openclaw` CLI
- 若未安装，展示安装前置条件与平台说明
- 通过后台任务执行安装 / 修复 / 更新
- 安装完成后可直接回到工作台继续做配置与运维

说明:

- 当前自动安装依赖 `npm install -g openclaw@latest`
- 因此目标机器仍需具备 `Node.js + npm`
- Windows / macOS / Linux 都按这一统一路径处理

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
4. 如果是配置问题，继续到 `AI`、`渠道`、`飞书`、`Git 同步`
5. 如果是运行态问题，查看 `会话`、`活动`、`日志`

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
2. `npx vitest run src/__tests__/guard-restart.test.ts src/__tests__/web-background.test.ts`
3. 浏览器点击 `完整重启 Guard` 后，页面能在短暂断开后恢复
4. 浏览器点击 `Guard + Gateway 全重启` 后，Guard 和 Gateway 都能恢复

## 当前说明

- 文档中的“完整重启 Guard”已对应当前代码实现
- 根路由 `/` 默认进入新工作台
- 旧版兼容页仅作为历史兼容用途保留，不是主入口
