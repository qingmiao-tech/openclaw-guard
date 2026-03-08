# openclaw-guard mission 兼容层下线评估清单（2026-03-08）

## 1. 结论先行

截至 2026-03-08，`openclaw-guard` 的原生工作台已经覆盖大多数 tenacitOS/mission 时代的高频查看与运维动作，包括：

- 根路由 `/` 已切到新工作台。
- `概览 / Agent / 会话 / 活动 / 文件 / 记忆 / 搜索 / 成本 / Cron / Git 同步 / AI / 渠道 / 审计 / 加固` 已有原生入口。
- Web 侧已经补齐通知筛选、批量已读/清理、Git OAuth 状态展示、文件编辑、Cron 操作按钮等第二期交互。
- CLI 侧已经有 `dashboard / agents / sessions / activity / files / memory / search / costs / cron-ui / git-sync` 等原生命令。

但当前仍然**不建议立刻移除 `mission` 兼容层**。

原因不是新工作台不够用，而是 `mission` 还承担两类职责：

1. 旧用户习惯路径：已有用户可能仍通过 `mission status/start/restart/logs` 这组命令工作。
2. 迁移保险丝：兼容页 `/compat`、`/legacy` 和 `mission-control.ts` 仍然是保守回滚路径，适合在跨平台验证完全收口前继续保留。

## 2. 当前能力覆盖情况

### 已被新工作台覆盖的能力

- 系统概览与 Gateway 状态查看
- Agent 清单与 workspace 定位
- 会话列表、最近活动、运行态概览
- workspace 文件浏览、只读预览与受控编辑
- 记忆文件浏览：`MEMORY.md`、`SOUL.md`、`USER.md`、`AGENTS.md`
- 全局搜索
- 成本统计
- Cron 列表、状态、启停、手动触发、删除
- Git 同步中心：初始化、连接远程、Token 认证、OAuth 发起、private 校验、commit/push/sync
- 通知中心与操作反馈

### 仍由 mission 兼容层承接的能力/价值

- 旧版兼容页的完整入口与历史交互路径
- `mission` CLI 子命令的既有用户习惯
- Mission Control 安装、同步、bootstrap、健康探测的兼容调用链
- 出现工作台回归时的快速回退路径

## 3. 本轮真实样本对照结果

本轮已再次用本机真实 OpenClaw 输出对照过字段，不是只按猜测实现：

### `cmd /c openclaw status --json`

已确认解析器兼容以下真实字段：

- `heartbeat.defaultAgentId`
- `heartbeat.agents[]`
- `channelSummary[]`
- `sessions.defaults`
- `sessions.recent[]`
- `sessions.byAgent[]`
- `gateway.error`
- `agents.defaultId`
- `agents.agents[]`
- `securityAudit.summary`

同时验证了一个关键现实场景：JSON 前后可能混入插件日志，因此 `extractJsonPayload()` 必须支持从噪声输出中抽取 JSON 主体，这一点已在本轮实现中保留。

### `cmd /c openclaw cron list --json`

本机当前返回的是网关连接失败，而不是干净 JSON：

- `gateway connect failed: Error: EPERM: operation not permitted...`
- `gateway closed (1008): connect failed`

这说明 Cron 解析不能简单把失败态当“空任务列表”。当前 Guard 已按“失败保留 warning/status”的方向处理，避免 Web 侧误判为“没有 Cron”。

### `cmd /c openclaw gateway status --json`

已确认真实环境里还会出现：

- `service.runtime.detail = Error: spawn EPERM`
- `port.status = busy`
- `rpc.ok = false`
- 错误文本尾部继续混入额外日志

这进一步说明保留兼容层是合理的，尤其是在不同机器权限、服务启动方式、插件注入都不完全一致的情况下。

## 4. 下线前必须满足的检查项

只有下面这些条件全部满足，才建议开始正式下线 `mission`：

1. 新工作台在 Windows / macOS / Linux 三端完成手工回归。
2. `Git OAuth` 至少完成一次 GitHub 和一次 Gitee 的端到端验证。
3. Web 里的文件编辑、Cron 操作、通知中心完成实际使用验证，而不只是单测通过。
4. 当前所有课程文档、README、运维说明不再把 `mission` 当默认入口。
5. `/compat` 页面只保留“迁移说明”，不再承载核心日常操作。
6. CLI 中已有原生命令能覆盖绝大多数 `mission` 高频操作。
7. 至少保留一个版本周期的“弃用提示”，给老用户迁移窗口。

## 5. 建议的分阶段下线顺序

### 阶段 A：声明弃用，但不移除

目标：先让用户知道“默认入口已经变了”。

建议动作：

- 在 `/compat` 页面顶部加入更明显的弃用提示。
- 在 `mission` CLI 帮助和执行结果里增加 deprecation 提示。
- 在 README 中把新工作台与原生命令放到前面，`mission` 降到兼容章节。

### 阶段 B：冻结 mission 新增功能

目标：停止继续给 `mission` 加功能，只修兼容性问题。

建议动作：

- 新能力只进入原生工作台和原生 CLI。
- `mission-control.ts` 仅做兼容维护，不再扩展新交互。

### 阶段 C：默认隐藏兼容入口

目标：让新用户几乎不会再走到 `mission`。

建议动作：

- 首页和导航不再直接暴露 `mission`。
- `/compat` 改成单页迁移说明，提供“我知道风险，继续打开旧版”的次级入口。
- CLI 继续保留 `mission`，但输出明确提示“将在后续版本移除”。

### 阶段 D：移除代码

目标：在确认没有强依赖后真正删除兼容层。

建议动作：

- 删除 `mission` CLI 分组。
- 删除 `/api/mission/*` 路由。
- 删除 `mission-control.ts` 与旧版兼容页中的 mission 交互代码。
- 删除文档中的兼容层说明。

## 6. 回滚方案

如果下线后发现某个平台或某批老用户仍依赖 `mission`，建议按下面顺序快速回滚：

1. 先恢复 `/compat` 到可访问状态。
2. 再恢复 `mission` CLI 分组与 `/api/mission/*` 路由。
3. 最后恢复 `mission-control.ts` 的安装/启停链路。

为了保证回滚成本可控，下线前不要把 `mission` 代码拆散；应先保持模块边界清晰，再做最终删除。

## 7. 当前建议

当前最稳妥的策略是：

- **短期**：保留 `mission` 作为兼容层。
- **中期**：继续把通知、Git OAuth、文件编辑、Cron 操作做完跨平台实战验证。
- **后期**：等文档、CLI、Web 和三端验证都收口后，再启动正式下线。

一句话结论：

> `mission` 已经不再是主路径，但现在仍然是有价值的保险丝；可以降级，暂时不该硬删。
