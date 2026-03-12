# Lab F：模型配置与省钱攻略

> PPT 文稿 | 预计时长：1h | 选修配置 Lab

---

## 第 1 页 · 封面

### Lab F：模型配置与省钱攻略

**OpenClaw 实战训练营 · 选修配置 Lab**

预计时长：1 小时

> 今天的目标：把“能用什么模型、怎么切、怎么省、出了问题先查什么”一次讲清楚。

---

## 第 2 页 · 学习目标

完成本模块后，你将能够：

1. ✅ **查看** 当前 OpenClaw 实际可用的模型、认证状态与默认模型
2. ✅ **切换** 默认模型、配置回退链，并完成一次最小可用验证
3. ✅ **排查** 模型接入中的高频错误：认证失败、模型 ID 错误、上下文过小、切换后仍像旧模型

> 这节课不是讲“模型理论大全”，而是解决一个最实际的问题：**别让模型配置成为你整个 Agent 系统里最不稳定的一环。**

---

## 第 3 页 · 先建立一个正确心智模型

### 模型接入里最容易混的 4 个概念

| 概念 | 你可以把它理解成什么 | 示例 |
|------|----------------------|------|
| Provider | 模型服务入口 / 平台 | `anthropic`、`openai`、`openrouter`、自建兼容网关 |
| Model | 具体模型 | `anthropic/claude-opus-4-6` |
| Alias | 你给模型取的快捷名 | `opus`、`cheap` |
| Fallbacks | 主模型失败后的备用顺序 | `["anthropic/claude-sonnet-4-5", "openai/gpt-5"]` |

### 这节课的统一动作顺序

```text
先看现在能用什么
  ↓
再切默认模型 / 配备用模型
  ↓
验证配置
  ↓
重启 Gateway
  ↓
开一个新会话做验证
```

### 课堂统一闭环

```bash
openclaw models status
openclaw config validate
openclaw gateway restart
```

> 💡 严格来说，有些模型配置会在“下次读取时静默生效”；但课程里我们统一要求 **validate → restart → 新会话验证**，这样最稳，也最方便排障。

---

## 第 3.5 页 · 讲师串场话术

- **开场认知**：这节不是模型科普课，而是一节“少踩坑、少花钱、会验证”的实操课。
- **实操前提醒**：让学员坚持一个顺序：先 `status/list` 看清现状，再切模型，再验证，不要一上来手改很多配置。
- **卡点转场**：模型不工作时，先怀疑模型 ID、provider 认证、fallback 和上下文窗口，不要先怀疑 Prompt 写得不够好。
- **复盘收口**：这一节结束后，学员至少要知道什么时候该上强模型，什么时候该用便宜模型，以及出了问题先查哪里。

---

## 第 4 页 · 第一步：先看当前到底有什么模型可用

### 不要上来就改 JSON，先看现状

```bash
openclaw models status
openclaw models list
```

### 分别看什么

- `openclaw models status`
  - 当前默认模型是谁
  - fallback 链有没有配
  - 当前 provider 认证是不是健康
- `openclaw models list`
  - OpenClaw 当前能识别哪些模型
  - 你想切的模型名到底是不是这个 ID

### 如果你怀疑认证有问题

```bash
openclaw models status --probe
```

> ⚠️ `--probe` 会发真实请求，可能消耗 token，也可能触发限流。课堂演示时够用，线上环境不要频繁乱点。

---

## 第 5 页 · 第二步：先学会最小切模型

### 最简单的方式：直接切默认模型

```bash
openclaw models set anthropic/claude-opus-4-6
```

或者如果你已经有 alias：

```bash
openclaw models set opus
```

### 切完后立刻跑验证闭环

```bash
openclaw models status
openclaw config validate
openclaw gateway restart
```

### 课程里为什么还要求“新开一个会话”

因为很多同学切完模型以后，会直接在旧会话里问：

> “你现在是什么模型？”

结果它按旧上下文回答，大家就误以为“配置没生效”。
更稳的做法是：

1. 重启 Gateway
2. 新开一个 session / 新私聊窗口
3. 再发一条最小验证消息

---

## 第 6 页 · 第三步：配一个真正可用的自定义 Provider

### 什么时候需要 `models.providers`

- 你要接 **OpenAI 兼容网关**
- 你要接 **Anthropic 兼容网关**
- 你要接 **国内中转 / 企业代理 / 自建转发**
- 你要自己显式声明 `contextWindow`、`maxTokens`、`cost`

### 一个最小 Anthropic 兼容示例

```json
{
  "models": {
    "providers": {
      "kiro-proxy": {
        "baseUrl": "https://your-gateway.example.com/anthropic",
        "apiKey": "sk-xxx",
        "api": "anthropic-messages",
        "models": [
          {
            "id": "claude-opus-4-6",
            "name": "Claude Opus 4.6",
            "contextWindow": 150000,
            "maxTokens": 32768
          }
        ]
      }
    }
  },
  "agents": {
    "defaults": {
      "model": {
        "primary": "kiro-proxy/claude-opus-4-6"
      }
    }
  }
}
```

### 两个关键提醒

1. `primary` 写的是 **`provider/model-id`**
2. `contextWindow` 和 `maxTokens` 不要乱填，尤其是代理渠道不一定等于官方满血参数

> 💡 如果是 `anthropic-messages` 兼容端点，课程里建议优先写基础根路径，不要自己额外拼 `/v1`；新版通常会做兼容规范化，但少写一步，少一个坑。

---

## 第 7 页 · 最常见的坑：上下文参数写小了

### 真实报错长这样

```text
Model context window too small (4096 tokens). Minimum is 16000.
[agent/embedded] blocked model (context window too small)
source=modelsConfig
```

### 它不是在骂模型不行，而是在骂你的配置不对

OpenClaw 会参考模型元数据来判断：

- 这个模型最多能处理多少上下文
- 该什么时候压缩对话
- 单次回复最多给多少 token

如果你把 `contextWindow` 写成了 `4096`，即使上游其实是 150K / 200K，上层系统也会按 4096 去保护性阻断。

### 一句人话解释两个参数

| 参数 | 作用 | 类比 |
|------|------|------|
| `contextWindow` | 模型总共能“看到”多少上下文 | 你的桌面有多大 |
| `maxTokens` | 模型一次最多能回多长 | 你这次最多能写多少字 |

### 课堂建议

- 不确定时，优先看上游文档或 `/v1/models`
- 代理渠道不要默认等于官方满血
- `maxTokens` 不要大于 `contextWindow`

---

## 第 8 页 · 第四步：把“省钱”做成配置，而不是靠运气

### 最值得学员掌握的，不是便宜渠道八卦，而是这三件事

1. **主模型和备用模型分层**
2. **高价值任务和 routine 任务分层**
3. **使用量可观测**

### 典型做法：给默认模型加 fallback

```json
{
  "agents": {
    "defaults": {
      "model": {
        "primary": "anthropic/claude-opus-4-6",
        "fallbacks": [
          "anthropic/claude-sonnet-4-5",
          "openai/gpt-5"
        ]
      }
    }
  }
}
```

### 什么时候 fallback 真正有用

- 主模型认证失败
- 主模型被限流
- 主模型调用超时

### 什么时候它**不会**帮你兜底

- 你把模型 ID 写错了
- 这个模型根本不在允许列表里
- 你的 provider 配置结构本身就不合法

> 💡 所以：**fallback 是兜运行时故障，不是兜配置错误。**

---

## 第 9 页 · 省钱的正确姿势

### 推荐的成本分层思路

| 场景 | 建议模型策略 |
|------|--------------|
| 主对话 / 复杂推理 / 高价值决策 | 用更强模型做 primary |
| 定时巡检 / 简单摘要 / routine 任务 | 用更便宜模型单独覆盖 |
| 自动化 Hook / Cron | 能指定更便宜模型就不要硬吃主模型 |
| 多 Agent 团队 | 主管强模型，执行型 Agent 用便宜模型 |

### 先学会“看账单体感”，再谈极致优化

```bash
openclaw status --usage
```

### 课程里的成本观

- 不鼓励一上来追求“全链路最低价”
- 先保证稳定、可验证、能复现
- 再在自动化、子 Agent、批处理任务上做模型降级

> 一句话：**不要为了省 20% 的 token，浪费 3 小时排障。**

---

## 第 10 页 · 高发故障排查表

| 症状 | 先查什么 | 典型原因 |
|------|----------|----------|
| `Unknown model` | `openclaw models list` | 模型 ID 写错 / 不在目录里 |
| `No API provider registered` | provider 配置里有没有 `api` | 自定义 provider 缺字段 |
| `400 Model Not Exist` | 去上游 `/v1/models` 查实际模型名 | 写了宣传名，不是 API 实际 ID |
| `No API key found` | `openclaw models status --probe` | provider 凭证没配好 |
| 切完模型后它还说自己是旧模型 | 是否新开了会话 | 旧 session 上下文在说话 |
| 聊久了突然挂 | `contextWindow` 是否被写小 | 代理渠道上下文参数填错 |

### 排障优先顺序，别乱

```text
1. openclaw models status
2. openclaw models list
3. openclaw config validate
4. openclaw gateway restart
5. 新开一个 session 再测
```

---

## 第 11 页 · 课堂实操任务

### 任务 1：切换一次默认模型

1. 执行 `openclaw models list`
2. 选一个你当前环境里确实存在的模型
3. 执行 `openclaw models set <model-or-alias>`
4. 执行 `openclaw config validate`
5. 执行 `openclaw gateway restart`
6. 开一个新会话，发送：`请先做自我介绍，再总结一下你能帮我做什么`

### 任务 2：给默认模型加一个 fallback

1. 编辑 `~/.openclaw/openclaw.json`
2. 在 `agents.defaults.model.fallbacks` 中加 1-2 个备用模型
3. 再跑一次：

```bash
openclaw config validate
openclaw gateway restart
openclaw models status
```

### 任务 3：识别一个假问题

请刻意在旧会话里问一句：

```text
你现在是什么模型？
```

然后再在**新会话**里问一次，对比差异，理解为什么课程里一直强调“切模型后先新开 session 再验收”。

---

## 第 12 页 · 验收自检

- [ ] 我能用 `openclaw models status` 看懂当前默认模型和认证状态
- [ ] 我能用 `openclaw models list` 找到正确模型 ID
- [ ] 我完成了一次默认模型切换
- [ ] 我能跑通 `openclaw config validate`
- [ ] 我在切模型后执行了 `openclaw gateway restart`
- [ ] 我知道 fallback 只能兜运行时故障，不能兜配置错误
- [ ] 我知道切模型后应该开新会话做验证

---

## 第 13 页 · 讲师备注：这节课该讲到哪，不该讲到哪

### 适合讲给学员的

- 怎么看当前模型状态
- 怎么切默认模型
- 怎么加 fallback
- 怎么定位 4 类高频模型配置错误

### 适合放到补充资料 / 讲师备课的

- provider 内部 auth profile 轮换机制
- 自动摘要和 compaction 的完整实现细节
- 允许列表、alias、catalog merge / replace 的底层规则
- 运行时 `models.json` 快照合并机制

> 课程原则不变：**先让学员会切、会验、会排障，再慢慢补系统原理。**
