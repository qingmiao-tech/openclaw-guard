# Lab E：Discord 对接

> PPT 文稿 | 预计时长：1h | 选修渠道 Lab

---

## 第 1 页 · 封面

### Lab E：Discord 对接

**OpenClaw 实战训练营 · 选修渠道 Lab**

预计时长：1 小时

> 今天的目标：将你的 AI 助手接入 Discord，先跑通 DM，再验证服务器频道。

---

## 第 2 页 · 渠道简介

### 为什么选 Discord

- 🎮 海外社区、开发者社群常用
- 🤖 Bot 生态成熟，配套文档完善
- 🧪 很适合作为“频道隔离会话”的观察场景
- 🛠️ 后续扩到 Slash Commands、线程、语音都比较自然

### 前置要求

- ✅ Day 2 完成（OpenClaw 已可运行）
- ✅ 一个 Discord 账号
- ✅ 一个你拥有管理权限的 Discord 服务器
- ✅ 已能正常执行 `openclaw config validate`

---

## 第 3 页 · 这节课的最小成功路径

```text
1. 在 Discord Developer Portal 创建 Bot
   ↓
2. 开启必要 Intents
   ↓
3. 用 OpenClaw 配好 token
   ↓
4. 先跑通 DM pairing，再测服务器频道
```

### 本课统一验收顺序

```bash
openclaw config validate
openclaw gateway restart
openclaw channels status --probe
```

> 先让 DM 成功，再测群组/频道，排障会简单很多。

---

## 第 3.5 页 · 讲师串场话术

- **开场认知**：Discord 虽然接入不算复杂，但它很适合顺手讲清楚“频道权限、DM、intent”这些真实平台差异。
- **实操前提醒**：让学员先明确自己要验证的是频道回复，还是私聊回复，这两条路径不要混着测。
- **卡点转场**：机器人在线但不回消息，最常见不是模型问题，而是 Message Content Intent、频道权限或 @ 触发条件没满足。
- **复盘收口**：Discord 跑通以后，学员对“一个 Agent 在不同场景下为什么会表现不同”会有更直观的理解。

---

## 第 4 页 · 第一步：创建 Discord 机器人

### 操作步骤

1. 打开 [Discord Developer Portal](https://discord.com/developers/applications)
2. 点击 **New Application**
3. 左侧进入 **Bot**
4. 点击 **Add Bot**
5. 点击 **Reset Token**，复制 **Bot Token**

### 必开的 Intents

- ✅ **Message Content Intent**：没有它，机器人可能在线但不回消息
- ✅ **Server Members Intent**：做成员查找、允许列表时很常用

> ⚠️ Token 只当密钥用；截图、录屏、协作文档里都不要暴露。

---

## 第 5 页 · 第二步：邀请机器人进服务器

### 生成邀请链接

在 **OAuth2 → URL Generator** 中：

- Scopes 勾选：
  - `bot`
  - `applications.commands`
- Bot Permissions 至少勾选：
  - `View Channels`
  - `Send Messages`
  - `Read Message History`
  - `Embed Links`
  - `Attach Files`

### 做完这一步后

- 机器人出现在你的服务器里
- 你可以右键复制服务器 ID、频道 ID、用户 ID（先开 Discord 开发者模式）

---

## 第 6 页 · 第三步：把 Discord 渠道加进 OpenClaw

### 推荐方式一：直接添加

```bash
openclaw channels add --channel discord --token <你的BotToken>
```

### 也可以显式写配置

```bash
openclaw config set channels.discord.token "\"<你的BotToken>\"" --json
openclaw config set channels.discord.enabled true --json
```

### 加完立刻校验

```bash
openclaw channels list
openclaw config validate
```

---

## 第 7 页 · 第四步：重启、探测、完成 pairing

### 标准闭环

```bash
openclaw config validate
openclaw gateway restart
openclaw channels status --probe
```

### 先跑通 DM

1. 在 Discord 私信你的机器人：`你好`
2. 第一次通常会拿到 pairing code
3. 在服务器执行：

```bash
openclaw pairing approve discord <配对码>
```

4. 再发：`请介绍一下你自己`

### 再验证服务器频道

在服务器里 **@机器人** 发一句测试消息，确认它能回。

---

## 第 8 页 · 频道模式的两个高频坑

### 坑 1：机器人在线，但频道里不回复

优先检查：

- 是否开了 **Message Content Intent**
- 是否真的 **@ 了机器人**
- 频道权限里是否有 `View / Send / Read History`
- 你的配置是不是默认要求 mention

### 坑 2：我明明关了 mention，为什么还是不理我

Discord 侧和 OpenClaw 侧要同时看：

- OpenClaw 的 `groupPolicy` / `guilds` / `channels` 路由是否允许
- 机器人是否真的在这个频道有权限

> 💡 这类问题不要只盯着“模型有没有回”，本质常常是**事件根本没进来**。

---

## 第 9 页 · 故障排查速查

| 问题 | 先查什么 |
|------|----------|
| 机器人显示离线 | token 是否正确；`openclaw channels status --probe` 是否报连接错误 |
| 在线但 DM 不回复 | 是否完成 pairing；可先 `openclaw pairing list discord` |
| 频道里不回复 | Message Content Intent、频道权限、是否 @ 机器人 |
| 只在 DM 正常，频道异常 | `groupPolicy`、guild/channel allowlist、mention 要求 |
| 命令菜单不出现 | 是否勾选 `applications.commands`；重启 Gateway 后再看 |

### 需要进一步定位时

```bash
openclaw logs --follow
```

---

## 第 10 页 · 验收自检

- [ ] 已在 Discord Developer Portal 创建 Bot 并拿到 Token
- [ ] 已开启 Message Content Intent
- [ ] 已把机器人邀请进服务器
- [ ] 已成功把 Discord 渠道加进 OpenClaw
- [ ] 已跑通 `openclaw config validate`
- [ ] 已执行 `openclaw gateway restart`
- [ ] 已在 `openclaw channels status --probe` 中看到 Discord 正常
- [ ] 已完成一次 DM pairing，并成功在频道里 @ 机器人得到回复

---

## 第 11 页 · 总结

### 今天你完成了 🎉

- 创建了 Discord 机器人
- 学会了 Intents、权限、邀请链接这三件关键事
- 跑通了 DM pairing
- 验证了服务器频道里的真实回复链路

> 🎯 Discord 的真正价值，不只是“能聊天”，而是很适合训练你对会话隔离、频道路由、权限门控的直觉。
