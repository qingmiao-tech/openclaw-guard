# 如何在 OpenClaw 中配置多个模型并自动切换（V2 实战版）

> 版本：V2（2026-03-02）  
> 目标读者：第一次配置 OpenClaw 多渠道的小白用户

## 0. 先说结论

只配置多个 `providers`，**不会自动切换**。  
必须同时配置：

1. `agents.defaults.model.primary`
2. `agents.defaults.model.fallbacks`（数组，按顺序）

如果 `primary` 失败，OpenClaw 才会按 `fallbacks` 顺序尝试下一个模型。

## 1. 你要改哪个配置文件

OpenClaw 主配置文件：

- Windows: `%USERPROFILE%\\.openclaw\\openclaw.json`
- macOS/Linux: `~/.openclaw/openclaw.json`

示例（Windows 绝对路径）：

```text
C:\Users\你的用户名\.openclaw\openclaw.json
```

如果你通过 `openclaw-guard` 做配置，也是在写这份配置（或你通过环境变量 `OPENCLAW_CONFIG_PATH` 指定的配置文件）。

## 2. 一份可直接对标的最小可用配置

下面这段是重点，直接对标你提到的模型 ID：

- `openai-codex/gpt-5.3-codex`（主模型）
- `qwen/qwen3.5-plus`（第 1 备用）
- `wenwen/claude-opus-4-6`（第 2 备用）

```json
{
  "models": {
    "providers": {
      "openai-codex": {
        "baseUrl": "https://api.openai.com/v1",
        "apiKey": "${OPENAI_API_KEY}",
        "apiType": "openai-completions",
        "models": [
          {
            "id": "gpt-5.3-codex",
            "name": "GPT-5.3 Codex",
            "api": "openai-completions",
            "input": ["text"]
          }
        ]
      },
      "qwen": {
        "baseUrl": "https://dashscope.aliyuncs.com/compatible-mode/v1",
        "apiKey": "${QWEN_API_KEY}",
        "apiType": "openai-completions",
        "models": [
          {
            "id": "qwen3.5-plus",
            "name": "Qwen 3.5 Plus",
            "api": "openai-completions",
            "input": ["text"]
          }
        ]
      },
      "wenwen": {
        "baseUrl": "https://your-wenwen-endpoint.example/v1",
        "apiKey": "${WENWEN_API_KEY}",
        "apiType": "openai-completions",
        "models": [
          {
            "id": "claude-opus-4-6",
            "name": "Claude Opus 4.6",
            "api": "openai-completions",
            "input": ["text"]
          }
        ]
      }
    }
  },
  "agents": {
    "defaults": {
      "model": {
        "primary": "openai-codex/gpt-5.3-codex",
        "fallbacks": [
          "qwen/qwen3.5-plus",
          "wenwen/claude-opus-4-6"
        ]
      },
      "models": {
        "openai-codex/gpt-5.3-codex": {},
        "qwen/qwen3.5-plus": {},
        "wenwen/claude-opus-4-6": {}
      }
    }
  }
}
```

## 3. 手把手验证“自动切换”是否真的生效

### 3.1 先备份

```bash
# Windows PowerShell
Copy-Item "$env:USERPROFILE\.openclaw\openclaw.json" "$env:USERPROFILE\.openclaw\openclaw.json.bak"
```

### 3.2 故障注入（最明确方式）

把 `primary` 临时改成一个**不存在的 provider/model**，例如：

```json
"primary": "disabled-test/gpt-5.3-codex"
```

同时保留有效 `fallbacks`：

```json
"fallbacks": [
  "qwen/qwen3.5-plus",
  "wenwen/claude-opus-4-6"
]
```

注意：`models.providers` 里不要配置 `disabled-test`，这样它必然失败，才能触发 failover。

### 3.3 重启网关 + 新会话

```bash
openclaw gateway restart
```

然后在客户端开一个全新会话（建议 `/new`），再发一条测试请求。

### 3.4 你应该看到什么

正确行为：

1. primary 失败
2. 自动尝试 `qwen/qwen3.5-plus`
3. 如果第一个 fallback 也失败，再尝试 `wenwen/claude-opus-4-6`

## 4. 为什么你明明改了，还显示是 `openai-codex/gpt-5.3-codex`？

这是最常见的 6 个原因：

1. 你改了文件，但没重启 `gateway`。
2. 你在旧会话里测，旧上下文还绑定了旧模型。
3. 其他地方覆盖了模型（agent 私有配置或运行参数）。
4. `fallbacks` 里的 ID 写错了，必须是 `provider/model` 全名。
5. 你的第一个 fallback 本身也不可用，看起来像“没切换”，实际是“切了但也失败”。
6. 错误类型没有命中当前版本的 failover 触发条件（例如某些连接类错误）。

## 5. `Connection error` 场景怎么判断

你提过 `custom-localhost-8000/claude-opus-4-6` 返回 `Connection error`。这个场景常见于：

- 本地代理服务未启动
- 端口错误（比如服务不在 8000）
- 反向代理证书/超时设置问题

如果该错误类型未被当前版本识别为可 failover 错误，就会出现“失败但不切换”。

建议：

1. 先让该 provider 直接可连通（`curl` / health check）。
2. 再测故障注入，确认 failover 机制本身没问题。
3. 若确认是错误分类问题，应用你们已做的“连接类错误触发 failover”补丁版本。

## 6. 已集成到 openclaw-guard 的 fallbacks 配置方式

你现在可以在 `openclaw-guard` 里直接配置 fallbacks。

### 6.1 Web UI

进入 Guard 的 AI 页面：

- 新增了 `Fallback Models` 输入框
- 支持逗号分隔输入
- 支持 `Save Fallbacks` / `Clear`
- 模型标签会标注 `Fallback`

### 6.2 API

设置 fallbacks：

```http
POST /api/ai/fallbacks
Content-Type: application/json

{
  "modelIds": [
    "qwen/qwen3.5-plus",
    "wenwen/claude-opus-4-6"
  ]
}
```

PowerShell 示例：

```powershell
Invoke-RestMethod -Method Post `
  -Uri "http://localhost:8088/api/ai/fallbacks" `
  -ContentType "application/json" `
  -Body '{"modelIds":["qwen/qwen3.5-plus","wenwen/claude-opus-4-6"]}'
```

读取当前配置：

```http
GET /api/ai/config
```

关注返回字段：

- `primaryModel`
- `fallbackModels`

## 7. 回滚步骤

验证完毕后，把 `primary` 改回真实可用模型，例如：

```json
"primary": "openai-codex/gpt-5.3-codex"
```

然后再次执行：

```bash
openclaw gateway restart
```

## 8. 给小白的推荐顺序

1. 先只配 2 个模型：1 主 + 1 备。
2. 做一次“故障注入”确认自动切换确实生效。
3. 再扩展成 1 主 + 2 备，按稳定性排序。
4. 把失败日志和切换结果沉淀到课程文档。

---

如果你希望，我下一版可以补一份“可直接复制的多家 provider 模板库”（OpenAI / Qwen / Claude 代理 / 本地 Ollama 四套），你只替换 `baseUrl` 和 `apiKey` 即可。
