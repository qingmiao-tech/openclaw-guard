# Lab C：飞书对接

> PPT 文稿 | 预计时长：1.5h | 选修渠道 Lab

---

## 第 1 页 · 封面

### Lab C：飞书对接

**OpenClaw 实战训练营 · 选修渠道 Lab**

预计时长：1.5 小时

> 今天的目标：将你的 AI 助手接入飞书，实现企业内部的智能协作。

---

## 第 2 页 · 渠道简介

### 为什么选飞书？

- 🏢 字节跳动旗下企业协作平台
- 📝 集即时通讯、文档协作、日历、视频会议于一体
- 🤖 开放平台支持创建机器人应用

### 适用场景

- 企业内部助手
- 团队知识问答
- 自动化通知

### 前置要求

- ✅ Day 2 完成（OpenClaw 已在服务器上运行）
- ✅ 一个飞书账号（个人版或企业版）
- ✅ 飞书开放平台开发者权限

---

## 第 3 页 · 创建飞书机器人

### 操作步骤

1. 访问 [飞书开放平台](https://open.feishu.cn)，飞书账号登录
2. 进入"开发者后台" → "创建企业自建应用"
3. 填写应用信息：名称、描述、图标
4. 获取凭证：
   - **App ID**：应用唯一标识
   - **App Secret**：应用密钥
5. "添加应用能力" → 添加"机器人"
6. 配置"事件订阅"：
   - Webhook URL 或长连接模式（WebSocket）
7. "权限管理"中申请：
   - `im:message`（接收消息）
   - `im:message:send_as_bot`（发送消息）
8. 发布应用版本，等待管理员审核

---

## 第 4 页 · 配置 OpenClaw

### 编辑配置文件

```bash
nano openclaw.json
```

### 添加飞书渠道配置

```json
{
  "channels": {
    "feishu": {
      "enabled": true,
      "appId": "你的App ID",
      "appSecret": "你的App Secret",
      "verificationToken": "你的Verification Token",
      "encryptKey": "你的Encrypt Key"
    }
  }
}
```

> `verificationToken` 和 `encryptKey` 在飞书开放平台"事件订阅"页面获取

### 重启 Gateway

```bash
pm2 restart openclaw-gw
```

> ⚠️ Webhook 模式需要服务器有公网 IP 且配置 HTTPS（飞书要求）

---

## 第 5 页 · 验证消息收发

### 测试步骤

1. 在飞书中搜索你创建的机器人名称
2. 点击进入**单聊**
3. 发送测试消息："你好，请介绍一下你自己"
4. 等待 AI 回复
5. 将机器人添加到飞书群，@机器人 发送消息
6. 确认群内消息也能正常回复

### ✅ 成功标志

- 单聊和群聊中 AI 都能正常回复
- 回复速度在几秒内

---

## 第 6 页 · 故障排查速查

| 问题 | 解决方案 |
|------|----------|
| Webhook 验证失败 | 确认服务器地址可从外网访问；确认 HTTPS 证书有效 |
| 收到消息但不回复 | 检查日志；确认已申请 send_as_bot 权限且审核通过 |
| 应用审核未通过 | 检查信息完整性；联系企业管理员 |
| 群聊中不响应 | 确认机器人已添加到群；确认 @了机器人 |

---

## 第 7 页 · 进阶配置（可选）

| 配置 | 说明 |
|------|------|
| 消息卡片 | 使用 Interactive Card 发送富文本回复 |
| 飞书文档集成 | 让 AI 读取和编辑飞书文档 |
| 审批流集成 | 与飞书审批流程结合 |
| 多租户支持 | 服务多个部门或团队 |

---

## 第 8 页 · 验收自检

- [ ] 成功在飞书开放平台创建了机器人应用
- [ ] 在 openclaw.json 中正确配置了飞书渠道
- [ ] 在飞书单聊和群聊中与 AI 机器人成功完成对话

---

## 第 9 页 · 社区实战案例：飞书上搭建 6 个 AI 员工

> 💬 来源：社区飞书多 Agent 实战

### 飞书多 Agent 的完整搭建流程

下面来看一个实战案例——在飞书上搭建 6 个独立的 AI Agent（大总管 + 开发/内容/运营/法务/财务助理），核心步骤：

**第一步：创建 6 个飞书应用**

在飞书开放平台为每个 Agent 创建独立应用，每个都需要：
- 开启"机器人能力"
- 配置"长连接事件订阅"（im.message.receive_v1）
- 发版发布

**第二步：配置多账户通道**

```json
"channels": {
  "feishu": {
    "enabled": true,
    "accounts": {
      "main": { "appId": "cli_xxx1", "appSecret": "secret1" },
      "dev": { "appId": "cli_xxx2", "appSecret": "secret2" },
      "content": { "appId": "cli_xxx3", "appSecret": "secret3" }
    }
  }
}
```

**第三步：配置 Agent 间通信**

```json
"tools": {
  "agentToAgent": {
    "enabled": true,
    "allow": ["main", "dev", "content", "ops", "law", "finance"]
  }
}
```

### 踩过的坑

1. **旧版飞书插件不支持多账户**：必须升级到内置新版
2. **每个应用必须手动开启"长连接事件订阅"**：少了这步 Bot 上不了线
3. **AGENTS.md 必须写团队成员列表**：不然 Agent 之间不知道彼此存在

### 验证命令

```bash
openclaw agents list --bindings     # 查看所有 agent 和路由规则
openclaw channels status --probe    # 查看所有通道在线状态
```

> 💡 飞书多 Agent 配置比 Telegram 复杂，但完成后可以深度集成企业协作场景——文档、日历、审批流全部打通。

---

## 第 10 页 · 总结

### 今天你完成了 🎉

- 在飞书开放平台创建了机器人应用
- 配置了事件订阅和权限
- 配置了 OpenClaw 的飞书渠道
- 在飞书中与 AI 助手成功对话

> 💡 飞书对接配置较复杂，但完成后可以深度集成企业协作场景
