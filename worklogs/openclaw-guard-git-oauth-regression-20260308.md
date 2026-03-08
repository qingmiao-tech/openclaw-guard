# openclaw-guard Git OAuth 回归记录（2026-03-08）

## 1. 目标

本轮的目标不是只把 OAuth 按钮放进页面，而是把它整理成一条可回归、可解释、可排障的链路。

覆盖范围分两层：

1. `本地自动化回归`
   - 验证 Guard 是否能正常启动本地 callback server
   - 验证是否能生成正确的 GitHub / Gitee authorize URL
   - 验证 callback 的 `code/state` 校验失败时，状态是否能正确落盘到 `oauth.phase=error`
2. `真实第三方实测`
   - 用真实 GitHub / Gitee OAuth 应用完成浏览器授权
   - 回到 Guard 后确认 token、用户名、private-check、sync 链路可用

## 2. 本轮已完成的回归

### 2.1 自动化回归已补上

本轮新增了 `git-sync` 的本地 OAuth 回归测试，覆盖：

- `github` provider 能生成 `github.com/login/oauth/authorize`
- `gitee` provider 能生成 `gitee.com/oauth/authorize`
- `startOAuthLogin()` 能正常启动本地 callback server
- callback 收到错误 `state` 时会返回 `400`
- Guard 会把 OAuth 状态更新为：
  - `phase = error`
  - `error = callback-state-mismatch`

对应测试文件：

- `openclaw-guard/src/__tests__/git-sync.test.ts`

### 2.2 当前机器上的真实命令观察

本轮在本机执行了以下真实命令用于交叉验证：

```bash
cmd /c openclaw status --json
cmd /c openclaw cron list --json
cmd /c openclaw gateway status --json
```

结论：

- 当前 Guard 对“CLI 输出夹杂插件日志”的情况已经有兼容能力。
- 当前机器的 gateway 有 `EPERM` 相关异常，因此 OAuth 的真实第三方授权不适合在这台环境里直接当成稳定基线。
- 这也是为什么需要先把本地 callback 与状态迁移的自动化回归补起来。

## 3. 真实 GitHub / Gitee OAuth 实测状态

### GitHub OAuth

- 当前状态：`未在本仓库会话中完成真实授权`
- 阻断原因：当前会话没有可直接使用的 GitHub OAuth `client_id / client_secret`，也不适合在日志中写入真实凭据

### Gitee OAuth

- 当前状态：`未在本仓库会话中完成真实授权`
- 阻断原因：同上，缺少可安全使用的 Gitee OAuth 应用凭据

这部分我没有伪造成“已验证”。当前能如实确认的是：

- Guard 的本地 callback 机制和错误状态落盘链路已做自动化回归
- 真正的第三方授权仍需要在有正式 OAuth 应用凭据的环境里补一次人工端到端验证

## 4. 建议的人工端到端实测步骤

### 4.1 GitHub

```bash
openclaw-guard git-sync auth login \
  --provider github \
  --client-id <your_github_client_id> \
  --client-secret <your_github_client_secret>
```

预期：

1. Guard 输出浏览器授权链接
2. 浏览器完成授权后自动回调本地 `127.0.0.1` callback server
3. `openclaw-guard git-sync status --json` 中可见：
   - `authMode = oauth`
   - `oauth.phase = success`
4. 如果已绑定远程仓库，再执行：

```bash
openclaw-guard git-sync check
openclaw-guard git-sync sync -m "测试 OAuth 同步链路"
```

### 4.2 Gitee

```bash
openclaw-guard git-sync auth login \
  --provider gitee \
  --client-id <your_gitee_client_id> \
  --client-secret <your_gitee_client_secret>
```

预期与 GitHub 相同，只是 authorize URL、token 交换和用户信息接口换成 Gitee。

## 5. 通过标准

只有以下条件都满足，才算 Git OAuth 真实链路完成验收：

1. GitHub OAuth 能成功进入 `success`
2. Gitee OAuth 能成功进入 `success`
3. 两者都能完成 `check-private`
4. 至少一种 provider 能完成真实 `commit + push`
5. Web 工作台里的 OAuth 状态展示与 CLI 输出一致

## 6. 当前结论

当前可以下结论的是：

- `Git OAuth 的本地回调、状态迁移、失败回写` 已经进入可回归状态
- `GitHub / Gitee 的真实第三方授权` 仍需在有正式凭据的环境里补一次人工端到端验证

这比“按钮点了但没人知道到底测没测过”要稳得多，也为下一步正式关闭 `mission` 兼容层提供了更可靠的基础。
