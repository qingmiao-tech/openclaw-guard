# 版本与发布

这一页既面向使用者，也面向维护者，帮助你理解 OpenClaw Guard 的版本线、安装方式和文档发布方式。

## 对使用者来说：认 GitHub Release 就够了

公开版本的首要来源是：

- GitHub Releases
- npm 包版本

推荐安装时优先使用带版本号的命令，而不是长期依赖不固定的脚本地址。这样在排障、回退和团队协作时更容易确认大家使用的是同一版本。

## 版本线说明

当前公开版本按 `0.x` 线演进，意味着产品仍在快速打磨期，但已经开始提供稳定的公开安装和文档入口。

你可以这样理解版本策略：

- `0.x`：快速迭代期，重点持续收口公开首发体验
- `1.0+`：在核心路径更稳定后，再进入更强的兼容承诺

## 安装示例为什么固定写 tag

文档里的安装脚本示例默认写成类似下面这种形式：

```bash
curl -fsSL https://raw.githubusercontent.com/qingmiao-tech/openclaw-guard/v0.9.0/install.sh | bash
```

这样做的好处是：

- 更容易复现问题
- 更容易锁定诊断范围
- 回退和协作时更清楚

## 文档站如何发布

这个文档站使用 VitePress 构建，并通过 GitHub Pages 托管。

当前仓库中的自动发布流程会在以下内容变化时触发：

- `docs/**`
- `package.json`
- `package-lock.json`
- `.github/workflows/docs-pages.yml`
- 文档所需的静态资源

构建命令：

```bash
npm run docs:build
```

## 对维护者来说：推荐的发布顺序

1. 在本地跑通 `npm run docs:build`
2. 确认 README、文档站和安装示例使用同一版本线
3. 推送到 `main`
4. 等 GitHub Actions 完成 Pages 构建与部署
5. 如有公开版本更新，再同步创建 GitHub Release 和 npm 发布

## 升级建议

### 普通用户

优先使用 Guard 提供的 OpenClaw 生命周期能力来更新或修复，不建议手工混用多套路径。

### 技术用户

如果你需要更细粒度控制版本或回退，优先查看：

- [OpenClaw 生命周期](/openclaw-lifecycle)
- [备份与恢复](/backup-and-recovery)
- [排障与诊断包](/troubleshooting)

## 已知边界

- 文档站强调公开首发体验，不会把所有内部或实验性能力都写进默认导航
- 自定义插件、复杂自动化和更深入的团队协作能力会放在后续版本逐步补齐
