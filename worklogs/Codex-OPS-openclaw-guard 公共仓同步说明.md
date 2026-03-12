# OpenClaw Guard 公共仓同步说明

日期: 2026-03-12  
作者: Codex

## 目标

让 `openclaw-course` 继续作为主开发仓库，`openclaw-guard` 保持大仓里的普通子目录；在需要对外发布或同步到 public repo 时，再把 `openclaw-guard/` 这一段历史拆出去推送到独立仓库：

- public repo: [qingmiao-tech/openclaw-guard](https://github.com/qingmiao-tech/openclaw-guard)
- 本地子目录: `openclaw-guard/`
- 同步方式: `git subtree split / pull / push`

这样做的好处是：

- 日常开发和课程内容仍然只需要提交到 `openclaw-course`
- `openclaw-guard` 不需要变成嵌套 `.git` 仓库，不会影响大仓提交
- 需要发布公共版本时，可以把 `openclaw-guard/` 单独推送到 GitHub
- 如果 public repo 上有独立提交，也可以再拉回大仓

## 当前落地

已新增脚本：

- [sync-openclaw-guard-public.ps1](/E:/openclaw-course/worklogs/scripts/sync-openclaw-guard-public.ps1)
- [sync-openclaw-guard-public.sh](/E:/openclaw-course/worklogs/scripts/sync-openclaw-guard-public.sh)

两个脚本都支持三种动作：

- `Preview`: 预演本次 split 的提交哈希，并显示下一条 push / pull 命令
- `Push`: 把 `openclaw-guard/` 的已提交历史推送到 public repo
- `Pull`: 把 public repo 的提交拉回 `openclaw-course` 当前分支

## 推荐工作流

### 1. 在大仓里正常开发

照常在 `openclaw-course` 里改代码：

- `openclaw-guard/*`
- 课程文档
- 其他子项目

然后正常提交到大仓：

```powershell
git add .
git commit -m "feat: update openclaw-guard"
git push origin main
```

### 2. 预演 public repo 同步结果

先看本次 `openclaw-guard/` 会拆出哪个 split commit：

```powershell
pwsh ./worklogs/scripts/sync-openclaw-guard-public.ps1 -Action Preview
```

或：

```bash
bash ./worklogs/scripts/sync-openclaw-guard-public.sh --action preview
```

### 3. 推送到 public repo

确认 `openclaw-guard/` 下没有未提交改动后执行：

```powershell
pwsh ./worklogs/scripts/sync-openclaw-guard-public.ps1 -Action Push
```

或：

```bash
bash ./worklogs/scripts/sync-openclaw-guard-public.sh --action push
```

默认目标是：

- remote URL: `https://github.com/qingmiao-tech/openclaw-guard.git`
- branch: `main`

## 从 public repo 拉回大仓

如果 public repo 上有直接提交，需要把它们回灌到 `openclaw-course`：

```powershell
pwsh ./worklogs/scripts/sync-openclaw-guard-public.ps1 -Action Pull
```

或：

```bash
bash ./worklogs/scripts/sync-openclaw-guard-public.sh --action pull
```

这一步会在当前大仓分支上生成一次 subtree merge 提交。

## 关键规则

### 1. 只同步已提交内容

脚本基于 `git subtree split`，只会处理已经进入 Git 历史的 `openclaw-guard/` 内容。

含义是：

- `Preview` 可以在有未提交改动时执行，但只预览“已提交状态”
- `Push` / `Pull` 默认要求 `openclaw-guard/` 子目录是干净的
- 如果 `openclaw-guard/` 还有未提交改动，脚本会直接阻止同步

### 2. 不要直接在大仓执行 `git push github main`

当前根仓已经存在一个指向 public repo 的 remote，但 public repo 只接受 `openclaw-guard/` 的拆分历史，不接受整个 `openclaw-course` 历史。

因此不要直接这样做：

```powershell
git push github main
```

正确做法是：

- 用脚本执行 `Push`
- 或手动执行 `git subtree push --prefix=openclaw-guard ...`

### 3. public repo 如有独立改动，要及时回灌

如果 public repo 上直接修了 README、workflow、脚本或源码，而没有及时 `Pull` 回大仓，就会出现双边漂移。

推荐规则：

- 公开仓只做少量 release / README / workflow 修正时，也尽快回灌
- 主要开发仍以 `openclaw-course` 为主
- 只保留一个“主开发事实来源”，避免双边长期并行开发

## 常用参数

PowerShell:

```powershell
pwsh ./worklogs/scripts/sync-openclaw-guard-public.ps1 `
  -Action Preview `
  -Branch main `
  -RemoteUrl https://github.com/qingmiao-tech/openclaw-guard.git
```

如果你更想使用已配置 remote 名称，而不是 URL：

```powershell
pwsh ./worklogs/scripts/sync-openclaw-guard-public.ps1 `
  -Action Push `
  -Remote github `
  -Branch main
```

Bash:

```bash
bash ./worklogs/scripts/sync-openclaw-guard-public.sh \
  --action preview \
  --branch main \
  --remote-url https://github.com/qingmiao-tech/openclaw-guard.git
```

可选参数：

- `-Prefix` / `--prefix`: 默认为 `openclaw-guard`
- `-SourceRef` / `--source-ref`: 默认为 `HEAD`
- `-Remote` / `--remote`: 使用本地 remote 名称
- `-RemoteUrl` / `--remote-url`: 直接使用仓库 URL
- `-Squash` / `--squash`: 在 `Pull` 时使用 squash merge
- `-AllowDirtyPrefix` / `--allow-dirty-prefix`: 允许在前缀不干净时继续，不推荐常用

## 建议节奏

推荐按下面的顺序做：

1. 在 `openclaw-course` 里开发并提交 `openclaw-guard`
2. 跑 `Preview` 确认 subtree split 哈希
3. 跑 `Push` 同步到 `qingmiao-tech/openclaw-guard`
4. 在 public repo 做 release 或 tag
5. 如果 public repo 上产生了额外提交，再执行 `Pull` 回灌大仓

## 当前结论

`openclaw-guard` 不需要拆成嵌套子仓，也能同时满足两件事：

- 持续作为 `openclaw-course` 的一部分正常提交
- 独立同步到 `https://github.com/qingmiao-tech/openclaw-guard.git`

后续如果要进一步自动化，可以在下一步增加：

- `subtree push` 的 tag / release 辅助脚本
- public repo 发布后的版本回写检查
- CI 中的 subtree preview 校验
