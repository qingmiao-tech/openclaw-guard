<p align="center">
  <img src="./web/logo.png" alt="OpenClaw Guard logo" width="76" />
  <img src="./web/readme-wordmark.svg" alt="OpenClaw Guard / 虾护卫" width="540" />
</p>

<p align="center"><strong>自带“防弹衣”与“复活甲”的 OpenClaw 控制台。</strong></p>
<p align="center">内置多档安全预设，精准隔离越权风险；统一管理记忆、性格、工作区等 Markdown 资产；结合备份与恢复能力，让你进可自由折腾，退可一键重生。</p>

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

<p align="center"><a href="https://qingmiao-tech.github.io/openclaw-guard/">查看文档站</a></p>

## 这是什么

OpenClaw Guard 是一个面向 OpenClaw 的原生运维与安全工作台。它不想把更多功能堆到你面前，而是优先把三件事做好：

- 先装得上：检查机器环境，安装或修复 OpenClaw，并拉起 Guard Web。
- 再保得住：把记忆、角色、工作区和关键资产纳入备份与恢复视图。
- 出问题能自救：提供安全预设、运行态诊断、日志、修复和回退能力。

如果你不想一上来就理解 Git、Cron、OAuth、插件体系这些技术细节，Guard 的首页和工作台会先带你走最核心的路径。

## 适合这些场景

- 你刚接手一台机器，希望先把 OpenClaw 装起来，再逐步完成模型、渠道和保护设置。
- 你想统一管理 OpenClaw、Gateway、模型配置、官方渠道、安全预设和恢复点，不想在多个入口之间来回切。
- 你担心“玩坏了就回不去”，希望保留恢复点、在更新或折腾前先保护当前状态。

## 3 分钟上手

### 1. 安装并启动 Guard

```bash
npx -y openclaw-guard@0.9.0 init-machine --install-openclaw --start-web --port 18088
```

或者使用安装脚本：

```bash
curl -fsSL https://raw.githubusercontent.com/qingmiao-tech/openclaw-guard/v0.9.0/install.sh | bash
powershell -NoProfile -ExecutionPolicy Bypass -Command "irm https://raw.githubusercontent.com/qingmiao-tech/openclaw-guard/v0.9.0/install.ps1 | iex"
```

### 2. 打开工作台

- 主入口：`http://127.0.0.1:18088/workbench`
- 根路径也会直接进入 Guard 工作台：`http://127.0.0.1:18088/`

### 3. 按首页的 4 条主路径补齐基础配置

- 安装 / 修复 OpenClaw
- 配置模型
- 连接渠道
- 开启备份与恢复

Guard 首页会优先告诉你：

- 现在能不能正常工作
- 下一步最建议先做什么
- 当前有没有风险或阻断项

## 首发版的核心能力

- 首页带路页：从“指标墙”改成“下一步做什么”的控制台入口。
- OpenClaw 生命周期管理：安装、修复、更新、回退、卸载和状态诊断。
- 备份与恢复：默认以“保存现在 / 回到某个恢复点 / 恢复后继续往前走”的产品语言呈现。
- 安全页：聚合安全检查、权限模式和主机加固建议。
- 工作区工具：统一管理角色、文件、搜索和核心记忆资产。
- 诊断包导出：适合贴到 GitHub Issue 或远程协助的脱敏支持包。

## 支持平台矩阵

| 平台 | 状态 | 说明 |
| --- | --- | --- |
| Windows | Supported | 支持托管安装、后台启动脚本、工作台与诊断导出。 |
| macOS | Supported | 支持脚本启动、工作台、安全建议与恢复流程。 |
| Linux | Supported | 当前重点覆盖 Debian/Ubuntu、Fedora/RHEL、Arch 这三类发行版的初始化路径。 |

## 常用入口

### 命令行

```bash
# 启动 Guard Web
openclaw-guard web --port 18088

# 查看 Guard Web 标准状态报告
openclaw-guard web-status --port 18088 --lang zh
openclaw-guard web-status --port 18088 --lang en --json

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

## 诊断包与求助

当你准备提 Issue、寻求远程协助，或者只是想先留下一份现场快照时，优先导出脱敏诊断包：

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
- 本机用户名称原文
- 用户主目录等敏感路径原文

## 已知限制

- 首发阶段的“成本”能力仍然是估算值，不作为正式账单视图，也不会在主导航中突出展示。
- 自定义渠道插件暂时不作为公开首发能力，当前优先支持官方渠道与稳定的扩展预留。
- 高级 Git 仍然保留给技术用户；普通用户默认只需要理解“保存现在”和“恢复到某个状态”。
- Linux 初始化链路当前只覆盖主流发行版的推荐路径，不承诺覆盖所有变种系统。

## FAQ

### 1. Guard 和 OpenClaw 是什么关系？

OpenClaw 是主体运行时；Guard 是围绕它做安装、运维、安全、防误触和恢复的一层控制台。

### 2. 恢复之后，后续版本怎么接着走？

Guard 默认不会给你新建分支，也不会改写历史。恢复会在当前主线上追加一个 restore commit，后续版本继续接在这个节点后面。

### 3. 我不懂 Git，也能用“备份与恢复”吗？

可以。默认视图会把 Git 细节藏到“高级 Git”里，你只需要理解“保存现在”“恢复到这个状态”“最近有没有上云”。

### 4. 为什么有些高级功能没有放到首页？

公开首发阶段，Guard 更强调“第一次上手就能理解并完成关键路径”，所以首页优先突出安装、模型、渠道、备份与恢复，而不是把所有运维工具同时放大。

## 如何提 Issue

建议按下面的顺序提交，这样更容易定位：

1. 下载脱敏诊断包。
2. 写清楚你期望发生什么、实际发生了什么。
3. 给出最小可复现步骤：
   例如“全新 Windows 机器 -> 执行 init-machine -> 打开工作台 -> 在 OpenClaw 页点击更新”。
4. 如果有截图，尽量同时附上诊断包和最近日志。

Issue 入口：

- [GitHub Issues](https://github.com/qingmiao-tech/openclaw-guard/issues/new/choose)

## 本地开发

```bash
cd openclaw-guard
npm install
npm run build
npm test
```

开发模式：

```bash
npx tsx src/index.ts web --port 18088
```

构建后运行：

```bash
node dist/index.js web --port 18088
```

## License

[MIT](./LICENSE)
