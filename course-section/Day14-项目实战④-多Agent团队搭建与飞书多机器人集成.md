# Day14-项目实战④：多 Agent 团队搭建与飞书多机器人集成

> 模块类型：项目实战（可直接落地客户环境）  
> 建议时长：2.5-3 小时  
> 适用阶段：完成 Day01-Day07 后学习；建议已完成 LabC（飞书基础对接）

---

## 一、这节课要解决什么问题

在真实客户场景里，常见目标不是“一个万能助手”，而是“一个 AI 团队”：

- 一个总控 Agent 负责拆解任务和汇总结果
- 多个专业 Agent 分工执行（市场、数据、广告、财务、文案、物流）
- 每个 Agent 对应独立飞书 Bot，避免消息串线
- 客户只改 API Key/飞书凭据即可上线

本节课会把这套链路完整打通。

---

## 二、学习目标（完成后你将获得）

1. 能独立搭建 7 角色多 Agent 架构（含 workspace 隔离）。
2. 理解 `SOUL.md / USER.md / AGENTS.md` 的职责分层并正确配置。
3. 能将飞书多账号（多 Bot）与多 Agent 做一一绑定。
4. 能用一键脚本完成 `accounts + bindings + 环境变量` 配置。
5. 能说清 `agentId / accountId / sessionKey` 三层关系，知道为什么“同一个 Bot 也可能不在同一个上下文里”。
6. 能定位并修复“配置看起来正确但启动失败/不回消息”的典型问题。
7. 交付一套可复制到客户 Mac 的“开箱可用”方案包，并保留可回退路径。

---

### 讲师提示语（可直接口播）

- **开场认知**：这节是交付课，不是配置复读课，目标是让方案变得可复制、可验收、可恢复。
- **实操前提醒**：先把目录、账户、绑定这三张“表”对齐，再跑脚本，不要边改边猜。
- **卡点转场**：多 Bot 不回消息时，先看 accounts、bindings、env 和 probe 结果，而不是先去怀疑模型。
- **复盘收口**：这节结束时，学员最好能交出一份别人也能照着执行的 Runbook 和验收清单。

---

## 三、最终交付物（验收清单）

完成后你应具备以下产物：

- `customer/openclaw-biz-team/openclaw.json`  
  含客户模型配置 + 7 Agent 列表 + 协作策略
- `customer/openclaw-biz-team/workspaces/*`  
  每个 Agent 均有 `SOUL.md + USER.md + AGENTS.md`
- `customer/openclaw-biz-team/scripts/setup-feishu-per-agent.sh`  
  非交互式批量写入脚本
- `customer/openclaw-biz-team/scripts/setup-feishu-per-agent-interactive.sh`  
  交互式脚本（现场输入 7 组凭据）
- `customer/openclaw-biz-team/FEISHU-PER-AGENT.md`  
  飞书多 Bot 对接操作手册

---

## 四、角色与路由设计

### 4.1 角色设计（推荐）

- `task-hub`：任务分发记忆中枢（默认 Agent）
- `market-research`：市场调研
- `data-analysis`：数据分析
- `ad-ops`：广告运营
- `logistics-customs`：物流报关
- `finance-manager`：财务主管
- `copy-editor`：文案编辑

### 4.2 路由原则

路由采用 OpenClaw 官方 `bindings`：

- 用 `match.channel` 指定渠道（`feishu` 或 `feishu-enhanced`）
- 用 `match.accountId` 指定飞书账号
- 将其映射到目标 `agentId`

示例（概念）：

```json
{
  "agentId": "ad-ops",
  "match": {
    "channel": "feishu",
    "accountId": "ad-ops"
  }
}
```

### 4.3 开场认知：三层关系一定要先讲清

这页不讲清，后面飞书多 Bot 最容易出现“明明绑好了，为什么像串号”。

| 层级 | 你在课程里怎么解释 | 它真正控制什么 |
|------|------|------|
| `agentId` | 哪个角色的大脑 | 读哪个 workspace、用哪套人格、走哪套技能 |
| `accountId` | 哪个飞书 Bot 入口 | 外部消息到底是从哪个机器人进来的 |
| `sessionKey` | 这次对话落在哪个会话桶 | 上下文是否连续、会不会串到别的聊天 |

课堂口径可以直接说：

- **Bot 只是入口，不等于大脑**
- **Agent 才是大脑，不等于某一段具体对话**
- **sessionKey 才决定“这次到底接着聊哪一段”**

当你看到“同一个 Bot 回得像换了个人”时，优先查 `bindings`。
当你看到“还是这个 Agent，但上下文像断了”时，优先查 `sessions`。

---

## 五、实操步骤（Mac 客户机）

## 步骤 0：确认 OpenClaw 已可用

```bash
openclaw --version
openclaw config validate
openclaw agents list --bindings
openclaw gateway health
```

> 如果 `~/.openclaw` 看不到：Finder 按 `Command + Shift + G`，输入 `~/.openclaw`。
> 如果你这台机器走的是官方飞书插件路线，先确认 `@openclaw/feishu` 已安装；如果走客户增强版路线，先确认对应扩展目录已经放好。**不要在 `feishu` 和 `feishu-enhanced` 之间靠猜。**

## 步骤 1：部署客户包

将本项目中的 `customer/openclaw-biz-team` 拷贝到客户电脑的 `~/.openclaw/` 下，确保目录存在：

```bash
~/.openclaw/openclaw-biz-team
```

执行安装脚本：

```bash
cd ~/.openclaw/openclaw-biz-team
bash scripts/install-mac.sh
```

## 步骤 2：检查核心配置

确认 `~/.openclaw/openclaw.json` 至少包含：

1. `models.providers.custom-api-aigocode`
2. `agents.list`（7 个角色）
3. `bindings`（每个 Bot 对应一个 `agentId`）
4. `tools.agentToAgent.enabled = true`
5. 你实际要接入的渠道 id（`feishu` 或 `feishu-enhanced`）与脚本参数一致

快速查看：

```bash
openclaw config validate
openclaw agents list --bindings
```

补一句实操前提醒：

- `workspace` 决定角色读到什么文件
- `bindings` 决定消息进哪个角色
- `~/.openclaw/agents/<agentId>/sessions/` 决定这次对话到底落在哪个会话桶里

## 步骤 3：完成飞书“每个 Agent 一个 Bot”绑定

### 方案 A：非交互（你提前准备好 env 文件）

```bash
bash scripts/setup-feishu-per-agent.sh --channel feishu
```

或增强版插件：

```bash
bash scripts/setup-feishu-per-agent.sh --channel feishu-enhanced
```

### 方案 B：交互式（课堂推荐）

```bash
bash scripts/setup-feishu-per-agent-interactive.sh --channel feishu
```

或增强版：

```bash
bash scripts/setup-feishu-per-agent-interactive.sh --channel feishu-enhanced
```

脚本会做四件事：

1. 备份 `~/.openclaw/openclaw.json`
2. 写入 `channels.<channel>.accounts` 的 7 个账号位点
3. 写入 7 条 `bindings` 映射（`accountId -> agentId`）
4. 生成并加载环境变量文件（可写入 `~/.zshrc`）

## 步骤 4：重启并验证

```bash
openclaw config validate
openclaw gateway restart
openclaw gateway health
openclaw channels status --probe
openclaw agents list --bindings
openclaw sessions --all-agents --active 120
```

验收关键点：

- `agents list --bindings` 不应再是 `Routing rules: 0`
- `gateway health` 能正常返回
- 渠道探针可见账号状态
- 指定 Bot 发消息时，命中对应 Agent
- `sessions --all-agents --active 120` 能看到最近活跃会话落在预期 Agent 下

### 实操前提醒：先跑单 Bot，再跑群聊

- 如果当前飞书账号策略仍是默认安全模式，**第一次单聊** 可能先出现 pairing / 授权动作
- 先让每个 Bot 在单聊里完成一次最小验证，再去群里测路由
- 这样你一旦出问题，就能快速判断：是**账号入口问题**，还是**群聊策略 / 路由问题**

## 步骤 4.5：交付现场的验证顺序

真实交付时不要东一榔头西一棒子，按下面顺序排查最快：

1. **先看配置是否合法**
   `openclaw config validate`
2. **再看角色和路由有没有写进去**
   `openclaw agents list --bindings`
3. **再看 Gateway 是否真的活着**
   `openclaw gateway health`
4. **再看飞书账号状态和权限**
   `openclaw channels status --probe`
5. **再做一个最小单聊验证**
   用一个确定绑定的 Bot 发“你好”，必要时先完成 pairing
6. **最后看会话是不是落进了正确 Agent**
   `openclaw sessions --all-agents --active 120`

这六步能把 80% 的“看起来差不多但就是不回”问题快速定位掉。

---

## 六、课堂故障复盘（高频坑位）

以下问题来自真实交付过程，建议在课上逐一演示。

## 6.1 坑一：误把模板文件当正式凭据文件

现象：

- 执行了 `source ~/.openclaw/openclaw-feishu-agent-env.template.sh`
- 但实际变量还是占位值（例如 `cli_xxx`）

正确做法：

```bash
cp ~/.openclaw/openclaw-feishu-agent-env.template.sh ~/.openclaw/openclaw-feishu-agent-env.sh
# 编辑 openclaw-feishu-agent-env.sh 填入真实值
source ~/.openclaw/openclaw-feishu-agent-env.sh
```

补一句课堂提醒：

- `.template.sh` 是模板，不是正式凭据文件
- 交付给客户时，模板可以发；真实值文件不要直接打包外传

## 6.2 坑二：`gateway restart` 超时，端口未健康

现象：

- `Timed out after 60s waiting for gateway port ...`
- `Gateway service not loaded`

修复：

```bash
openclaw gateway install
openclaw gateway restart
```

必要时前台看日志：

```bash
openclaw gateway
```

## 6.3 坑三：群里不触发回复

现象：

- 日志提示 `groupPolicy is "allowlist" but groupAllowFrom is empty`

含义：

- 不是“启动失败”，而是“群消息被策略静默丢弃”。

快速修复（先跑通）：

```json
"groupPolicy": "open",
"requireMention": true
```

后续再回到 `allowlist` 做安全收敛。

课堂顺口版可以这样讲：

- **先让消息进来，再谈收紧策略**
- **先单聊跑通，再回群里做 mention / allowlist**

## 6.4 坑四：channel 选错（`feishu` vs `feishu-enhanced`）

先看实际安装的是哪个插件：

```bash
openclaw channels list
```

再决定脚本参数：

- 官方插件：`--channel feishu`
- 增强插件：`--channel feishu-enhanced`

课堂建议：

- 先让学员自己说出“我现在到底接的是哪一种”
- 再执行脚本，不要先敲命令后猜原因

## 6.5 坑五：配置文件能打开，但 OpenClaw 判定无效

现象：

- `openclaw agents list` 直接报 `Config invalid`
- 提示有未知字段，例如 `_guard`、`meta.template`、`meta.renderedAt`

含义：

- 这不是飞书问题，也不是多 Agent 问题，而是**配置 schema 不接受这些字段**。

正确处理：

```bash
openclaw config validate
openclaw doctor --fix
```

课堂提示：

- 给客户交付的 `openclaw.json`，尽量只保留 OpenClaw 官方 schema 认可的字段
- 自己项目内部用的模板字段、渲染标记、Guard 辅助字段，不要直接混进客户主配置

---

## 七、安全与运维建议（交付必须讲）

1. 不要把真实 `apiKey`、`gateway.auth.token` 明文写进对外发放文档。
2. 交付前把密钥改为环境变量占位，并现场注入。
3. 客户机器用户名不固定时，`workspace` 优先写 `~/.openclaw/workspace`，避免硬编码绝对路径。
4. 建议对 `customer/*.zip` 做忽略规则，避免误提交交付包压缩产物。
5. 每次改配置后都执行：`openclaw gateway restart` + 新会话验证。

### 7.2 回退顺序（必须会背）

如果课堂演示或客户现场改坏了，不要慌，按这个顺序回退：

1. 恢复最近一次备份的 `openclaw.json`
2. 重新 `openclaw config validate`
3. 执行 `openclaw gateway restart`
4. 执行 `openclaw gateway health`
5. 执行 `openclaw channels status --probe`
6. 用一个确定绑定的 Bot 发一条最小测试消息（必要时先完成 pairing）

这样能保证你不是“把错配置一层层往后传”。

---

## 八、课堂演示脚本（讲师版）

可按以下节奏现场演示：

1. 展示 7 Agent 目录结构与三类引导文件。
2. 运行交互脚本并输入 1-2 个账号示例（其余可脱敏）。
3. 重启网关，展示 `agents list --bindings` 变化。
4. 故意制造一个错误（例如错误 channel 参数），演示定位与修复。
5. 用 `task-hub` 发起任务，演示角色分工与汇总输出。

---

## 九、课后作业

1. 将 `task-hub` 的 `SOUL.md` 改为你自己的组织角色（如“项目 PM 中枢”）。
2. 把 7 角色缩减成 3 角色（总控 + 数据 + 文案），并保持脚本可用。
3. 在飞书群内完成一次“需求拆解 -> 多角色执行 -> 总控汇总”的完整回放，并保存截图。

---

## 十、本节小结

你已经完成了从“单助手”到“多 Agent 团队”的关键跨越：

- 组织结构可配置
- 飞书渠道可路由
- 交付流程可复制
- 故障定位可标准化

这意味着你不再只是在“用一个 AI 工具”，而是在“交付一套可运行的 AI 业务系统”。
