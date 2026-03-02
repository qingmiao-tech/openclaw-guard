# OpenClaw 连接类错误触发 Failover 补丁说明（2026-03-02）

## 1. 背景
在多模型自动切换链路中，现场出现了如下现象：

- 首个候选模型返回 `Connection error.`
- 同一会话持续报错，但没有切换到下一个 fallback 模型

根因是：`Connection error.` 等连接类报错未被当前 failover 分类器识别为可回退错误，导致没有触发轮转。

## 2. 补丁目标
将连接/网络类异常统一归类为 `timeout`（可重试/可回退），确保以下场景触发自动切换：

- 连接失败
- DNS 暂时性失败
- 上游 fetch 失败
- 常见 socket 断连

## 3. 变更范围

### 3.1 主判定扩展
文件：`openclaw/src/agents/pi-embedded-helpers/errors.ts`

- 在 `ERROR_PATTERNS.timeout` 中新增：
  - 文本关键词：
    - `connection error`
    - `network error`
    - `network request failed`
    - `fetch failed`
    - `socket hang up`
  - 正则模式：
    - `\beconn(?:refused|reset|aborted)\b`
    - `\benotfound\b`
    - `\beai_again\b`

### 3.2 FailoverError 辅助判定补强
文件：`openclaw/src/agents/failover-error.ts`

- 扩展 `TIMEOUT_HINT_RE`，纳入同一批连接类关键词，确保非 assistant 直接抛错路径也能识别并回退。

### 3.3 单测补充
文件：

- `openclaw/src/agents/pi-embedded-helpers.isbillingerrormessage.test.ts`
- `openclaw/src/agents/failover-error.test.ts`

新增覆盖样例：

- `Connection error.`
- `fetch failed`
- `network error: ECONNREFUSED`
- `ENOTFOUND`
- `EAI_AGAIN`

## 4. 兼容性与风险评估

- 兼容性：高。仅扩展“可回退错误”识别范围，不改模型选择主流程。
- 行为变化：部分此前不会切换的连接类错误，现在会触发 fallback。
- 风险：低到中。若某些业务把“网络错误文本”用于非模型请求，可能被更积极地归类为 timeout；当前代码路径已在模型请求上下文内使用，风险可控。

## 5. 验证建议

1. 人工注入故障：让首个模型 endpoint 不可达（例如关闭本地代理端口）。
2. 触发一次新会话请求（建议先 `/new`）。
3. 观察日志应出现：
   - 首个候选连接错误
   - 自动尝试下一个 fallback 候选
4. 使用命令复核模型链和健康状态：

```bash
openclaw models status --probe --json
```

## 6. 本地测试执行结果

已尝试运行定向单测：

```bash
pnpm vitest run src/agents/pi-embedded-helpers.isbillingerrormessage.test.ts src/agents/failover-error.test.ts
pnpm dlx vitest run src/agents/pi-embedded-helpers.isbillingerrormessage.test.ts src/agents/failover-error.test.ts
```

当前环境未完成项目依赖安装（`vitest` 在工程上下文不可用），因此未得到可执行测试结论。补丁与测试文件已完成落地，建议在具备完整依赖的 CI/开发机上复测。

## 7. 发布与生效说明

重要：你当前运行的是全局安装 OpenClaw（`E:\ProgramFiles\nvm\node_global\node_modules\openclaw`）。

本次补丁已写入仓库源码（`e:\openclaw-course\openclaw\src`），要在现网生效需满足其一：

1. 基于该源码构建并发布/替换运行包。
2. 升级到包含该补丁的上游版本。

在未发布前，运行中的全局包仍可能保持旧行为。可先通过调整 fallback 顺序绕开故障通道作为临时方案。
