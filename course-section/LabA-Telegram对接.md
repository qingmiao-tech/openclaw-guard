# Lab A：Telegram 对接

> PPT 文稿 | 预计时长：1h | 选修渠道 Lab

---

## 第 1 页 · 封面

### Lab A：Telegram 对接

**OpenClaw 实战训练营 · 选修渠道 Lab**

预计时长：1 小时

> 今天的目标：将你的 AI 助手接入 Telegram，先跑通私聊，再决定要不要放进群里。

---

## 第 2 页 · 渠道简介

### 为什么 Telegram 适合作为第一个渠道

- 🌍 全球流行的即时通讯应用
- 🔓 Bot API 开放，资料多，排障路径清晰
- ⚡ 对接门槛低，适合先建立“渠道接入成功”的信心
- 📱 私聊体验天然适合个人 AI 助手

### 前置要求

- ✅ Day 2 完成（OpenClaw 已可正常运行）
- ✅ 一个 Telegram 账号
- ✅ 能正常访问 Telegram
- ✅ 本机或服务器上已能运行 `openclaw config validate`

> 这节课先把 **私聊跑通**。群组、论坛话题、自动回复放到后半段做增强。

---

## 第 3 页 · 通用四步闭环

### 这节课只做一条最稳的路径

```text
1. 在 Telegram 侧拿到 Bot Token
   ↓
2. 用 OpenClaw CLI 添加 Telegram 渠道
   ↓
3. 验证配置 → 重启 Gateway → 探测渠道状态
   ↓
4. 私聊机器人，完成 pairing，再开始聊天
```

### 本课统一验收顺序

```bash
openclaw config validate
openclaw gateway restart
openclaw channels status --probe
```

> 💡 以后你接别的渠道，也优先按这个顺序排障。先看配置，再看网关，再看渠道，不要一上来就怀疑模型。

---

## 第 3.5 页 · 讲师串场话术

- **开场认知**：如果学员只做一个渠道，优先做 Telegram，因为它最适合用来建立“完整接入闭环”的信心。
- **实操前提醒**：今天不是在学 Telegram 生态本身，而是在练一条最标准的渠道接入链路。
- **卡点转场**：机器人不回复时，先别怪 AI，80% 的问题都在 Bot Token、网络可达性或渠道配置没生效。
- **复盘收口**：Telegram 跑通之后，学员对后面 Discord、飞书、企业微信的理解会一下子轻很多。

---

## 第 4 页 · 第一步：通过 BotFather 创建机器人

### 操作步骤

1. 打开 Telegram，搜索 `@BotFather`
2. 发送 `/start`
3. 发送 `/newbot`
4. 输入机器人**显示名称**
5. 输入机器人**用户名**（必须以 `bot` 结尾）
6. 复制返回的 **Bot Token**

### Token 示例

```text
123456789:ABCdefGHIjklMNOpqrsTUVwxyz
```

> ⚠️ 这是密钥，不要发群里，不要写进公开仓库。

---

## 第 5 页 · 第二步：添加 Telegram 渠道

### 推荐做法：直接用 CLI 添加

```bash
openclaw channels add --channel telegram --token <你的BotToken>
```

### 添加后立刻确认两件事

```bash
openclaw channels list
openclaw config validate
```

### 如果你喜欢显式配置

也可以把 token 放进配置里的 `channels.telegram.botToken`。但课程推荐优先用 CLI 添加，少手改 JSON，少犯格式错误。

---

## 第 6 页 · 第三步：重启 Gateway 并做健康检查

### 配置改完以后，不要直接去发消息

先跑这一组命令：

```bash
openclaw config validate
openclaw gateway restart
openclaw channels status --probe
```

### 你希望看到什么

- `config validate` 通过
- `channels status --probe` 里 Telegram 至少是 `connected` / `ready`
- 没有明显的 token、DNS、网络错误提示

### 卡住时再看日志

```bash
openclaw logs --follow
```

---

## 第 7 页 · 第四步：完成 pairing，跑通第一次私聊

### 测试步骤

1. 在 Telegram 中打开你的机器人
2. 先发送一条消息，比如：`你好`
3. 机器人第一次通常会返回一个 **pairing code**
4. 在服务器上执行：

```bash
openclaw pairing approve telegram <配对码>
```

5. 再次给机器人发消息：`请介绍一下你自己`
6. 继续多轮对话，确认上下文连贯

### ✅ 成功标志

- pairing 通过
- 私聊中几秒内收到回复
- 第二条、第三条消息上下文连贯

---

## 第 8 页 · 群组模式（可选增强）

### 跑通私聊以后，再考虑群组

如果你想在群里使用，需要同时考虑两件事：

1. **OpenClaw 侧**：这个群是否允许接入、是否要求 @ 机器人
2. **Telegram 侧**：BotFather 隐私模式是否关闭，或机器人是否被设为管理员

### 一个常见配置思路

```json5
{
  channels: {
    telegram: {
      groups: {
        "-1001234567890": { requireMention: true }
      }
    }
  }
}
```

> 想让机器人在群里“看见所有消息”，通常还需要在 BotFather 里处理 `/setprivacy`，或者直接给机器人管理员权限。

---

## 第 9 页 · 故障排查速查

| 问题 | 先查什么 |
|------|----------|
| 机器人完全不回复 | `openclaw channels status --probe` 是否看到 Telegram 已连接 |
| 机器人发了 pairing code，但批准后仍无回复 | 是否批准了正确渠道的 code；可先 `openclaw pairing list telegram` |
| 日志出现 `Unauthorized` | Bot Token 错了，回 BotFather 重置 |
| 群里只有 @ 它才理你 | 这是默认安全行为；改 `requireMention` 或群策略 |
| 关了 @ 仍然不回 | 检查 BotFather 隐私模式，或把机器人设为管理员 |
| 网络偶发失败 | 检查服务器到 `api.telegram.org` 的 DNS / HTTPS / IPv6 出口 |

### 一个高频误区

很多人是**已经改好了配置**，但没跑 `openclaw gateway restart`，结果以为 Telegram 有问题。先重启网关，再怀疑平台。

---

## 第 10 页 · 验收自检

- [ ] 已通过 BotFather 创建机器人并拿到 Bot Token
- [ ] 已成功执行 `openclaw channels add --channel telegram --token ...`
- [ ] 已跑通 `openclaw config validate`
- [ ] 已执行 `openclaw gateway restart`
- [ ] 已在 `openclaw channels status --probe` 中看到 Telegram 正常
- [ ] 已完成一次 Telegram pairing 并成功私聊

---

## 第 11 页 · 社区实战案例：Telegram 作为多 Agent 试验场

> 💬 来源：社区多 Agent 实战

为什么很多人先选 Telegram 做多 Agent 验证？

- 新建 Bot 快，试错成本低
- 私聊先跑单 Agent，成功后再扩群组或多 Bot
- 当你后面做到 Day 13 / Day 14，多 Agent 路由、会话隔离、账号绑定都更容易观察

> 💡 Telegram 最大的价值不是“便宜”，而是“反馈快”。做渠道接入时，最快看到闭环，往往最重要。

---

## 第 12 页 · 总结

### 今天你完成了 🎉

- 创建了 Telegram 机器人
- 用 CLI 把 Telegram 渠道接进了 OpenClaw
- 学会了“配置校验 → 重启网关 → 渠道探测”的闭环
- 跑通了第一次 Telegram 私聊

> 🎯 如果这是你第一个渠道，建议先稳定用 1-2 天，再去做飞书、Discord 或群组增强。
