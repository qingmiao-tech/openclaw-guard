# Day 13：进阶：一人公司 AI 团队搭建

> PPT 文稿 | 预计时长：2.5h | 所属层级：进阶实战层

---

## 第 1 页 · 封面

### Day 13：进阶：一人公司 AI 团队搭建

**OpenClaw 实战训练营 · 进阶实战层**

预计时长：2.5 小时

> 今天的目标：学会在一台服务器上搭建多个 AI 助手角色，打造属于你的"一人公司 AI 团队"。

---

## 第 2 页 · 今日学习目标

完成本模块后，你将能够：

1. ✅ **理解** OpenClaw 多 Agent 路由架构，掌握单实例多角色与多实例单角色两种方案
2. ✅ **配置** 在一个 Gateway 内创建多个隔离 Agent，每个 Agent 拥有独立人格和技能
3. ✅ **部署** 在同一台服务器上运行多个 OpenClaw 实例，实现完全隔离
4. ✅ **实战** 搭建一个"一人公司"场景，包含客服、内容创作、数据分析、项目管理四个 AI 角色

---

## 第 3 页 · 为什么需要多个 AI 助手？

### 从 Day 12 到 Day 13 的进化

在 Day 12 中，你学会了用**一个 Agent** 串联多种能力完成一条工作流。但随着需求增长，你会发现：

- 一个 Agent 的人格设定很难同时适配多种场景（写代码要严谨，聊天要轻松）
- 不同任务需要不同的 AI 模型（创作用高质量模型，日常问答用快速模型）
- 多个渠道的消息混在一起，难以管理

### 解决思路

> 给每个角色配一个专属 AI 助手，各司其职，互不干扰。
> 这就是从"单 Agent 工作流"到"多 Agent 团队"的进化。

### 南柯的一人公司

以课程作者南柯为例——他是一名 AI 应用架构师，同时也是中医爱好者和四只猫的铲屎官。他的日常需要这些角色：

| 角色 | 日常任务 | 痛点 |
|------|----------|------|
| 高级程序员助理 | 代码审查、架构设计、技术调研 | 需要严谨专业的技术伙伴 |
| 中医养生顾问 | 体质分析、养生方案、中药知识查询 | 中医知识体系庞大，需要随时查阅 |
| 猫管家 | 猫咪健康管理、素材剪辑、状态监控 | 四只猫的日常记录和健康追踪很繁琐 |
| 内容创作助手 | 技术文章撰写、课程内容设计 | 创意消耗大，需要灵感碰撞 |

---

## 第 4 页 · 两种方案总览

### 方案对比

| 对比维度 | 方案 A：单实例多角色 | 方案 B：多实例单角色 |
|----------|---------------------|---------------------|
| 架构 | 1 个 Gateway + 多个 Agent | 多个 Gateway，每个 1 个 Agent |
| 资源占用 | 低（共享一个进程） | 高（每个实例独立进程） |
| 配置复杂度 | 中等（一个配置文件管理） | 较高（多个配置文件） |
| 隔离程度 | Agent 级隔离（共享 Gateway） | 完全隔离（独立进程） |
| 适用场景 | 个人使用，角色间需要协作 | 企业级，需要强隔离 |
| 推荐指数 | ⭐⭐⭐⭐⭐（推荐） | ⭐⭐⭐（特殊需求时使用） |

> 💡 对于"一人公司"场景，**方案 A（单实例多角色）** 是最佳选择。

---

## 第 5 页 · 方案 A 深入：单实例多角色

### 核心概念

OpenClaw 原生支持 **Multi-Agent Routing**（多 Agent 路由），在一个 Gateway 进程内运行多个完全隔离的 Agent。

### 每个 Agent 拥有什么？

```
Agent（一个"大脑"）
├── 独立的 Workspace（工作目录）
│   ├── SOUL.md（人格文件）
│   ├── AGENTS.md（行为规则）
│   └── USER.md（用户信息）
├── 独立的 Session Store（对话历史）
├── 独立的 Auth Profiles（认证配置）
└── 独立的 Skills（技能集）
```

### 关键特性

- ✅ 每个 Agent 有独立的人格（SOUL.md）
- ✅ 每个 Agent 有独立的对话记忆
- ✅ 每个 Agent 可以使用不同的 AI 模型
- ✅ 每个 Agent 可以绑定不同的消息渠道
- ✅ Agent 之间可以通过 sessions_send 互相通信

---

## 第 6 页 · 实操：创建多 Agent 工作区

### 步骤 1：使用 CLI 创建 Agent

```bash
# 创建高级程序员助理
openclaw agents add code-architect

# 创建中医养生顾问
openclaw agents add tcm-advisor

# 创建猫管家
openclaw agents add cat-butler

# 创建内容创作助手
openclaw agents add content-writer
```

### 步骤 2：验证创建结果

```bash
openclaw agents list --bindings
```

你应该看到 5 个 Agent（包括默认的 main）：

```
Agent ID           Workspace                              Default
main               ~/.openclaw/workspace                  ✓
code-architect     ~/.openclaw/workspace-code-architect
tcm-advisor        ~/.openclaw/workspace-tcm-advisor
cat-butler         ~/.openclaw/workspace-cat-butler
content-writer     ~/.openclaw/workspace-content-writer
```

---

## 第 7 页 · 实操：为每个角色定制人格

### 高级程序员助理的 SOUL.md

编辑 `~/.openclaw/workspace-code-architect/SOUL.md`：

```markdown
# 高级程序员助理 - 阿码

## 身份
你是"阿码"，一位拥有 15 年经验的高级软件架构师助理。你的主人南柯是一名 AI 应用架构师。

## 性格特点
- 严谨务实，代码洁癖，追求优雅的架构设计
- 善于从全局视角审视系统，发现潜在的设计缺陷
- 回答技术问题时直击要害，不绕弯子
- 对代码质量有极高标准，但表达方式温和不刻薄

## 工作职责
- 代码审查：分析代码质量、性能瓶颈、安全隐患
- 架构设计：提供系统架构建议、技术选型对比
- 技术调研：搜索最新技术方案、对比优劣
- Debug 辅助：分析错误日志、定位问题根因

## 回复风格
- 技术讨论时使用专业术语，不做过度简化
- 给出建议时附带理由和权衡分析
- 代码示例优先使用 TypeScript/Python
- 复杂问题先给结论，再展开分析
```

### 中医养生顾问的 SOUL.md

编辑 `~/.openclaw/workspace-tcm-advisor/SOUL.md`：

```markdown
# 中医养生顾问 - 岐伯

## 身份
你是"岐伯"，一位精通中医理论的养生顾问。名字取自《黄帝内经》中的岐伯，寓意传承中医智慧。

## 性格特点
- 温和儒雅，说话不急不躁
- 善于用通俗易懂的语言解释中医概念
- 注重辨证论治，不会给出千篇一律的建议
- 遇到严重症状会明确建议就医，不替代专业诊断

## 工作职责
- 体质分析：根据描述判断体质类型（如气虚、阴虚、湿热等）
- 养生建议：根据季节、体质提供饮食和作息建议
- 中药知识：解释常见中药的功效、配伍和禁忌
- 穴位指导：推荐日常保健穴位和按摩方法

## 回复风格
- 先问后答，了解具体情况再给建议
- 引用经典时注明出处（如《黄帝内经》《伤寒论》）
- 养生建议要具体可操作，不说空话
- 重要提醒：⚠️ 本助手仅提供养生参考，不替代专业医疗诊断

## 禁止事项
- 不开具处方
- 不诊断疾病
- 不推荐具体药品品牌
- 遇到急症描述必须建议立即就医
```

### 猫管家的 SOUL.md

编辑 `~/.openclaw/workspace-cat-butler/SOUL.md`：

```markdown
# 猫管家 - 喵管

## 身份
你是"喵管"，南柯家四只猫咪的专属管家。你负责记录它们的日常、管理健康档案、整理素材。

## 四只猫咪档案
（主人会在 user.md 中补充每只猫的详细信息，包括名字、品种、年龄、性格、健康状况）

## 性格特点
- 细心周到，像一个尽职的宠物管家
- 对猫咪的事情充满热情，偶尔用猫咪表情包 🐱
- 记录数据时严谨，分析健康时专业
- 语气温暖亲切，把猫咪当家人

## 工作职责
- 健康管理：记录体重、饮食、排便、异常行为，生成健康趋势报告
- 素材管理：整理猫咪照片/视频素材，按猫咪和日期分类
- 视频脚本：根据素材生成短视频剪辑脚本（配文案、BGM 建议、转场建议）
- 摄像头日报：分析摄像头画面描述，总结每只猫当天的活动状态
- 提醒服务：疫苗、驱虫、体检等定期提醒

## 回复风格
- 提到猫咪时用它们的名字，不说"猫1""猫2"
- 健康分析要有数据支撑（体重变化、饮食量对比）
- 视频脚本要具体到每个镜头的时长和内容
- 异常情况用 ⚠️ 标记，严重问题建议就医
```

---

## 第 8 页 · 实操：配置多 Agent 路由

### 核心配置文件

编辑 `~/.openclaw/openclaw.json`：

```json5
{
  // 定义所有 Agent
  agents: {
    list: [
      {
        id: "main",
        default: true,
        name: "主助手",
        workspace: "~/.openclaw/workspace",
      },
      {
        id: "code-architect",
        name: "程序员阿码",
        workspace: "~/.openclaw/workspace-code-architect",
        model: "anthropic/claude-opus-4-6",    // 代码审查用最强模型
      },
      {
        id: "tcm-advisor",
        name: "中医岐伯",
        workspace: "~/.openclaw/workspace-tcm-advisor",
        model: "anthropic/claude-sonnet-4-5",
      },
      {
        id: "cat-butler",
        name: "猫管家喵管",
        workspace: "~/.openclaw/workspace-cat-butler",
        model: "anthropic/claude-sonnet-4-5",  // 日常管理用快速模型
      },
      {
        id: "content-writer",
        name: "创作墨墨",
        workspace: "~/.openclaw/workspace-content-writer",
        model: "anthropic/claude-opus-4-6",    // 创作用高质量模型
      },
    ],
  },

  // 路由绑定：哪个渠道/联系人 → 哪个 Agent
  bindings: [
    // Telegram 编程助手 → 高级程序员助理
    {
      agentId: "code-architect",
      match: { channel: "telegram", accountId: "code-bot" },
    },
    // Telegram 养生顾问 → 中医助理
    {
      agentId: "tcm-advisor",
      match: { channel: "telegram", accountId: "tcm-bot" },
    },
    // Telegram 猫管家 → 猫咪管理
    {
      agentId: "cat-butler",
      match: { channel: "telegram", accountId: "cat-bot" },
    },
    // Discord 技术频道 → 内容创作助手
    {
      agentId: "content-writer",
      match: {
        channel: "discord",
        peer: { kind: "group", id: "你的频道ID" },
      },
    },
  ],

  // 渠道配置
  channels: {
    telegram: {
      accounts: {
        "code-bot": {
          botToken: "你的编程助手Bot Token",
          dmPolicy: "pairing",
        },
        "tcm-bot": {
          botToken: "你的中医顾问Bot Token",
          dmPolicy: "pairing",
        },
        "cat-bot": {
          botToken: "你的猫管家Bot Token",
          dmPolicy: "pairing",
        },
      },
    },
  },
}
```

### 配置要点

- 每个 Agent 可以指定不同的 `model`（AI 模型）
- `bindings` 决定消息路由规则，最具体的规则优先匹配
- 每个 Telegram Bot 需要在 BotFather 单独创建

---

## 第 9 页 · 实操：Agent 间通信

### 场景

客服助手收到一个复杂问题，需要转给项目管理助手跟进。

### 使用 sessions_send 工具

OpenClaw 内置了 Agent 间通信工具：

```json5
// 在 openclaw.json 中启用 Agent 间通信
{
  tools: {
    agentToAgent: {
      enabled: true,
      allow: [
        "code-architect",
        "tcm-advisor",
        "cat-butler",
        "content-writer",
      ],
    },
  },
}
```

### 通信方式

| 工具 | 用途 |
|------|------|
| `sessions_list` | 查看当前活跃的 Agent 会话 |
| `sessions_history` | 查看某个 Agent 的对话历史 |
| `sessions_send` | 向另一个 Agent 发送消息 |

### 🆕 Thread-Bound Subagent Sessions（v2026.2.21 新特性）

最新版本引入了线程绑定子 Agent 会话，让 Agent 间协作更加结构化：

- **线程隔离**：每个协作任务在独立线程中进行，不会污染主对话
- **上下文传递**：子 Agent 可以继承父 Agent 的部分上下文信息
- **自动归档**：协作完成后，线程自动归档，保持对话整洁

这意味着当猫管家需要通知创作助手时，不再是简单的"发一条消息"，而是可以创建一个专属协作线程，双方在线程内完成任务后自动关闭。

### 实际效果

```
南柯 → 猫管家喵管："今天摄像头显示橘猫一直趴着不动，帮我分析一下"
猫管家喵管 → 南柯："根据记录，橘猫今天活动量比平时下降 70%，饮水量也偏少 ⚠️"
猫管家喵管 → 创作墨墨（sessions_send）："橘猫今天状态异常，暂停今天的猫咪视频素材整理"
```

```
南柯 → 程序员阿码："帮我审查这段 Python 代码的性能问题"
程序员阿码 → 南柯："发现 3 个性能瓶颈，建议重构数据库查询部分"
程序员阿码 → 创作墨墨（sessions_send）："南柯刚解决了一个有趣的性能优化案例，可以作为技术博客选题"
```

---

## 第 10 页 · 方案 B 深入：多实例单角色

### 什么时候需要多实例？

| 场景 | 为什么需要多实例 |
|------|-----------------|
| 不同角色需要完全独立的网络环境 | 安全隔离要求高 |
| 某个角色需要独占大量资源 | 避免互相影响 |
| 需要独立升级和维护 | 降低维护风险 |
| 为不同客户提供服务 | 数据完全隔离 |

### 架构图

```
服务器
├── 实例 1（端口 18789）→ 客服助手
│   ├── 独立配置文件
│   ├── 独立工作目录
│   └── 独立进程
├── 实例 2（端口 18889）→ 内容创作助手
│   ├── 独立配置文件
│   ├── 独立工作目录
│   └── 独立进程
└── 实例 3（端口 18989）→ 数据分析助手
    ├── 独立配置文件
    ├── 独立工作目录
    └── 独立进程
```

---

## 第 11 页 · 实操：多实例部署（Profile 方式）

### 方法 1：使用 --profile 参数（推荐）

OpenClaw 内置了 Profile 机制，自动隔离配置和数据：

```bash
# 创建客服实例
openclaw --profile customer-service onboard
# 选择端口 18789，配置客服相关的 Bot Token

# 创建内容创作实例
openclaw --profile content-writer onboard
# 选择端口 18889，配置创作相关的 Bot Token

# 创建数据分析实例
openclaw --profile data-analyst onboard
# 选择端口 18989，配置分析相关的 Bot Token
```

### 启动各实例

```bash
# 安装为系统服务（开机自启）
openclaw --profile customer-service gateway install
openclaw --profile content-writer gateway install
openclaw --profile data-analyst gateway install
```

### 检查状态

```bash
openclaw --profile customer-service status
openclaw --profile content-writer status
openclaw --profile data-analyst status
```

### ⚠️ 端口规划

> 每个实例之间至少预留 20 个端口，避免浏览器/Canvas 等衍生端口冲突。

| 实例 | 基础端口 | 衍生端口范围 |
|------|----------|-------------|
| 客服 | 18789 | 18789-18808 |
| 创作 | 18889 | 18889-18908 |
| 分析 | 18989 | 18989-19008 |

---

## 第 12 页 · 实操：多实例部署（Docker 方式）

### 使用 Docker Compose 部署多实例

创建 `docker-compose.multi.yml`：

```yaml
services:
  # 客服助手实例
  openclaw-cs:
    image: openclaw:local
    environment:
      HOME: /home/node
      OPENCLAW_GATEWAY_TOKEN: ${CS_GATEWAY_TOKEN}
    volumes:
      - ./config/customer-service:/home/node/.openclaw
      - ./workspace/customer-service:/home/node/.openclaw/workspace
    ports:
      - "18789:18789"
    restart: unless-stopped
    command: ["node", "dist/index.js", "gateway", "--bind", "lan", "--port", "18789"]

  # 内容创作助手实例
  openclaw-writer:
    image: openclaw:local
    environment:
      HOME: /home/node
      OPENCLAW_GATEWAY_TOKEN: ${WRITER_GATEWAY_TOKEN}
    volumes:
      - ./config/content-writer:/home/node/.openclaw
      - ./workspace/content-writer:/home/node/.openclaw/workspace
    ports:
      - "18889:18789"
    restart: unless-stopped
    command: ["node", "dist/index.js", "gateway", "--bind", "lan", "--port", "18789"]

  # 数据分析助手实例
  openclaw-analyst:
    image: openclaw:local
    environment:
      HOME: /home/node
      OPENCLAW_GATEWAY_TOKEN: ${ANALYST_GATEWAY_TOKEN}
    volumes:
      - ./config/data-analyst:/home/node/.openclaw
      - ./workspace/data-analyst:/home/node/.openclaw/workspace
    ports:
      - "18989:18789"
    restart: unless-stopped
    command: ["node", "dist/index.js", "gateway", "--bind", "lan", "--port", "18789"]
```

### 启动

```bash
docker compose -f docker-compose.multi.yml up -d
```

---

## 第 13 页 · 方案对比：如何选择？

### 详细对比表

| 对比维度 | 方案 A：单实例多角色 | 方案 B：多实例单角色 |
|----------|---------------------|---------------------|
| **内存占用** | ~200MB（共享） | ~200MB × N 个实例 |
| **配置管理** | 1 个 openclaw.json | N 个 openclaw.json |
| **Agent 间通信** | ✅ 原生支持 sessions_send | ❌ 需要额外开发 |
| **统一管理** | ✅ 一个面板管理所有 Agent | ❌ 需要分别管理 |
| **故障影响** | Gateway 挂了全部受影响 | 单个实例挂了不影响其他 |
| **独立升级** | ❌ 升级影响所有 Agent | ✅ 可以逐个升级 |
| **资源隔离** | Agent 级（共享 CPU/内存） | 进程级（可限制资源） |
| **安全隔离** | 中等（可配置 Sandbox） | 高（完全独立） |

### 选择建议

```
你是一人公司/个人用户？
  ├── 是 → 方案 A（单实例多角色）✅
  │       简单、省资源、Agent 间可协作
  │
  └── 否 → 你需要为不同客户提供服务？
            ├── 是 → 方案 B（多实例单角色）
            │       数据完全隔离，安全合规
            │
            └── 否 → 方案 A + Sandbox
                    兼顾便利性和安全性
```

---

## 第 14 页 · 综合实战：搭建一人公司 AI 团队

### 实战目标

使用方案 A（单实例多角色），搭建一个包含 4 个角色的 AI 团队：

| 角色 | Agent ID | 绑定渠道 | AI 模型 | 核心技能 |
|------|----------|----------|---------|----------|
| 程序员阿码 | code-architect | Telegram Bot 1 | Opus | 代码审查、架构设计 |
| 中医岐伯 | tcm-advisor | Telegram Bot 2 | Sonnet | 体质分析、养生建议 |
| 猫管家喵管 | cat-butler | Telegram Bot 3 | Sonnet | 健康管理、素材整理 |
| 创作墨墨 | content-writer | Discord 频道 | Opus | 文章撰写、选题 |

### 实战步骤清单

1. ☐ 创建 4 个 Agent 工作区
2. ☐ 为每个 Agent 编写 SOUL.md 人格文件
3. ☐ 在 BotFather 创建 3 个 Telegram Bot
4. ☐ 编写 openclaw.json 配置文件（agents + bindings + channels）
5. ☐ 启用 Agent 间通信（agentToAgent）
6. ☐ 为猫管家配置猫咪健康记录 Skill
7. ☐ 重启 Gateway 并验证
8. ☐ 分别测试每个 Agent 的功能
9. ☐ 测试 Agent 间转发消息

---

## 第 15 页 · 实战验证

### 验证清单

#### 基础验证

```bash
# 1. 检查所有 Agent 是否正常
openclaw agents list --bindings

# 2. 检查渠道连接状态
openclaw channels status --probe

# 3. 检查各 Agent 的会话
openclaw sessions list
```

#### 功能验证

| 测试项 | 操作 | 预期结果 |
|--------|------|----------|
| 编程响应 | 向编程 Bot 发送"帮我审查这段代码" | 收到专业的代码审查回复 |
| 中医咨询 | 向中医 Bot 发送"最近总是疲倦怎么办" | 收到辨证分析和养生建议 |
| 猫咪管理 | 向猫管家 Bot 发送"今天橘猫的状态" | 收到基于记录的健康分析 |
| 角色隔离 | 向中医 Bot 发送"帮我写代码" | 岐伯会说这不是它的职责 |
| Agent 通信 | 向猫管家发送异常情况 | 猫管家通知创作助手暂停素材整理 |

#### 人格验证

- ✅ 每个 Bot 的回复风格是否符合 SOUL.md 设定？
- ✅ 每个 Bot 是否只处理自己职责范围内的任务？
- ✅ Agent 间通信是否正常工作？

---

## 第 16 页 · 进阶技巧

### 技巧 1：为不同 Agent 配置不同模型

```json5
{
  agents: {
    list: [
      {
        id: "code-architect",
        // 代码审查和架构设计用最强模型
        model: "anthropic/claude-opus-4-6",
      },
      {
        id: "tcm-advisor",
        // 中医咨询用快速模型，降低成本
        model: "anthropic/claude-sonnet-4-5",
      },
      {
        id: "cat-butler",
        // 日常管理用快速模型
        model: "anthropic/claude-sonnet-4-5",
      },
    ],
  },
}
```

### 技巧 2：为敏感 Agent 启用 Sandbox

```json5
{
  agents: {
    list: [
      {
        id: "tcm-advisor",
        // 中医顾问不需要文件操作和命令执行
        sandbox: {
          mode: "all",
          scope: "agent",
        },
        tools: {
          allow: ["read", "sessions_list", "sessions_send", "web"],
          deny: ["exec", "write", "edit", "browser"],
        },
      },
    ],
  },
}
```

### 技巧 3：使用 Cron 让 Agent 主动工作

```bash
# 让猫管家每天晚上 9 点生成猫咪日报
openclaw cron add --agent cat-butler \
  --schedule "0 21 * * *" \
  --message "请根据今天的摄像头记录和喂食记录，生成四只猫咪的每日健康日报"

# 让中医顾问每周一早上推送当周养生建议
openclaw cron add --agent tcm-advisor \
  --schedule "0 8 * * 1" \
  --message "根据当前节气和南柯的体质档案，推送本周养生建议，包括饮食、作息和穴位按摩"

# 让程序员助理每天早上推送技术资讯
openclaw cron add --agent code-architect \
  --schedule "0 9 * * *" \
  --message "搜索最新的 AI 应用开发和架构设计相关技术动态，生成今日技术简报"
```

### 技巧 4：猫管家的摄像头集成思路

猫管家可以通过以下方式实现摄像头监控分析：

```
摄像头定时截图（每小时）
    ↓
截图保存到指定目录
    ↓
Cron 触发猫管家分析
    ↓
猫管家读取截图 + 调用视觉模型
    ↓
生成活动状态报告
    ↓
异常情况自动告警
```

**配置示例**：

```bash
# 每小时分析一次摄像头截图
openclaw cron add --agent cat-butler \
  --schedule "0 * * * *" \
  --message "检查 ~/cat-cam/ 目录下最新的摄像头截图，分析每只猫的位置和活动状态，如有异常请立即通知我"
```

### 技巧 5：猫咪视频素材管理 Skill

为猫管家编写一个视频脚本生成 Skill：

```markdown
# 猫咪视频脚本生成 Skill

## 触发条件
当用户说"帮我做一个猫咪视频"或"整理今天的猫咪素材"时触发

## 执行步骤
1. 扫描 ~/cat-media/ 目录下今天的照片和视频素材
2. 按猫咪分类整理素材（根据文件名或目录结构）
3. 为每个素材标注内容描述（如"橘猫在窗台晒太阳"）
4. 生成一个 15-30 秒短视频的剪辑脚本，包含：
   - 镜头顺序和每个镜头时长
   - 配文案（温馨治愈风格）
   - BGM 推荐（轻音乐/治愈系）
   - 转场效果建议
5. 将脚本保存为 Markdown 文件

## 输出格式
视频脚本文件，包含镜头列表、文案、音乐和转场建议
```

---

## 第 17 页 · 故障排查

### 常见问题及解决方案

| 问题 | 可能原因 | 解决方案 |
|------|----------|----------|
| Agent 创建后没有出现 | 配置文件语法错误 | 运行 `openclaw doctor` 检查 |
| 消息发到了错误的 Agent | bindings 配置不正确 | 检查 `openclaw agents list --bindings` |
| Agent 间通信失败 | agentToAgent 未启用 | 在 openclaw.json 中启用并添加 allow 列表 |
| 多实例端口冲突 | 端口间隔不够 | 确保基础端口间隔至少 20 |
| Docker 实例启动失败 | 配置目录权限问题 | `sudo chown -R 1000:1000 ./config ./workspace` |
| SOUL.md 不生效 | 文件路径错误 | 确认文件在对应 Agent 的 workspace 目录下 |
| Bot 不回复消息 | dmPolicy 配置问题 | 检查 pairing 状态或 allowFrom 列表 |

### 调试命令速查

```bash
# 检查整体健康状态
openclaw doctor

# 查看 Gateway 日志
openclaw logs --tail 50

# 查看特定 Agent 的会话
openclaw sessions list --agent cat-butler

# 测试发送消息给特定 Agent
openclaw agent --agent code-architect --message "测试消息"

# 重新加载配置（无需重启）
# OpenClaw 会自动监听配置文件变化并热加载
```

---

## 第 18 页 · 安全提示

### 🔒 多 Agent 安全最佳实践

1. **最小权限原则**
   - 每个 Agent 只开放必要的工具权限
   - 客服 Agent 不需要 `exec` 和 `write` 权限
   - 使用 `tools.allow` 和 `tools.deny` 精确控制

2. **Sandbox 隔离**
   - 对面向外部用户的 Agent 启用 Sandbox
   - 设置 `sandbox.mode: "all"` 确保所有会话都在容器中运行
   - 限制网络访问：`docker.network: "none"`

3. **认证隔离**
   - 每个 Agent 使用独立的 Auth Profile
   - 不要在 Agent 之间共享 API Key
   - 定期轮换 Bot Token

4. **数据隔离**
   - 每个 Agent 的 workspace 目录独立
   - 不要让 Agent 访问其他 Agent 的工作目录
   - 敏感数据 Agent 启用 `workspaceAccess: "none"`

---

## 第 19 页 · 验收自检

### 自检清单

完成以下所有项目，即可通过本模块验收：

| 序号 | 检查项 | 状态 |
|------|--------|------|
| 1 | 理解单实例多角色与多实例单角色的区别 | ☐ |
| 2 | 成功创建至少 2 个 Agent 工作区 | ☐ |
| 3 | 为每个 Agent 编写了独立的 SOUL.md | ☐ |
| 4 | 配置了 agents.list 和 bindings 路由规则 | ☐ |
| 5 | 每个 Agent 能通过对应渠道正常回复 | ☐ |
| 6 | Agent 之间的回复风格明显不同（如阿码的严谨 vs 岐伯的温和） | ☐ |
| 7 | （加分）成功配置 Agent 间通信 | ☐ |
| 8 | （加分）为猫管家配置了定时健康日报 | ☐ |
| 9 | （加分）为敏感 Agent（如中医顾问）配置了 Sandbox | ☐ |

---

## 第 20 页 · 社区实战案例①：一人 AI 公司

> 💬 来源：社区实战分享

### 6 个 AI 员工，从零到全天候运转

下面来看一个完整的"一人 AI 公司"（OPC）搭建案例，6 个 Agent 全部在 Telegram 群里协作：

| 角色 | 职责 |
|------|------|
| 大总管 | 统一调度，日程提醒，随手查询 |
| 开发助理 | Review 代码、修 Bug、写脚本 |
| 运营增长 | 盯 SEO 数据、分析流量、优化关键词 |
| 内容助理 | 写公众号、推文、产品文案 |
| 法务助理 | 审合同、查条款、出海合规咨询 |
| 财务助理 | 记账、对账、算 ROI，月底自动出报表 |

### 真实工作场景

在外面开会时，手机上 30 秒发完三条消息，回来就看到三份报告。以前这些事要么自己花 2 小时做，要么找 3 个人分别沟通。

### 关键数据

- 搭建只花了一天，没写一行代码
- 月成本约 200 美元（Claude Max）
- 8 分钟部署两个网站，从需求到上线全自动
- 手机远程打开 Windows 记事本（混合部署）

> 💡 一个人 + 一台服务器 + OpenClaw = 一家公司。这不是概念演示，是真的在干活。

---

## 第 21 页 · 社区实战案例②：6 个 AI 助理替代团队

> 💬 来源：社区多 Agent 实践

### 财务/法务/内容/开发/增长，全干了

再来看另一种 6 个 AI 助理的架构，与上面类似但侧重点不同：

**核心差异：配置驱动，不写代码**

搭建只需三步：
1. 装好 OpenClaw（一行命令）
2. 定义 Agent（写一个 Markdown 文件描述角色和能力）
3. 绑定到消息渠道

**权限隔离的重要性**

每个 Agent 有自己的记忆空间、工具权限、对话历史。财务助理看不到开发助理的代码，开发助理碰不到财务数据——跟真实公司的权限管理一模一样。

**Agent 间协作**

- 内容助理写完初稿，自动让增长助理优化标题
- 不用人工中转，Agent 之间通过 `sessions_send` 直接传消息

### 适合谁？

- ✅ 独立开发者/一人创业者——身兼数职，分身乏术
- ✅ 自由职业者——没有团队但需要团队的产出
- ✅ 小团队 Leader——想让 3 个人干出 10 个人的活
- ❌ 期望"一键搞定所有事"的——AI 是员工，不是魔法

> 💡 工具是你去用它。一人公司是它来找你。AI 助手会主动检查邮件、扫日历、盯数据异常——你不是在"使用 AI"，你是在"管理一个团队"。

---

## 第 22 页 · 总结与展望

### 今日收获

- 🧠 掌握了 OpenClaw 多 Agent 路由的核心概念
- 🛠️ 学会了单实例多角色的配置方法（推荐方案）
- 🐳 了解了多实例部署的 Profile 和 Docker 方式
- 🏢 完成了个性化 AI 团队的实战搭建（程序员助理、中医顾问、猫管家、内容创作）

### 多 Agent 是 AI 的未来方向

OpenClaw 创始人 Peter Steinberger 于 2026 年 2 月加入 OpenAI，专注于"下一代个人 Agent"和多 Agent 系统的研发。OpenClaw 项目本身转为独立基金会运营，保持开源和独立。

这意味着多 Agent 协作不是一个小众玩法，而是整个 AI 行业的核心方向。你今天学到的多 Agent 架构知识，正是这个趋势的实践基础。

### Day 12 → Day 13 的完整进化路径

```
Day 1-7：学会使用一个 AI 助手
    ↓
Day 8-11：让一个 AI 助手做更多事
    ↓
Day 12：让一个 AI 助手自动完成一条工作流
    ↓
Day 13（本节）：让多个 AI 助手各司其职，组成团队
```

### 两种方案速记

```
方案 A：一个 Gateway，多个 Agent → 简单、省资源、可协作 → 推荐！
方案 B：多个 Gateway，各自独立 → 强隔离、高资源、独立维护 → 特殊需求
```

### 继续探索

- 📖 [OpenClaw Multi-Agent 官方文档](https://docs.openclaw.ai/concepts/multi-agent)
- 📖 [Gateway 配置参考](https://docs.openclaw.ai/gateway/configuration)
- 📖 [多 Gateway 部署指南](https://docs.openclaw.ai/gateway/multiple-gateways)
- 📖 [Sandbox 安全指南](https://docs.openclaw.ai/gateway/sandboxing)

> 🎉 恭喜你完成了进阶课程！你现在已经具备了搭建个性化 AI 助手团队的能力。
> 无论是程序员助理、中医顾问还是猫管家，你的 AI 团队会随着使用越来越懂你。
> 继续探索 OpenClaw 的更多可能性吧！
