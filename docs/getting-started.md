# 快速开始

这一页的目标很简单：让你在 10 分钟内完成第一次可用的 Guard 环境。

## 开始前准备

你至少需要：

- 一台 Windows、macOS 或 Linux 机器
- 可用的 Node.js 20+ 环境
- 可以访问 npm 或 GitHub Release 的网络环境

如果机器上还没有 OpenClaw，也没关系。Guard 会优先帮你检查并补齐。

## 一条命令完成整机初始化

当前公开版最推荐的方式：

```bash
npm install -g @qingmiao-tech/openclaw-guard@0.9.3
openclaw-guard init-machine --install-openclaw --start-web --port 18088
```

如果你更喜欢不落全局安装，也可以直接用 `npx`：

```bash
npx -y @qingmiao-tech/openclaw-guard@0.9.3 init-machine --install-openclaw --start-web --port 18088
```

这个命令会按顺序做几件事：

1. 检测当前平台
2. 检查 Node / npm 是否可用
3. 检查 Guard 和 OpenClaw 是否已存在
4. 在需要时安装或修复 OpenClaw
5. 启动 Guard Web
6. 回显最终访问地址和状态

如果你想先预演，不真正写入机器：

```bash
openclaw-guard init-machine --install-openclaw --start-web --port 18088 --dry-run --json
```

::: tip 当前公开安装说明
如果你更想固定到 GitHub Release 资产，也可以安装：

```bash
npm install -g https://github.com/qingmiao-tech/openclaw-guard/releases/download/v0.9.3/qingmiao-tech-openclaw-guard-0.9.3.tgz
```
:::

## 打开工作台

启动成功后，打开：

- `http://127.0.0.1:18088/`
- `http://127.0.0.1:18088/workbench`

## 第一次登录前，先确认初始化密码

- 首次启动时，Guard 会在本机终端打印一条随机生成的初始化密码。
- 如果你没来得及抄下来，可以在同一台机器的终端执行：

```bash
openclaw-guard auth show-password
```

- 如果你想先确认当前环境是否仍保留这条本机可回看的记录，也可以执行：

```bash
openclaw-guard auth status
```

- 这个命令只会在本机 CLI 中显示密码，不会通过网页直接返回。
- 如果你已经改过密码，请直接使用修改后的当前密码登录。

首页会先回答三个问题：

- 现在能不能正常工作？
- 下一步最建议先做什么？
- 有没有风险或阻塞项？

## 第一次进入后，建议按这 4 步走

### 1. 安装 / 修复 OpenClaw

如果首页或 OpenClaw 页面提示 CLI 尚未就绪，先把这一项处理好。

### 2. 配置模型

至少配置一个 Provider，并确定主模型。这样系统才有稳定的默认执行路径。

### 3. 连接渠道

至少启用并配置一个官方渠道，让真实消息能进入工作流。

### 4. 开启备份与恢复

先保存一个恢复点。这样后面就算折腾坏了，也能快速回去。

## 常用启动与查看命令

```bash
# 启动 Guard Web
openclaw-guard web --port 18088

# 查看 Guard Web 状态
openclaw-guard web-status --port 18088 --lang zh

# 查看初始化密码是否仍可回看
openclaw-guard auth status
openclaw-guard auth show-password

# 用 npm 全局更新到最新版
npm install -g @qingmiao-tech/openclaw-guard@latest

# 查看 Guard 自己的版本与更新状态
openclaw-guard self status

# 用 npx 直接运行最新版
npx -y @qingmiao-tech/openclaw-guard@latest web-status --port 18088 --lang zh

# 查看 OpenClaw 生命周期状态
openclaw-guard openclaw status
```

## 如果你更习惯一键脚本

`launchers/` 目录已经提供了启动、停止和状态查看脚本：

- Windows: `start-web.bat` / `stop-web.bat` / `status-web.bat`
- macOS / Linux: `start-web.sh` / `stop-web.sh` / `status-web.sh`
- macOS 双击入口: `start-web.command`

## 下一步看什么

- 想先理解界面：看 [控制台导览](/console-overview)
- 想先保住现场：看 [备份与恢复](/backup-and-recovery)
- 想先做好边界：看 [安全与防误触](/security)

::: tip Guard 在线更新说明
如果你是通过 `npm install -g @qingmiao-tech/openclaw-guard` 安装的公开版，进入“运维”页后可以直接看到 Guard 当前版本、最新版本，并在控制台里在线更新。

如果你当前是 `npx` 临时运行或源码工作区运行，页面也会告诉你为什么这次不适合一键更新，以及更合适的升级方式。
:::
