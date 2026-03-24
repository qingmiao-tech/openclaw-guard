# 版本与发布

这一页只回答普通用户最关心的几件事：当前公开版本是多少、该怎么安装、该怎么更新，以及什么时候适合固定到某一个版本。

## 当前版本信息

- 当前 GitHub Release: [`v0.10.0`](https://github.com/qingmiao-tech/openclaw-guard/releases/tag/v0.10.0)
- npm 包名: [`@qingmiao-tech/openclaw-guard`](https://www.npmjs.com/package/@qingmiao-tech/openclaw-guard)
- 当前文档站: <https://qingmiao-tech.github.io/openclaw-guard/>

## v0.10.0 这次更新了什么

- 默认主入口已经切到新的模块化控制台：`/` 为主入口，`/workbench` 保留兼容，`/next` 保留开发和回归直达。
- 桌面薄壳已经能连接本地 Guard Web，并在 Guard 离线时显示连接页，而不是白屏。
- 重页面完成第二轮模块化：Channels、Models、Cron、Files、Recovery 等页面已拆成更可维护的 sections 和 state composables。
- 角色页现在支持按“工作区名称”快速创建 Agent 工作区，同时继续保留完整自定义路径模式。
- Rust 只读 probe、smoke 脚本和 next UI 主线验证链路已经并入公开发布线。

## 推荐安装方式

### 1. npm 全局安装

适合准备长期使用、希望本机直接输入 `openclaw-guard` 命令的用户：

```bash
npm install -g @qingmiao-tech/openclaw-guard@0.10.0
openclaw-guard init-machine --install-openclaw --start-web --port 18088
```

### 2. npx 直接运行

适合先体验一次、临时在新机器上跑起来，或者不想先做全局安装的用户：

```bash
npx -y @qingmiao-tech/openclaw-guard@0.10.0 init-machine --install-openclaw --start-web --port 18088
```

### 3. GitHub Release 资产安装

适合你需要固定到某一个公开版本资产，或者排查问题时想严格复现某次发布：

```bash
npm install -g https://github.com/qingmiao-tech/openclaw-guard/releases/download/v0.10.0/qingmiao-tech-openclaw-guard-0.10.0.tgz
openclaw-guard init-machine --install-openclaw --start-web --port 18088
```

## 更新方式

### npm 全局更新到最新版

```bash
npm install -g @qingmiao-tech/openclaw-guard@latest
```

### npm 固定更新到某个版本

```bash
npm install -g @qingmiao-tech/openclaw-guard@0.10.0
```

### npx 直接运行最新版

```bash
npx -y @qingmiao-tech/openclaw-guard@latest web-status --port 18088 --lang zh
```

### npx 固定运行某个版本

```bash
npx -y @qingmiao-tech/openclaw-guard@0.10.0 web-status --port 18088 --lang zh
```

## Guard 自身在线更新

如果你是通过 `npm install -g @qingmiao-tech/openclaw-guard` 安装的公开版，现在可以在两种地方直接查看 Guard 自身版本和更新状态：

- 运维页里的 “Guard 版本与更新 / Guard Version & Update”
- 本机 CLI：

```bash
openclaw-guard self status
openclaw-guard self update
```

如果当前运行来源是 `npx` 临时环境或源码工作区，Guard 也会明确告诉你为什么这次不适合一键在线更新，以及更合适的升级方式。

## 什么时间适合固定版本

如果你处于下面这些场景，更推荐固定到某个明确版本，而不是直接跟 `latest`：

- 你在客户现场、交付环境或多人协作环境里，需要更容易复现问题。
- 你准备录制教程、截图或演示，不希望命令行为在短期内变化。
- 你正在排查某次升级前后的差异，想先锁住版本范围。

## 什么时间适合用 `latest`

如果你只是想保持跟上公开版本迭代，通常直接使用 `latest` 就够了：

- `npm install -g @qingmiao-tech/openclaw-guard@latest`
- `npx -y @qingmiao-tech/openclaw-guard@latest ...`

## 安装后的第一件事

无论你是通过 `npm`、`npx` 还是 GitHub Release 资产安装，推荐都先执行：

```bash
openclaw-guard init-machine --install-openclaw --start-web --port 18088
```

如果你使用的是 `npx`，把前面的命令替换成：

```bash
npx -y @qingmiao-tech/openclaw-guard@0.10.0 init-machine --install-openclaw --start-web --port 18088
```

## 首次登录提醒

首次启动 Guard Web 时，终端会打印初始化密码。如果你没来得及记下，可以在同一台机器的终端执行：

```bash
openclaw-guard auth show-password
```

如果你已经修改过密码，请直接使用修改后的当前密码登录。
