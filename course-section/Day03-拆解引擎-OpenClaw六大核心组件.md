# Day 3：拆解引擎——OpenClaw 六大核心组件

> PPT 文稿 | 预计时长：1.5h | 所属层级：基础层

---

## 第 1 页 · 封面

### Day 3：拆解引擎——OpenClaw 六大核心组件

**OpenClaw 实战训练营 · 基础层**

预计时长：1.5 小时

> 今天的目标：理解 OpenClaw 的核心架构，知道每个组件是干什么的。

---

## 第 2 页 · 今日学习目标

1. ✅ **解释** OpenClaw 核心架构（Gateway、Agent、Channel、Skill、Tools、Memory）
2. ✅ **识别** 并修改关键配置文件（openclaw.json），理解工作目录结构
3. ✅ **描述** 渠道对接的通用四步流程
4. ✅ **说清** `agentId / workspace / sessionKey` 之间的最小关系，理解为什么后面会出现“串线 / 不记得 / 技能不生效”

---

## 第 2.5 页 · 讲师提示语（可直接口播）

- **开场认知**：这节不是讲“大而全架构”，而是给前两天做过的所有操作装上一张最小脑图。
- **实操前提醒**：只抓最关键的几层：Gateway、Agent、workspace、session、channel，先够用再扩展。
- **卡点转场**：一旦学员混乱，就带他们重新走一遍“这条消息是怎么从渠道走到模型，再回到用户手里的”。
- **复盘收口**：今天的目标不是背术语，而是以后遇到问题时，知道该先看哪一层。

---

## 第 3 页 · "人体"类比法

| 组件 | 类比 | 作用 |
|------|------|------|
| **Gateway** | 🏢 身体 | 7×24 值班，接收外界消息 |
| **Agent** | 🧠 大脑 | 思考决策，判断意图 |
| **Skill** | 📜 技能证书 | 各种专业能力 |
| **Tools** | 🤲 双手 | 底层执行器，动手干活 |
| **Memory** | 💾 记忆 | 记住你说过的话和偏好 |
| **Channel** | 👁️ 感官 | 连接 Telegram、Discord、飞书，以及其他企业侧适配渠道 |

---

## 第 4 页 · 架构全景图

```
用户 (Telegram/Discord/飞书/企业适配渠道/Cron)
        ↓
   ┌─────────────────────┐
   │   Gateway 网关       │  ← 消息路由、连接管理
   │  ┌───────────────┐  │
   │  │ Channel 渠道   │  │
   │  │ Cron 调度器    │  │
   │  └───────────────┘  │
   └─────────┬───────────┘
             ↓
   ┌─────────────────────┐
   │   Agent 智能体       │  ← 理解意图、决策
   │  SOUL.md → 人格      │
   │  Memory ↔ 记忆       │
   └─────────┬───────────┘
             ↓
   ┌─────────────────────┐
   │   Skill + Tools      │  ← 执行操作
   └─────────────────────┘
```

> 一句话总结：用户发消息 → Gateway 接收路由 → Agent 理解决策 → Skill/Tools 执行 → 返回结果

---

## 第 4.5 页 · 最小心智模型：消息不是直接进模型

很多同学会把 OpenClaw 想成“消息一来，模型直接回答”。真实链路不是这样：

```
入站消息
  ↓
bindings 先决定：这条消息归哪个 agentId
  ↓
sessionKey 再决定：这条消息落进哪个会话桶
  ↓
workspace 决定：这个 Agent 这轮能读到哪些 SOUL / USER / memory / skills
  ↓
模型 + tools 开始真正工作
```

### 记住这三句话

- **`agentId`** 决定“哪个大脑来处理”
- **`sessionKey`** 决定“这次对话接着哪条上下文走”
- **`workspace`** 决定“这个大脑开工前手边能拿到什么资料”

这也是为什么：

- 同一个机器人账号，换了绑定规则后，可能像换了一个人
- 同一个 Agent，在群聊和私聊里，默认也可能不是同一段上下文
- 技能明明装好了，但装在别的 workspace 里时，当前 Agent 根本看不到

---

## 第 5 页 · Gateway 网关

### 核心职责

- 📨 **消息路由**：将不同渠道的消息统一转发给 Agent
- ⏰ **任务调度**：管理定时任务触发
- 🔗 **连接管理**：维护与各渠道的长连接

### 类比

就像一个 7×24 小时值班的前台，负责接待所有来访者并转交给对应的处理人。

---

## 第 6 页 · Agent 智能体

### 核心职责

- 📖 读取上下文（对话历史、用户信息）
- 🎯 判断用户意图
- 🔧 选择合适的 Skill 或 Tool
- 💬 调用 AI 模型生成回复

### 关键特性

- 参考 **SOUL.md** 调整回复风格
- 读写 **Memory** 维持对话连贯性

---

## 第 7 页 · Channel、Skill、Tools、Memory

### Channel（渠道）
- 连接外部消息平台的接口
- 一个 OpenClaw 可同时连接多个 Channel → "一个 AI，多个入口"

### Skill（技能）vs Tools（工具）
- **Tools** = 锅碗瓢盆（底层：文件读写、命令执行、Web 搜索）
- **Skill** = 菜谱（高层：基于 Tools 封装的业务逻辑）

### Memory（记忆）
- 核心记忆：始终可用（你的名片）
- 长期记忆：按需检索（你的档案柜）
- 短期记忆：当前对话上下文（工作台）

---

## 第 8 页 · 数据流示例

### 场景：用户在 Telegram 问天气

```
1. 用户发送："帮我查一下明天北京的天气"
2. Telegram Channel 接收 → 转换格式 → 转发给 Gateway
3. Gateway 路由给 Agent
4. Agent 读取上下文和记忆 → 意图："查询天气"
5. Agent 调用"天气查询 Skill"
6. Skill 调用 Web 搜索 Tool → 获取天气数据
7. Agent 根据 `SOUL.md` 风格组织回复
8. 回复 → Gateway → Telegram → 用户看到结果
```

---

## 第 9 页 · 配置文件结构

### openclaw.json 主配置文件

| 配置项 | 作用 |
|--------|------|
| `model` | AI 模型（claude-3-sonnet、gpt-4 等） |
| `apiKey` / `apiBase` | API 密钥和接口地址 |
| `channels` | 已启用的渠道及配置 |
| `skills` | 已安装的技能及配置 |
| `memory` | 记忆系统配置 |
| `cron` | 定时任务配置 |

---

## 第 10 页 · 工作区 vs 状态目录

```
~/.openclaw/
├── openclaw.json                      # 主配置文件
├── workspace/                         # 默认 Agent 的工作区
│   ├── AGENTS.md
│   ├── SOUL.md
│   ├── USER.md
│   ├── memory/
│   └── skills/
├── skills/                            # 共享 Skills（所有 Agent 可见）
└── agents/
    └── main/
        ├── agent/                     # 每个 Agent 自己的认证/状态目录
        └── sessions/                  # sessions.json + *.jsonl 会话记录
```

### 课堂一定要讲清

- **工作区** 是 Agent 平时“干活的桌面”
- **`~/.openclaw/openclaw.json`** 是整个系统的总开关
- **`~/.openclaw/agents/<agentId>/sessions/`** 是排查串线、上下文混乱时最该想到的地方

---

## 第 11 页 · 渠道对接通用四步流程

### 无论对接哪个渠道，都遵循这四步：

1. 🔑 **获取渠道凭证**：在目标平台创建机器人 / 应用，拿到 Token / App ID / Secret
2. ⚙️ **接入 OpenClaw**：优先用 `openclaw onboard` / `openclaw channels add` / 插件安装；最后才手改配置
3. 🩺 **先做系统级自检**：`openclaw config validate` → `openclaw gateway restart` → `openclaw channels status --probe`
4. ✅ **再做真实消息验证**：私聊先完成 pairing，再去测群聊 / 多 Bot / 多 Agent

> 课堂口径尽量统一成：**先看配置，再看网关，再看渠道，最后才看聊天界面。**

---

## 第 12 页 · 各渠道差异概览

| 渠道 | 难度 | 特点 |
|------|------|------|
| **Telegram** | ⭐ 最简单 | 官方内置路径清晰；BotFather + pairing 即可起步 |
| **Discord** | ⭐⭐ 简单 | 官方内置；要特别注意 intents、DM pairing、频道权限 |
| **飞书** | ⭐⭐⭐ 中等偏复杂 | 先装插件，再建应用、开长连接、发版、pairing |
| **QQ** | ⭐⭐⭐⭐ 项目型接入 | 更像平台接入项目；审核、适配器、字段口径要先确认 |
| **企业微信** | ⭐⭐⭐⭐ 企业接入 | 管理员权限、回调可达、可见范围、适配器说明都重要 |

> 💡 建议先从 `Telegram` 或 `Discord` 入手；`飞书` 作为企业协作增强；`QQ / 企业微信` 更适合带着实际适配器文档做交付型练习。

---

## 第 13 页 · 实操任务

### 任务 1：查看并理解配置文件（20 分钟）

```bash
openclaw config file                         # 找到当前生效的配置文件
openclaw config get agents.defaults.workspace
openclaw sessions --active 120              # 看最近活跃会话
ls -la ~/.openclaw                          # 看总目录结构
```

### 任务 2：修改配置项并验证（20 分钟）

```bash
cp ~/.openclaw/openclaw.json ~/.openclaw/openclaw.json.bak
nano ~/.openclaw/openclaw.json
openclaw config validate
openclaw gateway restart
openclaw gateway health
openclaw tui
```

---

## 第 14 页 · 验收自检

- [ ] 能描述 Gateway、Agent、Channel、Skill、Tools、Memory 各自的作用
- [ ] 能找到并读懂 openclaw.json 的关键配置项
- [ ] 能说出渠道对接的通用四步流程
- [ ] 能解释 `agentId / workspace / sessionKey` 为什么会影响后面的记忆、技能和多 Agent 路由

---

## 第 15 页 · 社区实战案例：80+ 技能的私人全能助手

> 💬 来源：社区实战分享

### 从"能说话"到"能干活"的蜕变

下面来看一个实战案例——花 4 天时间，把 OpenClaw 从一个聊天工具变成了拥有 80+ 技能的全能助手。这个实践验证了六大组件的协作威力：

| 组件 | 实际应用 |
|------|----------|
| Gateway | 7×24 在线，接入 Telegram、飞书和其他企业侧适配渠道 |
| Agent | 定义了"小墨"人格，有自己的个人主页 |
| Skill | 安装了 80+ 社区技能，覆盖办公、开发、内容创作 |
| Tools | 文件操作、Web 搜索、命令执行全部启用 |
| Memory | 记住用户偏好，跨会话保持连贯 |
| Channel | 多渠道同时在线，一个大脑多个入口 |

### 关键认知

- AI 助手不是 ChatGPT 换了个皮肤——它有记忆、能主动干活、能跨平台协作
- 技能生态是 OpenClaw 的核心竞争力，社区已有 5000+ 技能可选
- 一个配置好的 AI 助手，月成本约 100 元，能替代大量重复性工作

> 💡 理解了六大组件的协作关系，你就掌握了 OpenClaw 的核心架构。后续的所有进阶操作，都是在这个框架上做文章。

---

## 第 16 页 · 今日总结与预告

### 今天你掌握了 🎉

- OpenClaw 的核心架构和各组件角色
- 配置文件结构和工作目录
- 渠道对接的通用流程

### 明天预告：Day 4

**给 AI 一个灵魂——人格定制 SOUL.md**

让你的 AI 助手拥有独特的性格和说话风格！
