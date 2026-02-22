# Lab A：Telegram 对接

> PPT 文稿 | 预计时长：1h | 选修渠道 Lab

---

## 第 1 页 · 封面

### Lab A：Telegram 对接

**OpenClaw 实战训练营 · 选修渠道 Lab**

预计时长：1 小时

> 今天的目标：将你的 AI 助手接入 Telegram，随时随地通过手机与 AI 对话。

---

## 第 2 页 · 渠道简介

### 为什么选 Telegram？

- 🌍 全球流行的即时通讯应用
- 🔓 强大的 Bot API，开放性高
- ⚡ **所有渠道中对接最简单**，无需审核
- 🎯 适合作为第一个对接的渠道

### 适用场景

- 海外用户社群
- 个人 AI 助手
- 自动化通知推送

### 前置要求

- ✅ Day 2 完成（OpenClaw 已在服务器上运行）
- ✅ 一个 Telegram 账号
- ✅ 能正常访问 Telegram

---

## 第 3 页 · 通用对接流程回顾

### Day 3 学过的四步流程

```
1. 获取渠道凭证（Bot Token）
    ↓
2. 在 OpenClaw 配置文件中填入渠道信息
    ↓
3. 重启 Gateway 使配置生效
    ↓
4. 验证消息收发
```

> 所有渠道都遵循这个流程，只是凭证获取方式不同

---

## 第 4 页 · 第一步：创建 Telegram 机器人

### 通过 BotFather 创建

1. 打开 Telegram，搜索 `@BotFather`
2. 发送 `/start` 开始
3. 发送 `/newbot` 创建新机器人
4. 输入机器人**显示名称**（如"我的AI助手"）
5. 输入机器人**用户名**（必须以 `bot` 结尾，如 `my_openclaw_bot`）
6. 创建成功！BotFather 返回 **Bot Token**

### Bot Token 格式

```
123456789:ABCdefGHIjklMNOpqrsTUVwxyz
```

> ⚠️ 妥善保存这个 Token，不要分享给他人！

---

## 第 5 页 · 第二步：配置 OpenClaw

### 编辑配置文件

```bash
# SSH 连接到服务器
ssh root@你的服务器IP

# 进入 OpenClaw 工作目录
# 编辑配置文件
nano openclaw.json
```

### 添加 Telegram 渠道配置

```json
{
  "channels": {
    "telegram": {
      "enabled": true,
      "token": "你的Bot Token"
    }
  }
}
```

> 💡 建议将 Token 存储在环境变量中（参考 Day 11 安全最佳实践）

---

## 第 6 页 · 第三步：重启 Gateway

### 使配置生效

```bash
# 重启 Gateway
pm2 restart openclaw-gw

# 查看日志确认连接成功
pm2 logs openclaw-gw --lines 20
```

### 成功标志

日志中应看到类似信息：

```
Telegram channel connected
```

---

## 第 7 页 · 第四步：验证消息收发

### 测试步骤

1. 在 Telegram 中搜索你的机器人用户名（如 `@my_openclaw_bot`）
2. 点击进入对话
3. 发送 `/start` 激活机器人
4. 发送测试消息："你好，请介绍一下你自己"
5. 等待 AI 回复（通常几秒内）
6. 尝试多轮对话
7. 尝试让 AI 执行任务："帮我查一下今天的天气"

### ✅ 成功标志

- 机器人在几秒内回复消息
- 回复风格符合 soul.md 定义
- 多轮对话上下文连贯

---

## 第 8 页 · 故障排查速查

| 问题 | 解决方案 |
|------|----------|
| 发送消息后无回复 | 检查日志；确认 Token 正确；确认服务器能访问 Telegram API |
| 日志显示 "Unauthorized" | Token 无效或过期，重新在 BotFather 获取 |
| 国内服务器无法连接 | Telegram API 在国内可能需要代理或使用海外服务器 |
| 回复很慢（超过 30 秒） | 检查 AI 模型 API 响应速度；检查网络延迟 |

### 网络连通性测试

```bash
curl https://api.telegram.org
```

---

## 第 9 页 · 进阶配置（可选）

| 配置 | 说明 |
|------|------|
| Webhook 模式 | 替代 Polling，提升响应速度（需 HTTPS） |
| Markdown 格式 | 让 AI 回复支持加粗、链接、代码块 |
| 群组模式 | 将机器人添加到群组，实现群内 AI 助手 |
| 命令菜单 | 通过 `/setcommands` 设置快捷命令 |

---

## 第 10 页 · 验收自检

- [ ] 成功通过 BotFather 创建了 Telegram 机器人
- [ ] 在 openclaw.json 中正确配置了 Telegram 渠道
- [ ] 在 Telegram 中与 AI 机器人成功完成对话

---

## 第 11 页 · 社区实战案例：Telegram 上养 12 个 AI 员工

> 💬 来源：社区多 Agent 实战

### 一个群，6 个 AI，各司其职

下面来看一个实战案例——在 Telegram 上搭建 6 个 Bot 组成的 AI 团队，全部拉到一个群里协作：

- 大总管：统一调度
- 开发助理、内容助理、运营增长、法务助理、财务助理

在群里 @ 谁谁干活——"@开发助理 帮我看看这段代码有没有 bug"，就像在公司群里 @ 同事一样。

### Telegram 多 Agent 的关键配置

每个 Bot 需要在 BotFather 单独创建，然后在 `openclaw.json` 中配置多账户：

```json
"channels": {
  "telegram": {
    "accounts": {
      "main-bot": { "botToken": "Token1" },
      "dev-bot": { "botToken": "Token2" },
      "content-bot": { "botToken": "Token3" }
    }
  }
}
```

通过 `bindings` 将每个 Bot 绑定到对应的 Agent：

```json
"bindings": [
  { "agentId": "main", "match": { "channel": "telegram", "accountId": "main-bot" } },
  { "agentId": "dev", "match": { "channel": "telegram", "accountId": "dev-bot" } }
]
```

### 跨平台记忆

在 Telegram 上聊过的事情，切到飞书它还记得。因为记忆存在 workspace 里，跟渠道无关。

> 💡 Telegram 是搭建多 Agent 团队最简单的起点——无需审核，Bot API 开放性高，适合快速验证多 Agent 架构。

---

## 第 12 页 · 总结

### 今天你完成了 🎉

- 通过 BotFather 创建了 Telegram 机器人
- 配置了 OpenClaw 的 Telegram 渠道
- 成功在 Telegram 中与 AI 助手对话

> 🎯 Telegram 是最简单的渠道对接，掌握了这个流程，其他渠道也能快速上手！
