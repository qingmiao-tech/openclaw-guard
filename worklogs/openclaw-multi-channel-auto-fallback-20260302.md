# OpenClaw 多渠道自动切换实施说明（2026-03-02）

## 1. 目标

让 OpenClaw 在主渠道不可用、额度耗尽、认证失效或超时时，自动切到备用渠道，避免服务中断。

## 2. 当前机器基线（实测）

- 配置文件：`C:\Users\Administrator\.openclaw\openclaw.json`
- 当前主模型：`openai-codex/gpt-5.3-codex`
- 已配置渠道：
  - `custom-localhost-8000` -> `claude-opus-4-6`（text）
  - `wenwen` -> `claude-opus-4-6`（text）
  - `custom-127-0-0-1-11434` -> `qwen3:8b`（text）
- 图像模型能力：当前 3 个渠道都只有 `input: ["text"]`，暂不具备图像 fallback 条件。

## 3. 本次已落地变更

已将 `agents.defaults.model.fallbacks` 配置为：

```json
[
  "custom-localhost-8000/claude-opus-4-6",
  "wenwen/claude-opus-4-6",
  "custom-127-0-0-1-11434/qwen3:8b"
]
```

说明：

1. 主模型仍为 `openai-codex/gpt-5.3-codex`（不改主路由）。
2. 第一备用与第二备用均为 Opus 通道，优先保证能力一致性。
3. 第三备用使用本地 `qwen3:8b` 作为兜底保活通道。

## 4. 已执行命令与校验

执行命令（已在本机完成）：

```bash
openclaw models fallbacks clear
openclaw models fallbacks add custom-localhost-8000/claude-opus-4-6
openclaw models fallbacks add wenwen/claude-opus-4-6
openclaw models fallbacks add custom-127-0-0-1-11434/qwen3:8b
openclaw models fallbacks list --plain
openclaw models status --plain
```

校验结果：

1. `fallbacks list --plain` 已返回三段完整 fallback 链。
2. `status --plain` 显示主模型仍为 `openai-codex/gpt-5.3-codex`。

## 5. 重要细节（同 ID 模型多渠道）

`custom-localhost-8000/claude-opus-4-6` 与 `wenwen/claude-opus-4-6` 的模型 ID 相同。  
在 CLI 连续 `fallbacks add` 过程中，出现过首条被覆盖的现象。为确保顺序稳定，本次最终通过直接写入 `openclaw.json` 固化回退链顺序。

## 6. 回滚点

本次手动落地前已备份：

- `C:\Users\Administrator\.openclaw\openclaw.json.manualbak-202603021656`

快速回滚（如需要）：

```powershell
Copy-Item "C:\Users\Administrator\.openclaw\openclaw.json.manualbak-202603021656" "C:\Users\Administrator\.openclaw\openclaw.json" -Force
```

## 7. 下一步建议（建议执行）

1. 增加定时巡检（谨慎使用，会产生真实请求）：

```bash
openclaw models status --probe --json
```

2. 若要覆盖“图像请求自动切换”，需至少新增 1 个 `input` 包含 `"image"` 的模型，并配置：

```json
{
  "agents": {
    "defaults": {
      "imageModel": {
        "primary": "provider/image-model",
        "fallbacks": ["provider2/image-model-backup"]
      }
    }
  }
}
```

3. 处理当前配置告警：存在 `feishu` 插件重复注册警告，建议在插件配置中去重，避免后续行为不确定。
