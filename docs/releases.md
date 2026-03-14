# 版本与发布

这一页既面向使用者，也面向维护者，帮助你理解 OpenClaw Guard 当前公开版本的发布形态、安装入口和后续维护方式。

## 当前公开版本

- 当前 GitHub Release：[`v0.9.0`](https://github.com/qingmiao-tech/openclaw-guard/releases/tag/v0.9.0)
- 发布时间：2026-03-14
- 当前附带资产：`openclaw-guard-0.9.0.tgz`
- 文档站地址：<https://qingmiao-tech.github.io/openclaw-guard/>

如果你现在只是想先用起来，请优先认 GitHub Release 和文档站，不要假设 npm 已经同步可用。

## 当前推荐安装方式

由于这次公开首发先完成了 GitHub Release，而 npm 公开包名还在调整中，当前最稳妥的公开安装方式是直接使用 Release tarball：

```bash
npm install -g https://github.com/qingmiao-tech/openclaw-guard/releases/download/v0.9.0/openclaw-guard-0.9.0.tgz
openclaw-guard init-machine --install-openclaw --start-web --port 18088
```

如果你只是想先预演，不真正写入机器：

```bash
openclaw-guard init-machine --install-openclaw --start-web --port 18088 --dry-run --json
```

## 为什么不是直接 npm publish

当前无法直接按 `openclaw-guard` 这个名字发布到 npm，原因有两个：

1. 这台机器当前没有 npm 登录态
2. 更关键的是，`openclaw-guard` 这个未加 scope 的包名已经被另一个项目占用

已确认的 npm 现状：

- 已存在包名：`openclaw-guard`
- 当前公开版本：`0.3.1`
- 对应仓库：`jnMetaCode/clawguard`

这意味着当前仓库不能直接以同名未加 scope 方式发布。

## 推荐的 npm 包名策略

更适合后续公开发布的名字是：

```text
@qingmiao-tech/openclaw-guard
```

这个 scoped 包名当前是空的，更符合公开仓库和后续维护路径。

在切到 scoped 包名之后，建议同步更新这些地方：

- `package.json` 的 `name`
- README 与 docs 里的安装命令
- `install.sh` / `install.ps1`
- 任何默认写死 `openclaw-guard@<version>` 的脚本或示例

## 版本线说明

当前公开版本按 `0.x` 线演进，意味着产品仍在快速打磨期，但已经开始提供稳定的公开文档、Release 和安装入口。

你可以这样理解版本策略：

- `0.x`：快速迭代期，重点持续收口公开首发体验
- `1.0+`：在核心路径更稳定后，再进入更强的兼容承诺

## 安装示例为什么固定写 tag

文档里的 Release 安装示例默认写成固定 tag，例如：

```bash
npm install -g https://github.com/qingmiao-tech/openclaw-guard/releases/download/v0.9.0/openclaw-guard-0.9.0.tgz
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

## 对维护者来说：推荐的发版顺序

1. 在本地跑通 `npm run docs:build`
2. 如有代码变更，再补跑 `npm test`
3. 确认 README、文档站和安装示例使用同一版本号
4. 推送到 `main`
5. 通过 public repo 创建 GitHub Release，并附上 tarball 资产
6. 等 GitHub Actions 完成 Pages 构建与部署
7. 解决 npm 包名与登录问题后，再进行公开 npm 发布

## 升级建议

### 普通用户

优先使用 Guard 提供的 OpenClaw 生命周期能力来更新或修复，不建议手工混用多套路径。

### 技术用户

如果你需要更细粒度控制版本或回退，优先查看：

- [OpenClaw 生命周期](/openclaw-lifecycle)
- [备份与恢复](/backup-and-recovery)
- [排障与诊断包](/troubleshooting)

## 已知边界

- GitHub Release 已经可用，但 npm 公开包名仍待调整
- 当前 Release 资产可直接安装，安装脚本会在下一轮与 scoped 包名一起对齐
- 文档站强调公开首发体验，不会把所有内部或实验性能力都写进默认导航
- 自定义插件、复杂自动化和更深入的团队协作能力会放在后续版本逐步补齐
