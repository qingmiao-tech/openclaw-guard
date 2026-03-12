# OpenClaw 热加载与重启机制详解

> 课程补充材料 | 适用版本：OpenClaw 2026.2.x

---

## 先给结论：别先背原理，先记动作

很多同学真正想知道的不是“底层 watcher 怎么写”，而是：

- 我改了 `SOUL.md`，到底要不要重启？
- 我改了 `openclaw.json` 的模型配置，要不要重启？
- 我换了飞书 token，为什么机器人还是不回？

先记住这个**课堂版速查原则**：

| 你改了什么 | 课堂建议动作 |
|------------|--------------|
| `SOUL.md` / `USER.md` / `IDENTITY.md` / `AGENTS.md` | 不重启，直接开新消息验证 |
| `MEMORY.md` | 不重启，保存后直接验证 |
| `openclaw.json` 里的模型 / Agent / 工具 / 路由 | `openclaw config validate` → `openclaw gateway restart` → 新会话验证 |
| `openclaw.json` 里的渠道配置 | `openclaw config validate` → `openclaw gateway restart` → `openclaw channels status --probe` |
| `plugins.*` / 插件代码 / `.env` / Gateway 本身配置 | 改完必须重启 Gateway |
| Guard Web 页面异常 | 先查 Guard Web，自成一条线，不要和 Gateway 混为一谈 |

> 💡 严格从源码看，部分配置属于“下次读取时静默生效”；但为了课堂复现稳定，我们统一要求大多数配置改动后都走一遍 `validate → restart → 验证`。

---

## 讲师使用建议

- **开场认知**：这份补充材料不是为了多讲一节理论课，而是帮学员建立“改了什么，就该怎么验证”的稳定习惯。
- **实操前提醒**：先只分三类来看——工作区文件、`openclaw.json`、渠道/插件/环境变量；不要一上来讨论 watcher 源码。
- **卡点转场**：一旦学员开始混乱，就回到一个问题：**你刚刚改的到底是哪一类东西？**
- **复盘收口**：最后一定把课堂统一闭环再讲一遍：`openclaw config validate` → `openclaw gateway restart` → 对应场景验证。

---

## 一、Workspace 文件：大多数都是“下一条消息生效”

### 这类文件最适合边改边试

| 文件 | 作用 | 推荐验证方式 |
|------|------|--------------|
| `SOUL.md` | 人格 / 语气 / 行为风格 | 发一句“介绍一下你自己” |
| `IDENTITY.md` | 名字、头像、标签、对外身份 | 看自我介绍和渠道表现 |
| `USER.md` | 用户画像 / 偏好 | 发一条与你偏好有关的问题 |
| `AGENTS.md` | 工作方式 / 项目约束 | 看后续执行风格是否变化 |
| `TOOLS.md` | 工具说明 / 使用提醒 | 让它执行相关工具任务 |
| `HEARTBEAT.md` | 主动任务定义 | 等待或手动触发对应场景 |
| `MEMORY.md` | 记忆内容 | 直接问它是否记得新增信息 |

### 课堂动作建议

```text
编辑文件
  ↓
保存
  ↓
发一条最小验证消息
```

### 为什么一般不用重启

因为这类文件会在运行时被重新读取，尤其是 `MEMORY.md` 还有额外的监听与索引更新机制。
对学员来说，记住一句就够：

> **Workspace 文件，优先直接验证，不要条件反射重启。**

---

## 二、配置文件 `openclaw.json`：最容易让人误判

### 学员最容易踩的坑

很多时候不是配置没生效，而是：

- 配置已经生效，但你还在旧会话里测试
- 配置写错了，但你没先跑 `config validate`
- 渠道凭证改对了，但 Gateway 没重启
- Gateway 起来了，但渠道侧还没重新握手

### 课堂统一闭环

```bash
openclaw config validate
openclaw gateway restart
```

如果改的是渠道相关配置，再补：

```bash
openclaw channels status --probe
```

如果改的是模型相关配置，再补：

```bash
openclaw models status
```

---

## 三、从教学角度，配置改动分三类就够了

### 1）热加载型：一般不需要重启，但课程里仍建议做最小验证

常见代表：

- `hooks.*`
- `cron.*`
- 部分 `browser.*`
- 部分 `channels.*` 运行参数

### 2）静默生效型：理论上会在下次读取时自动应用

常见代表：

- `models.*`
- `agents.*`
- `tools.*`
- `routing.*`
- `messages.*`
- `session.*`
- `skills.*`
- `logging.*`
- `ui.*`

### 3）必须重启型：不要侥幸

常见代表：

- `gateway.*`
- `plugins.*`
- 插件源代码
- `.env`
- 系统环境变量

### 为什么课程里不让学员细抠“热 / 静默 / 重启”边界

因为对初学者来说，最需要的是：

1. 会判断问题大概在哪一层
2. 有固定操作顺序
3. 每一步都能看到明确反馈

所以我们的课堂口径是：

> **只要你改了配置文件，就先 `validate`；大多数情况下再 `restart`；最后做有针对性的验证。**

---

## 四、模型配置为什么课堂里也建议重启一次

按底层机制看，很多模型配置会在下次读取时自动生效。
但在教学和排障现场，我们仍建议这样做：

```bash
openclaw config validate
openclaw gateway restart
openclaw models status
```

然后：

1. 新开一个 session
2. 发一条最小测试消息

### 这样做的好处

- 避免“到底是旧会话记忆，还是新配置”这种歧义
- 所有人都走同一套动作，讲师排障更高效
- 学员能把问题清楚地分到“配置 / 网关 / 会话”三层

---

## 五、渠道配置：改完最怕少最后一步

### 一个常见误区

很多人改完渠道配置，只做了：

```bash
openclaw gateway restart
```

然后就直接去给机器人发消息。
如果这时平台侧权限、pairing、群组可见性还有问题，就会误以为“Gateway 没生效”。

### 正确动作

```bash
openclaw config validate
openclaw gateway restart
openclaw channels status --probe
```

### 这一步到底在帮你确认什么

- 渠道有没有真的连上
- 凭证是不是有效
- 运行中的 Gateway 看到的是不是你刚改的配置
- 现在该去平台上发消息，还是先回头修配置

> 课堂口诀：**改渠道不探测，等于没验收。**

---

## 六、插件 / `.env` / Gateway 核心配置：必须重启

### 这三类不要抱侥幸心理

| 类型 | 为什么必须重启 |
|------|----------------|
| 插件配置 / 插件代码 | 插件在 Gateway 启动时加载，改完不会自动替换运行中的模块 |
| `.env` / 系统环境变量 | 进程启动时读取，运行中不会自动刷新 |
| `gateway.*` | 端口、绑定、认证这类底层设置不适合热替换 |

### 统一动作

```bash
openclaw config validate
openclaw gateway restart
openclaw gateway health
```

如果仍不正常，再看：

```bash
openclaw logs --follow
openclaw gateway status
```

---

## 七、Guard Web 和 Gateway 不是一回事

很多同学把这两层混在一起，导致排障方向完全跑偏。

| 层 | 它是什么 | 典型问题 |
|----|----------|----------|
| `Gateway` | OpenClaw 核心运行服务 | 模型、渠道、会话、配置不生效 |
| `Guard Web` | 本地运维工作台 / 页面层 | 页面转圈、前端资源没刷新、端口冲突 |

### 一个很实用的判断方法

- **消息收发、模型调用、渠道连接异常** → 先查 `Gateway`
- **页面打不开、状态卡住、看起来像 UI 假死** → 再查 `Guard Web`

### 所以 Guard Web 的“启 / 停 / 查”为什么有意义

因为你最常遇到的不是“完全没启动”，而是：

- 旧进程还占着端口
- 新实例起到了别的端口
- 页面连着老实例
- 你以为刷新了，其实没换进程

---

## 八、给讲师和学员的统一排障树

### 场景 1：改了人格文件，感觉没生效

```text
先别重启
  ↓
确认文件已经保存
  ↓
直接发一条最小验证消息
  ↓
还不对，再看是不是在错误的 workspace
```

### 场景 2：改了模型 / Agent / 工具配置

```text
openclaw config validate
  ↓
openclaw gateway restart
  ↓
openclaw models status
  ↓
新开 session 验证
```

### 场景 3：改了渠道凭证，机器人还是不回

```text
openclaw config validate
  ↓
openclaw gateway restart
  ↓
openclaw channels status --probe
  ↓
再去真实平台发消息
```

### 场景 4：页面不对，但消息本身正常

```text
先别动 Gateway
  ↓
去查 Guard Web 的启停状态
  ↓
必要时重启 Guard Web，而不是误杀 Gateway
```

---

## 九、最后只记住这一页就够了

### 记忆版结论

| 改动类型 | 记忆口诀 |
|----------|----------|
| Workspace 文件 | 改完先直接试 |
| 配置文件 | 先校验，再重启，再验证 |
| 渠道配置 | 重启后一定要 probe |
| 插件 / `.env` / Gateway 核心配置 | 必须重启 |
| Guard Web 页面问题 | 单独处理，不和 Gateway 混查 |

### 课程里的统一原则

> **先做最小验证，再谈底层原理；先排层级，再排细节。**

如果你只带走一句话，那就是：

> **改内容先试，改配置先验，改底层先重启。**
