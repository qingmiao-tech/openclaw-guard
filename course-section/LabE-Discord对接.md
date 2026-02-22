# Lab E：Discord 对接

> PPT 文稿 | 预计时长：1h | 选修渠道 Lab

---

## 第 1 页 · 封面

### Lab E：Discord 对接

**OpenClaw 实战训练营 · 选修渠道 Lab**

预计时长：1 小时

> 今天的目标：将你的 AI 助手接入 Discord，在社区服务器中提供智能服务。

---

## 第 2 页 · 渠道简介

### 为什么选 Discord？

- 🎮 全球流行的社区通讯平台
- 👨‍💻 广泛用于开发者社区、学习社群、兴趣小组
- 🤖 成熟的 Bot API，对接流程简单
- ⚡ 与 Telegram 类似，较为简单

### 适用场景

- 游戏社区
- 海外开发者社群
- 学习小组
- 兴趣社区

### 前置要求

- ✅ Day 2 完成（OpenClaw 已在服务器上运行）
- ✅ 一个 Discord 账号
- ✅ 一个你拥有管理权限的 Discord 服务器

---

## 第 3 页 · 创建 Discord 机器人

### 操作步骤

1. 访问 [Discord Developer Portal](https://discord.com/developers/applications)
2. 点击 "New Application"，输入应用名称
3. 左侧菜单点击 "Bot"
4. 点击 "Add Bot" 创建机器人
5. 点击 "Reset Token" 获取 **Bot Token**（只显示一次！）
6. 开启以下选项：
   - ✅ **Message Content Intent**（必须）
   - ✅ **Server Members Intent**（可选）

> ⚠️ Token 只显示一次，务必立即保存！

---

## 第 4 页 · 邀请机器人到服务器

### 生成邀请链接

1. 左侧菜单 → "OAuth2" → "URL Generator"
2. Scopes 勾选 `bot`
3. Bot Permissions 勾选：
   - ✅ Send Messages
   - ✅ Read Message History
   - ✅ View Channels
4. 复制生成的 URL
5. 在浏览器中打开，选择你的服务器并授权

---

## 第 5 页 · 配置 OpenClaw

### 编辑配置文件

```bash
nano openclaw.json
```

### 添加 Discord 渠道配置

```json
{
  "channels": {
    "discord": {
      "enabled": true,
      "token": "你的Bot Token"
    }
  }
}
```

### 重启 Gateway

```bash
pm2 restart openclaw-gw
pm2 logs openclaw-gw --lines 20
```

### 成功标志

日志中应看到：

```
Discord channel connected
```

---

## 第 6 页 · 验证消息收发

### 测试步骤

1. 打开 Discord，进入添加了机器人的服务器
2. 在文字频道中 **@机器人** 发送消息：

> @AI助手 你好

3. 等待 AI 回复
4. 尝试在机器人的**私信（DM）**中发送消息
5. 尝试多轮对话

### ✅ 成功标志

- 频道和私信中 AI 都能正常回复
- 回复速度在几秒内

---

## 第 7 页 · 故障排查速查

| 问题 | 解决方案 |
|------|----------|
| 机器人显示离线 | 检查日志；确认 Token 正确；测试 `curl https://discord.com/api/v10/gateway` |
| 在线但不回复 | 确认已开启 Message Content Intent；确认 @了机器人 |
| 国内连接不稳定 | Discord 在国内可能需要代理，建议用海外服务器 |
| 回复出现在错误频道 | 检查频道路由配置；确认频道权限 |

---

## 第 8 页 · 进阶配置（可选）

| 配置 | 说明 |
|------|------|
| 斜杠命令 | 注册 `/ask`、`/help` 等结构化交互 |
| Embed 消息 | 富文本回复，支持标题、颜色、图片 |
| 多频道管理 | 不同频道配置不同行为 |
| 语音频道集成 | 探索 AI 接入语音频道的可能性 |

---

## 第 9 页 · 验收自检

- [ ] 成功在 Discord Developer Portal 创建了机器人
- [ ] 将机器人邀请到了你的 Discord 服务器
- [ ] 在 Discord 频道和私信中与 AI 机器人成功完成对话

---

## 第 10 页 · 总结

### 今天你完成了 🎉

- 在 Discord Developer Portal 创建了机器人
- 生成邀请链接并添加到服务器
- 配置了 OpenClaw 的 Discord 渠道
- 在 Discord 中与 AI 助手成功对话

> 🎯 Discord 对接和 Telegram 一样简单，非常适合海外社区场景！
