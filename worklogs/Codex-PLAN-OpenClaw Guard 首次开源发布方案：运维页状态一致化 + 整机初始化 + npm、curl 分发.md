# 方案标题
OpenClaw Guard 首次开源发布方案：运维页状态一致化 + 整机初始化 + npm / curl 分发

## 摘要
- 发布边界按“只发 Guard”执行：把 `openclaw-guard` 作为独立 public GitHub 项目和独立 npm 包开源，课程、客户案例、工作日志不进入开源仓。
- 首个公开版本采用 `0.9.0`，不沿用当前内部 `2.0.0`；原因是功能已较丰富，但安装链路、CLI 合同、Web API 和发布产物还未稳定到可直接承诺 `1.x`。
- 交付分三条主线同时完成：`status-web` 与“运维”页状态口径统一；补齐“安装 Node / 安装 Guard / 安装 OpenClaw / 启动 Guard Web”的整机初始化链路；补齐 npm、npx、curl、PowerShell 的公开安装方式和 GitHub + npm 的发布流程。
- 本轮默认不自动安装或启动 Gateway 服务；整机初始化的目标是“机器可运行 Guard，并能自动补齐 OpenClaw CLI”，Gateway 继续沿用现有运维入口处理。

## 重要接口与公开命令
- 新增 CLI：`openclaw-guard web-status --port <n> --lang zh|en --json`
- 新增 CLI：`openclaw-guard init-machine --install-openclaw --start-web --port <n> --managed-prefix <path> --json --dry-run`
- 保留便捷脚本：`status-web.bat/.sh/.command`，但内部改为调用核心 CLI，而不是单独维护一套文案逻辑。
- 新增 API：`GET /api/web-background/report`
- 公开安装命令固定为四类：
  - `npm install -g openclaw-guard@0.9.0`
  - `npx -y openclaw-guard@0.9.0 init-machine --install-openclaw --start-web --port 18088`
  - `curl -fsSL https://raw.githubusercontent.com/<owner>/openclaw-guard/v0.9.0/install.sh | bash`
  - `powershell -NoProfile -ExecutionPolicy Bypass -Command "irm https://raw.githubusercontent.com/<owner>/openclaw-guard/v0.9.0/install.ps1 | iex"`

## 实施方案
- 运维页状态一致化：
  - 把 Guard Web 运行态从“原始状态对象”升级为“标准报告对象”；报告至少包含 `running`、`pid`、`port`、`managed`、`source`、`primaryUrl`、`workbenchUrl`、`nextAction`、`scenario`、`pidFile`、`logPaths`。
  - 由核心模块统一生成状态报告；Web API 返回同一份报告，CLI `web-status` 也直接复用这份报告，避免脚本与页面分别拼文案。
  - `status-web` 脚本默认输出中文，支持 `--lang en`；Web 端继续跟随右上角语言切换。
  - “运维”页把当前占位式说明替换为真实摘要卡：第一屏显示当前状态、访问地址、PID、托管来源、下一步建议；`pidFile` 与日志路径放到高级信息折叠区，不把长路径堆在首屏。
  - 保留现有 `/api/web-background/status` 作为兼容原始接口；新增 `/api/web-background/report` 供前端和后续测试使用。

- 整机初始化链路：
  - 新增核心初始化模块，编排步骤固定为：检测平台 -> 解析托管前缀 -> 校验 Node/npm -> 安装或更新 Guard -> 校验 PATH -> 安装或修复 OpenClaw -> 启动 Guard Web -> 回显最终地址与状态。
  - 默认采用“用户级托管前缀”，不依赖系统全局 npm prefix；建议默认前缀为 `~/.openclaw/guard/npm-global`，Windows 对应 `%USERPROFILE%\\.openclaw\\guard\\npm-global`。
  - OpenClaw 的安装逻辑从“始终 `npm install -g openclaw@latest`”调整为“优先检测现有 PATH 安装；若未安装，则安装到 Guard 管理前缀”；这样可以规避 Unix 上的 sudo / root 依赖。
  - `detectOpenClaw()` 需要先检查 Guard 管理前缀，再检查 PATH，再检查 npm 默认 prefix；安装结果与路径说明也改为围绕“托管前缀 + 现有安装”双路径输出。
  - `init-machine` 只负责 Guard + OpenClaw CLI，不自动触发 Gateway 安装；如果后续要做“全栈初始化”，在 `0.10.x` 再加 `--with-gateway`。
  - 初始化命令和外部安装脚本都支持 `--dry-run`，用于 CI 校验和用户预演。
  - Linux 的首版自动安装支持矩阵固定为 Debian/Ubuntu、Fedora/RHEL、Arch；不在矩阵内的发行版直接退出，并打印对应的手动安装说明。
  - Windows 的 Node 自动安装顺序固定为：`winget` -> `choco` -> 官方 Node LTS MSI 静默安装；macOS 固定为 `brew` 优先、无 Homebrew 时先装 Homebrew；Linux 按发行版走各自 package manager / NodeSource。

- 开源发布与分发：
  - 先把 `openclaw-guard` 从当前仓库拆成独立 public repo，建议仓库名与包名一致，都是 `openclaw-guard`；后续内部仓库继续以 subtree/subrepo 方式同步，不把课程内容公开。
  - npm 包发布前必须做产物瘦身；当前 `npm pack --dry-run` 会把 `.guard-runtime`、`src`、测试文件和运行截图打进 tarball，这一行为必须被彻底阻断。
  - 发布包只保留运行必需内容：`dist/`、`web/`、必要的 `scripts/*.mjs`、便捷启动脚本、`README`、`LICENSE`、`package.json`；不发布 `.guard-runtime`、`node_modules`、`src`、测试、临时文件、内部文档。
  - 需要修复静态资源路径；当前 logo 仍依赖 `src/assets/logo.png` 的候选路径，发布后如果不带 source 会失效，因此必须在发布产物中提供稳定资产路径，并让服务端优先从发布资产位置读取。
  - `package.json` 要补齐发布元数据：`files` 白名单、`engines.node`、`repository`、`homepage`、`bugs`、`publishConfig.access=public`、`prepack`、`prepublishOnly`。
  - GitHub 主站作为唯一主发布源；GitHub Releases 发布 `install.sh`、`install.ps1` 和版本说明，npm 发布同版本包。
  - 发布流程采用“手动触发 + 自动执行”，不做全自动推 tag 发布；首版先用 GitHub Actions 的 `workflow_dispatch` 执行一次受控发布。
  - CI 工作流固定为：Windows/macOS/Linux 三端构建测试、`npm pack --dry-run`、安装脚本 dry-run、核心 CLI smoke。
  - Release 工作流固定为：校验版本未发布 -> 构建 -> 测试 -> 生成精简 tarball -> 发布 npm -> 创建 GitHub Release -> 上传安装脚本与 changelog 摘要。

- 版本号与后续迭代：
  - 首个公开版本固定为 `0.9.0`；语义是“功能完整度已经较高，但安装器、发布产物和公开接口仍处于公开预览阶段”。
  - 版本规则在 `0.x` 阶段固定为：`patch` 只做 bugfix / 包裁剪 / 文档修正；`minor` 承载新命令、新 API、新初始化能力，即使有小 breaking 也允许放在 minor。
  - `1.0.0` 的准入门槛固定为四条：安装脚本三端稳定、npm 包结构稳定、CLI 合同稳定、Web API 至少一轮向后兼容验证通过。
  - 迭代规划固定为：
    - `0.9.0`：状态报告统一、整机初始化、npm/npx/curl/PowerShell 分发、发布流程落地。
    - `0.9.1`：修复安装器边界问题、PATH 修复、更多 Linux 分发版兼容、tarball 继续瘦身。
    - `0.10.0`：把 `init-machine` 接回 Guard Web 的 OpenClaw 页与运维页，增加“初始化本机”可视化入口。
    - `0.11.0`：可选 Gitee 镜像、可选 Gateway 初始化、更多自修复动作。
    - `1.0.0`：冻结公开 CLI / HTTP 接口，补齐正式 changelog、升级指南和兼容承诺。

## 测试与验收
- 状态一致化测试：
  - `web-status --json` 与 `/api/web-background/report` 返回同一组 `scenario / nextAction / url / source / managed` 语义。
  - `status-web` 中文默认输出与“运维”页摘要语义一致；切换到英文后字段含义不变。
  - 三种核心场景都要覆盖：已托管运行、端口被其他进程占用、当前未运行。
- 初始化链路测试：
  - Node 已安装但未装 OpenClaw；Node 已安装且 OpenClaw 已存在；Node 缺失的 Windows/macOS/Linux 干净环境。
  - `init-machine --dry-run` 能输出完整步骤计划，不做真实写入。
  - 真实执行后能回显 Guard Web 地址，并能从 `web-status` 看到运行状态。
- 发布产物测试：
  - `npm pack --dry-run` 不得包含 `.guard-runtime`、`src`、测试、截图、`node_modules`。
  - 从打包产物全新安装后，`openclaw-guard web --port 18088`、`openclaw-guard web-status`、`start-web` / `stop-web` / `status-web` 均可运行。
  - 发布包中的静态资源必须完整，logo 与前端资源不能依赖源码目录。
- 发布流程测试：
  - GitHub Actions 的 CI 必须在三端通过。
  - `workflow_dispatch` 的 release job 需要在 dry-run 模式先走一遍，确认 npm 发布参数、tag 命名和 Release 产物名称正确。

## 假设与默认
- 开源主站固定为 GitHub，仓库名默认也是 `openclaw-guard`。
- npm 包名固定为 `openclaw-guard`；当前 registry 未被占用，可以直接使用。
- 首版公开发布默认重置为 `0.9.0`，不延续内部 `2.0.0` 版本线。
- npm / npx 安装方式默认要求机器已有 Node；只有 `curl` / PowerShell 引导脚本负责自动安装 Node。
- 本轮不自动安装或启动 Gateway 服务；Gateway 继续作为第二阶段初始化能力处理。
