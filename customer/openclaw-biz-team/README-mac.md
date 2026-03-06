# Customer Multi-Agent Package (macOS)

该目录是可直接交付给客户的 OpenClaw 多 Agent 套件，目标是复制后只配置 API Key 即可使用。

## 1. 包含内容

- `openclaw.json`：多 Agent 主配置（7 个角色 + agentToAgent + fallback）
- `workspaces/*/SOUL.md`：每个 Agent 的角色说明和输出规范
- `scripts/install-mac.sh`：macOS 一键安装脚本（自动备份原配置）

## 2. 角色清单

- `task-hub`：任务分发记忆中枢（默认 Agent）
- `market-research`：市场调研
- `data-analysis`：数据分析
- `ad-ops`：广告运营
- `logistics-customs`：物流报关
- `finance-manager`：财务主管
- `copy-editor`：文案编辑

## 2.1 `SOUL.md` / `USER.md` / `AGENTS.md` 的区别（建议都配置）

- `SOUL.md`：定义“这个 Agent 是谁”，即人格、边界、语气和角色职责。
- `USER.md`：定义“这个 Agent 服务的是谁”，即客户画像、业务背景、沟通偏好。
- `AGENTS.md`：定义“这个 Agent 怎么工作”，即工作协议、输出标准、协作规则。

OpenClaw 会把这些文件作为 bootstrap 上下文注入。若缺少 `USER.md`，会丢失用户画像层信息；若缺少 `AGENTS.md`，会丢失流程和规则层信息。为稳定交付，建议三者都保留并持续维护。

## 3. macOS 安装步骤

### 步骤 A：拷贝目录到客户电脑

建议最终目录结构为：

```bash
~/.openclaw/customer-biz-team/
```

如果你是从本项目直接执行，也可以进入当前目录直接安装：

```bash
cd customer/openclaw-biz-team
bash scripts/install-mac.sh
```

### 步骤 B：配置 API Key（临时生效）

```bash
export OPENAI_API_KEY="sk-xxx"
export DASHSCOPE_API_KEY="sk-xxx"
```

### 步骤 C：配置 API Key（持久化）

```bash
echo 'export OPENAI_API_KEY="sk-xxx"' >> ~/.zshrc
echo 'export DASHSCOPE_API_KEY="sk-xxx"' >> ~/.zshrc
source ~/.zshrc
```

### 步骤 D：重启网关并验证

```bash
openclaw gateway restart
openclaw models status --probe --json
openclaw agents list --bindings
```

> 如果 `openclaw agents list --bindings` 在客户版本不存在，可以用聊天内 `/agents` 查看 Agent 清单。

## 4. 首次使用建议（默认总控模式）

新会话输入 `/new` 后，直接对默认 Agent 提需求，例如：

```text
你是任务分发记忆中枢。请把“新品出海上线”拆成市场调研、广告投放、物流报关、财务预算、文案产出五个并行任务，并分别调用对应角色执行，最后输出统一执行计划。
```

## 5. 可选：按渠道绑定特定 Agent（进阶）

当前配置不强制 `bindings`，默认所有请求由 `task-hub` 统一调度。
如需按渠道/账号绑定，请在 `~/.openclaw/openclaw.json` 增加 `bindings`，示例：

```json
"bindings": [
  { "agentId": "task-hub", "match": { "channel": "slack", "accountId": "*" } },
  { "agentId": "market-research", "match": { "channel": "discord", "accountId": "market-bot" } }
]
```

## 6. 故障排查

- 改完配置无效：执行 `openclaw gateway restart`，并开启新会话 `/new`
- 只显示单模型：检查 `agents.defaults.model.fallbacks` 是否存在
- 报 `Connection error`：检查主模型 `baseUrl` 和网络连通性，确认 fallback 模型可用
- 某角色无响应：检查 `tools.agentToAgent.enabled` 与 `allow` 列表是否包含该 Agent ID
