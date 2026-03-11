# OpenClaw 热加载与重启机制详解

> 课程补充材料 | 适用版本：OpenClaw 2026.2.x

---

## 为什么需要了解这个？

在日常使用 OpenClaw 的过程中，你一定遇到过这样的困惑：

- 改了 SOUL.md，需要重启吗？
- 改了 openclaw.json 里的模型配置，要不要重启？
- 换了飞书的 appSecret，能热加载吗？

搞清楚哪些改动会立即生效、哪些需要重启，能帮你**节省大量调试时间**，避免"改了半天发现没生效"或"不必要地频繁重启"的尴尬。

本文基于 OpenClaw 源码分析，给你一份明确的答案。

---

## 一、Workspace 文件：改了就生效

### 涉及文件

| 文件 | 作用 | 修改后生效方式 |
|------|------|----------------|
| SOUL.md | AI 的灵魂/人格定义 | 下一条消息即生效 ✅ |
| IDENTITY.md | AI 的身份名片（名字、头像、emoji） | 下一条消息即生效 ✅ |
| USER.md | 用户画像 | 下一条消息即生效 ✅ |
| AGENTS.md | 工作空间说明 | 下一条消息即生效 ✅ |
| TOOLS.md | 工具使用备注 | 下一条消息即生效 ✅ |
| HEARTBEAT.md | 心跳任务定义 | 下一条消息即生效 ✅ |
| MEMORY.md | 记忆文件 | 实时生效（有文件监听） ✅✅ |

### 技术原理

这些 Workspace 文件的加载链路如下：

```
用户发消息
  → agent run/session 启动
    → resolveBootstrapContextForRun()
      → loadWorkspaceBootstrapFiles()
        → readFileWithCache() 逐个读取文件
```

关键在 `readFileWithCache()` 的实现——它使用了**基于 mtime（文件修改时间）的缓存策略**：

1. 每次调用时，先检查文件的 `mtime`（最后修改时间）
2. 如果 `mtime` 没变，直接返回缓存内容（避免重复磁盘 IO）
3. 如果 `mtime` 变了，重新从磁盘读取并更新缓存

由于 `resolveBootstrapContextForRun()` 在**每次 agent 运行时都会被调用**（在 `attempt.ts`、`compact.ts`、`cli-runner.ts` 中均有调用），所以你对这些文件的任何修改，都会在下一条消息处理时被自动读取。

**MEMORY.md 的特殊待遇：** 除了上述机制外，MEMORY.md 还额外配置了 `chokidar` 文件监听器，用于实时将记忆内容索引到 SQLite 数据库中。这意味着 MEMORY.md 的变更不仅在下一条消息时生效，还会实时触发记忆索引的更新。

---

## 二、配置文件 openclaw.json：分情况

openclaw.json 的变更检测机制比 Workspace 文件更复杂。Gateway 通过 `startGatewayConfigReloader()` 启动了一个 `chokidar` 文件监听器，实时监控 openclaw.json 的变化。当检测到变更时，`buildGatewayReloadPlan()` 会对变更进行分类，决定采取什么行动。

配置本身还有一个 **200ms TTL 缓存**（可通过 `OPENCLAW_CONFIG_CACHE_MS` 环境变量调整），`loadConfig()` 在缓存过期后会重新读取文件。

默认的重载模式是 **"hybrid"**（混合模式）：能热加载的就热加载，需要重启的就重启。

### 热加载（不需要重启）

| 配置项 | 说明 |
|--------|------|
| hooks.* | Webhook 和自动化钩子 |
| cron.* | 定时任务 |
| agents.defaults.heartbeat | 心跳配置 |
| browser.* | 浏览器控制 |
| channels.*.（凭证等） | 渠道账号配置（如飞书 appId/appSecret） |

这些配置项的变更会被 Gateway 的 config reloader 捕获，并在不中断服务的情况下直接应用。

### 需要重启

| 配置项 | 说明 |
|--------|------|
| gateway.* | 网关核心设置（端口、TLS、认证等） |
| plugins.* | 插件配置 |
| discovery.* | 服务发现 |
| canvasHost.* | Canvas 主机 |

这些配置涉及底层基础设施，无法在运行时安全地替换，必须通过 `openclaw gateway restart` 重启生效。

### 静默生效（下次读取时自动应用）

| 配置项 | 说明 |
|--------|------|
| models.* | 模型配置 |
| agents.* | Agent 配置 |
| tools.* | 工具配置 |
| routing.* | 路由规则 |
| messages.* | 消息设置 |
| session.* | 会话设置 |
| skills.* | 技能配置 |
| logging.* | 日志设置 |
| audio.* | 音频设置 |
| ui.* | UI 设置 |

这些配置项在 `buildGatewayReloadPlan()` 中被归类为 **no-op**——Gateway 不会主动做任何事情，但由于 `loadConfig()` 的 200ms TTL 缓存机制，下次有代码读取这些配置时，会自动拿到最新值。换句话说，它们会在下一次被使用时"静默"生效。

---

## 三、插件/扩展：必须重启

插件通过 `loadOpenClawPlugins()` 在 Gateway 启动时一次性加载。这个过程包括：

- 解析 `plugins.*` 配置
- 加载插件代码（require/import）
- 执行插件初始化逻辑

由于插件代码在 Node.js 中被 require 后会被模块缓存，**即使你修改了插件的源代码，不重启 Gateway 也不会生效**。

同样，如果你修改了 `openclaw.json` 中的 `plugins.*` 配置（比如启用/禁用某个插件），`buildGatewayReloadPlan()` 会将其归类为"需要重启"。

```bash
# 修改插件后，执行重启
openclaw gateway restart
```

---

## 四、环境变量 / .env 文件：必须重启

环境变量（包括 `.env` 文件中的变量）在配置读取时被一次性加载到进程环境中。OpenClaw 没有对 `.env` 文件设置文件监听器。

这意味着：

- 修改 `.env` 文件后，必须重启 Gateway
- 修改系统环境变量后，也必须重启 Gateway
- 没有任何热加载机制

```bash
# 修改 .env 后
openclaw gateway restart
```

---

## 五、实用速查表

| 修改内容 | 生效方式 | 操作 |
|----------|----------|------|
| SOUL.md / IDENTITY.md / USER.md 等 | 下一条消息 | 直接编辑保存 |
| MEMORY.md | 实时 | 直接编辑保存 |
| openclaw.json 中的 hooks/cron | 自动热加载 | 直接编辑保存 |
| openclaw.json 中的 models/agents | 下次读取 | 直接编辑保存 |
| openclaw.json 中的 gateway/plugins | 需要重启 | 编辑后 `openclaw gateway restart` |
| 插件代码 | 需要重启 | 修改后 `openclaw gateway restart` |
| .env 环境变量 | 需要重启 | 修改后 `openclaw gateway restart` |

---

## 六、调试小技巧

- **验证 SOUL.md 是否生效：** 修改后发一条"介绍一下你自己"，看 AI 的回复风格是否变化
- **验证配置变更：** 修改 openclaw.json 后查看 Gateway 日志，会提示 "config change detected" 以及采取的行动（hot-reload / restart / no-op）
- **查看当前加载的文件：** 使用 `/context list` 命令查看当前会话加载了哪些 Workspace 文件
- **强制刷新配置缓存：** 如果觉得 200ms TTL 太长（虽然已经很短了），可以通过设置环境变量 `OPENCLAW_CONFIG_CACHE_MS=0` 禁用缓存

---

## 七、Guard Web 为什么也要分成“启 / 停 / 查”三步

很多同学会把 `OpenClaw Gateway` 和 `Guard Web` 混成一回事。实际上，它们是两层不同的能力：

- `Gateway`：OpenClaw 的核心运行服务
- `Guard Web`：虾护卫的本地运维工作台

所以，遇到问题时也要分开处理。

### 什么时候重启 Gateway，什么时候处理 Guard Web

| 场景 | 推荐动作 |
|------|----------|
| 改了 `SOUL.md`、`USER.md`、`MEMORY.md` | 不需要重启 |
| 改了 `openclaw.json` 里的 `gateway.*`、`plugins.*`、`.env` | 重启 Gateway |
| 页面一直转圈、UI 状态混乱、前端资源没刷新 | 处理 Guard Web |
| 想确认本地工作台到底有没有运行起来 | 先查 Guard Web 状态 |

### 虾护卫的三条脚本分别做什么

| 脚本 | 作用 |
|------|------|
| `start-web` | 先停旧实例，再构建并启动新实例 |
| `stop-web` | 停止当前后台实例，并等待进程真正退出 |
| `status-web` | 查看当前端口、PID、访问地址、日志位置 |

### 为什么不建议只靠“重新开一个窗口试试”

因为本地工作台最容易遇到的实际问题，不是“没启动”，而是：

- 旧进程还占着端口
- 新实例启动时漂移到了其他端口
- 页面还连着旧实例
- 你以为已经停掉了，其实后台进程还活着

`start-web` 和 `stop-web` 之所以要做“确认端口释放 / 确认同端口回起”，就是为了解决这类桌面环境最常见的假恢复问题。

### 跨平台使用方式

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

macOS 也可以直接双击：

- `start-web.command`
- `stop-web.command`
- `status-web.command`

> 简单记忆：OpenClaw 配置生效看“是否影响 Gateway”；页面和本地工作台问题，看“虾护卫启停查”。

---

> 💡 记住一个简单原则：**Workspace 文件随改随生效，配置文件看情况，插件和环境变量必须重启。**
