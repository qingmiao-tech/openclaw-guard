# nk-self 脚本说明

## 文件

- `init-nk-self.ps1`：Windows PowerShell 一键初始化脚本
- `init-nk-self.mjs`：JSON 渲染与合并逻辑

## 推荐用法

### 1) 只生成个人正式版配置 + 复制工作区（安全模式）

```powershell
powershell -ExecutionPolicy Bypass -File .\nk-self\scripts\init-nk-self.ps1
```

默认会：

- 复制 `nk-self/workspaces/*` 到 `~/.openclaw/nk-self/workspaces`
- 生成 `~/.openclaw/nk-self/openclaw.personal.final.json`
- 不改动你当前主配置 `~/.openclaw/openclaw.json`

### 2) 直接合并到当前主配置（会先备份）

```powershell
powershell -ExecutionPolicy Bypass -File .\nk-self\scripts\init-nk-self.ps1 -ApplyToMainConfig
```

默认会：

- 备份 `~/.openclaw/openclaw.json`
- 把 7 个个人 Agent 合并到主配置中
- 保留当前主配置里的其他 Agent / 渠道 / gateway / models 等内容

### 3) 显式指定模型

```powershell
powershell -ExecutionPolicy Bypass -File .\nk-self\scripts\init-nk-self.ps1 -Model "your-provider/your-model"
```

如果不指定：

- 脚本会优先尝试复用当前 `openclaw.json` 里的 `agents.defaults.model.primary`
- 如果仍然没有，就保留 `REPLACE_WITH_PRIMARY_MODEL`

## 输出文件

- 仓库内正式版参考：`nk-self/openclaw.personal.final.json`
- 本地渲染结果默认：`~/.openclaw/nk-self/openclaw.personal.final.json`
