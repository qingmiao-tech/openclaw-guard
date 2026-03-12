# Lab C：飞书对接

> PPT 文稿 | 预计时长：1.5h | 选修渠道 Lab

---

## 第 1 页 · 封面

### Lab C：飞书对接

**OpenClaw 实战训练营 · 选修渠道 Lab**

预计时长：1.5 小时

> 今天的目标：将你的 AI 助手接入飞书，先跑通聊天，再验证文档 / 知识库等飞书技能。

---

## 第 2 页 · 渠道简介

### 为什么飞书值得专门做一节

- 🏢 企业协作场景密集，离真实交付更近
- 📝 不只是聊天，还能继续接文档、知识库、云盘、多维表格
- 🤖 很适合做团队知识问答、流程助手、内容协作

### 前置要求

- ✅ Day 2 完成（OpenClaw 已可正常运行）
- ✅ 一个飞书账号
- ✅ 能进入飞书开放平台
- ✅ 已能执行 `openclaw config validate`

> 这节课先把 **聊天入口** 跑通，再去验证飞书技能，不要一开始就同时调五种权限。

---

## 第 3 页 · 本课的最小成功路径

```text
1. 安装 Feishu 插件
   ↓
2. 在飞书开放平台创建自建应用
   ↓
3. 用 CLI 把 Feishu 账号加进 OpenClaw
   ↓
4. 配置校验 → 重启 Gateway → pairing → 聊天验证
```

### 本课统一验收顺序

```bash
openclaw config validate
openclaw gateway restart
openclaw channels status --probe
```

---

## 第 3.5 页 · 讲师串场话术

- **开场认知**：飞书这节更接近“企业内部系统接入”，不是单纯做一个聊天机器人。
- **实操前提醒**：让学员提前接受一个预期——飞书的重点不在代码多，而在权限、事件订阅、发布审核这些企业平台动作。
- **卡点转场**：如果飞书不回消息，优先看事件订阅、权限申请、版本发布和渠道探测，不要一上来反复重启。
- **复盘收口**：飞书跑通后，学员会真正理解为什么企业场景里“平台配置能力”几乎和“编码能力”一样重要。

---

## 第 4 页 · 第一步：安装 Feishu 插件

### 官方插件安装

```bash
openclaw plugins install @openclaw/feishu
```

### 装完先确认

```bash
openclaw config validate
```

> 💡 飞书不是纯内置零配置渠道，先把插件装对，后面的排障会轻松很多。

---

## 第 5 页 · 第二步：创建飞书应用

### 操作步骤

1. 打开 [飞书开放平台](https://open.feishu.cn/app)
2. 创建**企业自建应用**
3. 获取：
   - **App ID**
   - **App Secret**
4. 在“应用能力”里开启**机器人**
5. 在“事件订阅”中选择 **长连接模式（WebSocket）**
6. 添加事件：`im.message.receive_v1`
7. 创建版本并发布

### 第一轮先开最小聊天权限

- `im:message`
- `im:message:send_as_bot`
- `contact:user.id:readonly`

> 先把聊天跑通。文档、知识库、云盘、多维表格权限后面再加。

---

## 第 6 页 · 第三步：把飞书渠道加进 OpenClaw

### 推荐方式：使用 CLI 向导

```bash
openclaw channels add
```

然后在交互式提示里：

1. 选择 **Feishu**
2. 输入 `App ID`
3. 输入 `App Secret`

### 加完以后立刻检查

```bash
openclaw channels list
openclaw config validate
```

> 课程里不推荐一上来手改 `openclaw.json`。先用向导把最小配置落进去，少一半格式问题。

---

## 第 7 页 · 第四步：重启、探测、完成 pairing

### 标准闭环

```bash
openclaw config validate
openclaw gateway restart
openclaw channels status --probe
```

### 第一次聊天怎么做

1. 在飞书里找到你的机器人
2. 给它发一条消息：`你好`
3. 第一次通常会返回一个 **pairing code**
4. 在服务器执行：

```bash
openclaw pairing approve feishu <配对码>
```

5. 再发：`请介绍一下你自己`

### ✅ 成功标志

- 能完成 pairing
- 单聊中收到正常回复
- `channels status --probe` 没有明显权限或连接错误

---

## 第 8 页 · 第五步：再给飞书技能补权限

### 第二轮再做能力扩展

当聊天入口稳定以后，再逐步加这些能力：

| 能力 | 典型权限 |
|------|----------|
| 飞书文档 | `docx:document:readonly`、`docx:document` |
| 知识库 | `wiki:wiki:readonly`、`wiki:wiki` |
| 云盘 | `drive:drive:readonly`、`drive:drive` |
| 多维表格 | `bitable:bitable:readonly`、`bitable:bitable` |
| 权限管理 | `drive:drive:permission` |
| 应用自检 | `application:application` |

### 一个非常实用的自检方式

让 AI 执行：

- `feishu_app_scopes`

它能帮助你判断“到底是没权限，还是权限开了但还没发版生效”。

> ⚠️ 飞书里最常见的问题不是“权限没申请”，而是“权限申请了，但没发布新版本”。

---

## 第 9 页 · 技能验证清单

### 建议按这个顺序测

1. **权限自检**：`帮我检查当前飞书应用有哪些权限`
2. **文档**：`帮我创建一个飞书文档，标题叫测试文档`
3. **知识库**：`帮我列一下我可见的知识库`
4. **云盘**：`帮我看看飞书云盘根目录有哪些文件`
5. **多维表格**：给 AI 发一个 bitable 链接，让它读取

### ✅ 成功标志

- 至少 3 项能力验证通过
- 出错时能看懂是“权限问题”还是“内容访问范围问题”

---

## 第 10 页 · 故障排查速查

| 问题 | 先查什么 |
|------|----------|
| 机器人完全没反应 | 插件是否装好；`channels status --probe` 是否看到 Feishu 正常 |
| 事件订阅保存失败 | 先确认已经添加 Feishu 渠道，且 Gateway 处于运行状态 |
| 收到消息但不回复 | 是否完成 pairing；是否开了 `send_as_bot` |
| 报“权限不足” | 用 `feishu_app_scopes` 看缺哪个 scope；再确认是否已发布新版本 |
| 知识库是空的 | 机器人是否被加进对应知识库成员 |
| 云盘/文档打不开 | 权限范围对了，但资源本身没共享给机器人 |

### 需要进一步定位时

```bash
openclaw logs --follow
```

---

## 第 11 页 · 验收自检

- [ ] 已安装 `@openclaw/feishu` 插件
- [ ] 已在飞书开放平台创建应用并拿到 App ID / App Secret
- [ ] 已开启机器人能力、长连接事件订阅，并添加 `im.message.receive_v1`
- [ ] 已通过 `openclaw channels add` 完成飞书接入
- [ ] 已跑通 `openclaw config validate`
- [ ] 已执行 `openclaw gateway restart`
- [ ] 已在 `openclaw channels status --probe` 里看到飞书状态正常
- [ ] 已完成一次飞书 pairing 并在单聊里收到回复
- [ ] 已至少验证 3 项飞书能力正常工作

---

## 第 12 页 · 总结

### 今天你完成了 🎉

- 把飞书插件装进了 OpenClaw
- 创建并发布了飞书应用
- 跑通了飞书聊天入口
- 学会了先聊天、后扩权限的接入节奏

> 🎯 飞书最像真实交付现场。把这页跑通，你后面做 Day 14 的多 Bot、多 Agent 方案会顺很多。
