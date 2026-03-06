# 每个 Agent 绑定一个飞书机器人（macOS）

本文说明如何把 7 个 Agent 绑定到 7 个独立飞书 Bot，并提供一键脚本。

## 1. 目标架构

一一映射关系如下：

- `task-hub` -> 飞书账号 `task-hub`
- `market-research` -> 飞书账号 `market-research`
- `data-analysis` -> 飞书账号 `data-analysis`
- `ad-ops` -> 飞书账号 `ad-ops`
- `logistics-customs` -> 飞书账号 `logistics-customs`
- `finance-manager` -> 飞书账号 `finance-manager`
- `copy-editor` -> 飞书账号 `copy-editor`

路由机制使用 OpenClaw 官方 `bindings`：

- `match.channel = feishu-enhanced`（或 `feishu`）
- `match.accountId = <上面账号ID>`
- `agentId = <目标Agent>`

## 2. 飞书侧准备（7 个机器人）

在飞书开放平台为每个角色准备一个应用，至少拿到：

- `App ID`
- `App Secret`

建议：

- 连接方式使用 `websocket`（不需要公网 webhook）。
- 每个 Bot 用不同名字，便于识别（如 `TaskHub Bot`、`AdOps Bot`）。
- 把对应 Bot 拉入它负责的业务群。

## 3. 一键写入 OpenClaw 配置

在客户机器执行：

```bash
cd customer/openclaw-biz-team
chmod +x scripts/setup-feishu-per-agent.sh
bash scripts/setup-feishu-per-agent.sh --channel feishu-enhanced
```

如果用官方插件（`channels.feishu`），执行：

```bash
bash scripts/setup-feishu-per-agent.sh --channel feishu
```

脚本会自动：

1. 备份 `~/.openclaw/openclaw.json`
2. 写入 `channels.<channel>.accounts`
3. 写入 7 条 `bindings` 映射
4. 生成环境变量模板：
   `~/.openclaw/openclaw-feishu-agent-env.template.sh`

## 3.1 交互式一键脚本（推荐）

如果你希望“运行一次脚本，现场输入 7 组凭据并自动写入 `~/.zshrc`”，用下面这个脚本：

```bash
cd customer/openclaw-biz-team
chmod +x scripts/setup-feishu-per-agent-interactive.sh
bash scripts/setup-feishu-per-agent-interactive.sh --channel feishu-enhanced
```

说明：

- 会先执行基础脚本（写入 accounts + bindings）。
- 然后逐个提示输入 7 组 `APP_ID / APP_SECRET`。
- 生成 `~/.openclaw/openclaw-feishu-agent-env.sh`。
- 默认会把 `source ~/.openclaw/openclaw-feishu-agent-env.sh` 以可重复更新的方式写入 `~/.zshrc`。

如果你不想自动改 `~/.zshrc`，加参数：

```bash
bash scripts/setup-feishu-per-agent-interactive.sh --channel feishu-enhanced --no-persist-zshrc
```

## 4. 填写 7 组凭据并生效

编辑模板文件，把每个变量替换为真实值：

```bash
vim ~/.openclaw/openclaw-feishu-agent-env.template.sh
```

加载变量并重启：

```bash
source ~/.openclaw/openclaw-feishu-agent-env.template.sh
openclaw gateway restart
```

建议持久化（追加到 `~/.zshrc`）：

```bash
cat ~/.openclaw/openclaw-feishu-agent-env.template.sh >> ~/.zshrc
source ~/.zshrc
```

## 5. 验证

```bash
openclaw channels status
openclaw agents list --bindings
```

检查要点：

- 7 个 `accountId` 都存在
- 7 条 `feishu(-enhanced) + accountId -> agentId` 路由都生效
- 发消息到某个 Bot 时，命中对应 Agent

## 6. 脚本文件说明

- `scripts/setup-feishu-per-agent.sh`
  - Shell 入口，负责备份配置并调用 Node 脚本
- `scripts/setup-feishu-per-agent.mjs`
  - 真正的 JSON 改写逻辑（写入 accounts + bindings）

## 7. 常见问题

1. `channels status` 里看不到 `feishu-enhanced`
- 说明插件没加载，先确认 `~/.openclaw/extensions/feishu-enhanced` 已安装并可用。

2. 某个 Bot 收到消息但没进目标 Agent
- 检查该 Bot 对应的 `accountId` 是否和脚本写入一致。
- 检查 `bindings` 是否被其他更高优先级规则覆盖。

3. 改完配置不生效
- 必须执行：`openclaw gateway restart`
- 并用新会话验证：`/new`
