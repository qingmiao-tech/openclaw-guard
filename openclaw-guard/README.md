<p align="center">
  <img src="./web/logo.png" alt="OpenClaw Guard logo" width="76" />
  <img src="./web/readme-wordmark.svg" alt="OpenClaw Guard / 虾护卫" width="540" />
</p>

<p align="center"><strong>自带“防弹衣”与“复活甲”的 OpenClaw 控制台。</strong></p>
<p align="center">内置多档安全预设，精准隔离越权风险；统一管理记忆、角色、工作区等 Markdown 资产；结合备份与恢复能力，让你进可自由折腾，退可一键重生。</p>

<p align="center"><a href="./README.md">中文</a> · <a href="./README.en.md">English</a></p>

<p align="center">
  <a href="https://github.com/qingmiao-tech/openclaw-guard/actions/workflows/ci.yml"><img alt="Build" src="https://img.shields.io/github/actions/workflow/status/qingmiao-tech/openclaw-guard/ci.yml?branch=main&style=for-the-badge&label=build" /></a>
  <a href="https://github.com/qingmiao-tech/openclaw-guard/releases"><img alt="Release" src="https://img.shields.io/github/v/release/qingmiao-tech/openclaw-guard?style=for-the-badge&label=release" /></a>
  <a href="https://github.com/qingmiao-tech/openclaw-guard/blob/main/package.json"><img alt="Version" src="https://img.shields.io/github/package-json/v/qingmiao-tech/openclaw-guard?style=for-the-badge&label=version&color=0ea5e9" /></a>
  <a href="https://github.com/qingmiao-tech/openclaw-guard/blob/main/LICENSE"><img alt="License" src="https://img.shields.io/github/license/qingmiao-tech/openclaw-guard?style=for-the-badge&label=license&color=22c55e" /></a>
</p>

<p align="center">
  <img src="./web/readme-hero.png" alt="OpenClaw Guard hero banner" />
</p>

<p align="center"><a href="https://qingmiao-tech.github.io/openclaw-guard/">查看文档</a></p>

## 这是什么

OpenClaw Guard 是围绕 OpenClaw 构建的运维与安全控制台。它不追求把所有能力都堆在你面前，而是优先把三件事做扎实：

- 先装得上：检查机器环境，安装或修复 OpenClaw，并拉起 Guard Web。
- 再保得住：把记忆、角色、工作区和关键资产纳入备份与恢复视图。
- 出问题能自救：提供安全预设、运行诊断、日志、修复和回退路径。

如果你不想在第一天就去理解 Git、Cron、OAuth、插件体系这些细节，Guard 的首页和工作台会先带你走最关键的主路径。

## 适合这些场景

- 你刚接手一台机器，想先把 OpenClaw 跑起来，再逐步完成模型、渠道和保护设置。
- 你希望在一个地方管理 OpenClaw、Gateway、模型、官方渠道、安全预设和恢复点。
- 你担心“玩坏了就回不去”，希望在更新、试验或重构前先留下可恢复的检查点。

## 3 分钟上手

### 1. 安装并启动 Guard

```bash
npm install -g @qingmiao-tech/openclaw-guard@0.9.1
openclaw-guard init-machine --install-openclaw --start-web --port 18088
```

如果你更喜欢不落全局安装，也可以直接用 `npx`：

```bash
npx -y @qingmiao-tech/openclaw-guard@0.9.1 init-machine --install-openclaw --start-web --port 18088
```

如果你更希望固定到某个 GitHub Release 资产，也可以直接安装：

```bash
npm install -g https://github.com/qingmiao-tech/openclaw-guard/releases/download/v0.9.1/qingmiao-tech-openclaw-guard-0.9.1.tgz
```

当前公开安装方式、`npm / npx` 更新方式和版本线说明，见 [版本与发布](./docs/releases.md)。

### 2. 打开工作台

- 主入口：`http://127.0.0.1:18088/workbench`
- 根路径也会直接进入 Guard 工作台：`http://127.0.0.1:18088/`

### 3. 第一次登录先看初始化密码

- 首次启动时，Guard 会在本机终端打印一条随机生成的初始化密码。
- 如果你当时没来得及记下，可以在本机终端重新执行：

```bash
openclaw-guard auth show-password
```

- 这个命令只会在本机 CLI 中显示密码，不会通过网页接口返回。
- 如果你已经改过密码，请直接使用修改后的当前密码登录。

### 4. 跟着首页的 4 条主路径走

- 安装 / 修复 OpenClaw
- 配置模型
- 连接渠道
- 开启备份与恢复

首页会优先回答三个问题：

- 现在能不能正常工作？
- 下一步最建议先做什么？
- 当前有没有风险或阻塞项？

## 首发版的核心能力

- 带路首页：从“指标墙”改成“下一步做什么”的控制台入口。
- OpenClaw 生命周期管理：安装、修复、更新、回退、卸载和状态诊断。
- 备份与恢复：默认用“保存现在 / 回到某个恢复点 / 恢复后继续往前走”的产品语言呈现。
- 安全中心：聚合安全检查、权限模式和主机加固建议。
- 工作区工具：统一管理角色、文件、搜索和核心记忆资产。
- 脱敏诊断包：适合贴到 GitHub Issue 或远程协助场景的支持信息导出。

## 支持平台矩阵

| 平台 | 状态 | 说明 |
| --- | --- | --- |
| Windows | Supported | 支持托管安装、后台启动脚本、工作台与诊断导出。 |
| macOS | Supported | 支持脚本启动、工作台、安全建议与恢复流程。 |
| Linux | Supported | 当前重点覆盖 Debian/Ubuntu、Fedora/RHEL、Arch 三类发行版。 |

## 常用入口

### 命令行

```bash
# 启动 Guard Web
openclaw-guard web --port 18088

# 查看 Guard Web 标准状态报告
openclaw-guard web-status --port 18088 --lang zh
openclaw-guard web-status --port 18088 --lang en --json

# 查看当前仍可回看的初始化密码
openclaw-guard auth status
openclaw-guard auth show-password

# 用 npm 全局更新到最新版
npm install -g @qingmiao-tech/openclaw-guard@latest

# 用 npx 直接运行最新版
npx -y @qingmiao-tech/openclaw-guard@latest web-status --port 18088 --lang zh

# 整机初始化（支持预演）
openclaw-guard init-machine --install-openclaw --start-web --port 18088 --dry-run --json

# OpenClaw 生命周期管理
openclaw-guard openclaw status
openclaw-guard openclaw update
openclaw-guard openclaw rollback --history-id <id>
```

### 一键脚本

便捷脚本都在 [`launchers/`](./launchers) 目录下：

- Windows: `launchers\start-web.bat` / `launchers\stop-web.bat` / `launchers\status-web.bat`
- macOS / Linux: `bash ./launchers/start-web.sh`
- macOS 双击入口: `launchers/start-web.command`

## 文档

- [快速开始](./docs/getting-started.md)
- [控制台导览](./docs/console-overview.md)
- [OpenClaw 生命周期](./docs/openclaw-lifecycle.md)
- [备份与恢复](./docs/backup-and-recovery.md)
- [安全与防误触](./docs/security.md)
- [排障与诊断包](./docs/troubleshooting.md)

完整站点：<https://qingmiao-tech.github.io/openclaw-guard/>

## 诊断包与求助

当你准备提 Issue、寻求远程协助，或者只是想先留下当前现场时，优先导出脱敏诊断包：

- 工作台首页可直接下载“诊断包”
- 也可以访问：`GET /api/support/diagnostics?download=1`

诊断包会包含：

- 版本与运行状态
- Guard Web / Gateway / OpenClaw 状态
- 备份与恢复概览
- 最近日志与提醒
- 安全检查摘要

诊断包不会直接包含：

- API Key、Token、Secret、Cookie、密码原文
- 本机用户名原文
- 用户主目录等敏感路径原文

## 已知限制

- “成本”能力目前仍是估算视图，不作为正式账单能力，也不会在主导航中突出展示。
- 自定义渠道插件暂不作为公开首发能力，当前优先支持官方渠道与稳定的扩展预留。
- 高级 Git 仍然保留给技术用户；普通用户默认只需要理解“保存现在”和“恢复到某个状态”。
- Linux 初始化链路当前只覆盖主流发行版推荐路径，不承诺覆盖所有变种系统。

## License

MIT
