# Codex 工作日志

## 固定准则（长期生效）

- 架构型、技术型、记录型文档默认输出到 `worklogs/` 目录。
- 日志主文件固定为 `worklogs/codex-work-logs.md`，不拆分子文件。
- 记录粒度固定为“每次交付写 1 条完整记录”。
- 时间标准固定为北京时间（`Asia/Shanghai`），格式 `YYYY-MM-DD HH:mm`（精确到分钟）。
- 每条记录必须包含：任务来源、仓库范围、指派时间、开始时间、提交时间、任务目标、执行过程、交付成果、变更清单、提交来源、验证结果、后续建议。
- 项目近况默认统计范围固定为 `openclaw-course + openclaw-feishu`。
- “最近 14 批提交”统计方法固定为：两仓 `git log` 合并后按提交时间降序取 14 条。
- 如某仓不可访问或提交不足，允许降级为单仓统计；必须记录降级原因、降级时间和数据来源命令。
- 如未特别说明，不纳入 `openclaw` 官方仓统计。

## 日志条目模板

```md
## [提交时间 YYYY-MM-DD HH:mm] <任务标题> [TASK-YYYYMMDD-序号]

- 任务来源:
- 仓库范围: openclaw-course | openclaw-feishu | both
- 指派时间:
- 开始时间:
- 提交时间:
- 任务目标:
- 执行过程:
  1) ...
  2) ...
- 交付成果:
  1) ...
  2) ...
- 变更清单:
- 提交来源(openclaw-course): repo=...; branch=...; head=...; ahead/behind=...
- 提交来源(openclaw-feishu): repo=...; branch=...; head=...; ahead/behind=...
- 验证结果:
- 后续建议:
```

## 后续更新机制

1. 每次你下发任务时，先新增一条日志骨架并填写“任务来源、指派时间、任务目标”。
2. 我开始执行时补齐“开始时间、仓库范围、执行过程（进行中）”。
3. 我形成可交付结果时补齐“提交时间、交付成果、变更清单、提交来源、验证结果”。
4. 若任务跨多轮，持续追加到同一 `TASK-YYYYMMDD-序号` 条目，直至关闭。
5. 日志采用逆序追加，最新记录始终放在最上方。

## 交付记录

## [2026-03-06 08:00] 按要求提交当前全部代码改动（含 openclaw-feishu） [TASK-20260306-001]

- 任务来源: 用户要求“提交所有代码变更”。
- 仓库范围: both
- 指派时间: 2026-03-06 08:00
- 开始时间: 2026-03-06 08:00
- 提交时间: 2026-03-06 08:00
- 任务目标:
  1) 提交 `openclaw-course` 仓库当前所有待提交改动。
  2) 提交 `openclaw-feishu` 仓库当前所有待提交改动。
- 执行过程:
  1) 扫描两仓 `git status`，确认当前所有修改与未跟踪文件清单。
  2) 在 `openclaw-course` 执行全量暂存并提交。
  3) 在 `openclaw-feishu` 执行全量暂存并提交。
  4) 输出两仓提交哈希并复核工作区清洁状态。
- 交付成果:
  1) 两仓待提交改动已完成入库。
  2) 保留本次任务的日志记录，便于后续回溯。
- 变更清单:
  - `openclaw-course`：当前工作区全部已改动文件（含 `openclaw-guard`、`worklogs`、`wxarticle` 相关文件）
  - `openclaw-feishu`：当前工作区全部已改动文件（含 `src/*`、`README*`、`scripts/*`、部署与迁移文档）
- 提交来源(openclaw-course): repo=`e:\openclaw-course`; branch=`main`; head=`a3fa5c2`; ahead/behind=`ahead 8, behind 0`
- 提交来源(openclaw-feishu): repo=`e:\openclaw-course\openclaw-feishu`; branch=`main`; head=`708fe4a`; ahead/behind=`ahead 1, behind 0`
- 验证结果:
  1) 提交后将以 `git status --short` 与提交哈希校验。
  2) 若有未纳入文件，将在提交后立即补齐并复核。
- 后续建议:
  1) 如需区分“代码提交”和“文档提交”，下一轮可改为按功能批次拆分提交。

## [2026-03-04 11:15] openclaw-guard 增加中英文国际化切换（右上角语言按钮） [TASK-20260304-004]

- 任务来源: 用户要求“增加国际化多语言功能，右上角可以进行中英文切换”。
- 仓库范围: openclaw-course
- 指派时间: 2026-03-04 10:58
- 开始时间: 2026-03-04 10:59
- 提交时间: 2026-03-04 11:15
- 任务目标:
  1) 在 openclaw-guard 页面右上角提供 `中文/EN` 切换入口。
  2) 支持中英文切换并持久化（刷新后保持上次语言）。
  3) 在不改动后端接口的前提下，实现前端主要 UI 文案国际化。
- 执行过程:
  1) 在 `openclaw-guard/src/web-ui.ts` 增加右上角语言切换按钮与样式（`lang-switch`、`lang-btn`）。
  2) 新增前端 i18n 运行时：语言检测（`localStorage + navigator.language`）、语言持久化、标签栏静态文案映射、页面标题切换。
  3) 新增中文翻译词典与全页面翻译器（文本节点 + placeholder/title 属性），并通过 `MutationObserver` 处理异步渲染内容（各 tab 拉取后自动本地化）。
  4) 增加翻译保护：跳过 `script/style/pre/code/textarea/log-viewer/log-box`，避免破坏脚本与日志内容。
  5) 实测中英文按钮切换会触发刷新并保持语言状态，验证 Dashboard/AI 等页面可读性。
- 交付成果:
  1) 页面右上角新增 `中文` / `EN` 按钮，可一键切换语言。
  2) 语言偏好持久化到本地（键：`openclaw.guard.lang`），刷新后维持所选语言。
  3) 导航、标题及主要操作区文案支持中文显示（含 Feishu、Channels、AI、Mission 等核心区域的常见文案）。
- 变更清单:
  - `openclaw-guard/src/web-ui.ts`
  - `worklogs/codex-work-logs.md`
- 提交来源(openclaw-course): repo=`e:\openclaw-course`; branch=`main`; head=`a3fa5c2`; ahead/behind=`ahead 8, behind 0`
- 提交来源(openclaw-feishu): repo=`e:\openclaw-course\openclaw-feishu`; branch=`main`; head=`708fe4a`; ahead/behind=`ahead 1, behind 0`
- 验证结果:
  1) `npx tsc --noEmit` 通过。
  2) Playwright 验证通过：点击 `EN` 后页面标题切换为 `OpenClaw Guard - Security Dashboard`，导航为英文；点击 `中文` 后标题切换为 `OpenClaw Guard - 安全控制台`，导航为中文。
  3) Playwright 控制台错误级消息为 `0`。
- 后续建议:
  1) 当前以“词典替换 + 观察器”方案快速落地，后续可逐步升级为 key-based i18n（按 `t("key")` 方式）以获得更细粒度控制。
  2) 若要对外发布，建议把翻译词典拆分为独立文件（`i18n/en.ts`、`i18n/zh.ts`）并加入文案校对流程。

## [2026-03-04 09:33] 修复 openclaw-guard 页面中文乱码（Mojibake）并完成可视化验证 [TASK-20260304-003]

- 任务来源: 用户反馈页面出现中文乱码，要求直接修复。
- 仓库范围: openclaw-course
- 指派时间: 2026-03-04 09:21
- 开始时间: 2026-03-04 09:22
- 提交时间: 2026-03-04 09:33
- 任务目标:
  1) 定位 openclaw-guard 页面乱码根因并修复。
  2) 保证页面可正常加载且关键标签/按钮文案可读。
  3) 完成接口与浏览器双重验证，确认无空白页和无控制台错误。
- 执行过程:
  1) 排查 `openclaw-guard/src/web-ui.ts`，确认问题并非仅编码头，而是多处 UI 文案被损坏为 `?`/空文本（含标题、按钮、提示语）。
  2) 对损坏文案做集中修复：OpenClaw、Audit、Profiles、Harden、Feishu、Channels、AI Providers、Mission 相关提示统一替换为稳定可读文本（以英文为主，避免再次乱码）。
  3) 清理残留异常文案（如 `Save Save config`、`OK?`、空 `h3`、`Loading?..`），并补齐缺失按钮文案与分组标题。
  4) 发现 `18088` 上运行的是旧进程输出旧页面，执行进程重启后再次抓取 HTML 确认新内容已生效。
  5) 通过 Playwright 分页验证 OpenClaw/Feishu/Channels/AI 标签页，确认展示文本正常且控制台无报错。
- 交付成果:
  1) 页面乱码已修复，不再出现“棣/鐎/閸”等 Mojibake 字符。
  2) 关键交互区（Feishu/AI/Channels/OpenClaw）文案恢复可读，按钮状态与提示文案完整。
  3) 服务继续使用 `18088`，页面与 API 均可访问。
- 变更清单:
  - `openclaw-guard/src/web-ui.ts`
  - `worklogs/codex-work-logs.md`
- 提交来源(openclaw-course): repo=`e:\openclaw-course`; branch=`main`; head=`a3fa5c2`; ahead/behind=`ahead 8, behind 0`
- 提交来源(openclaw-feishu): repo=`e:\openclaw-course\openclaw-feishu`; branch=`main`; head=`708fe4a`; ahead/behind=`ahead 1, behind 0`
- 验证结果:
  1) `npx tsc --noEmit` 通过。
  2) `GET http://127.0.0.1:18088/` 返回 `200`，页面标题为 `OpenClaw Guard - Security Dashboard`。
  3) Playwright 快照验证：Dashboard/System/OpenClaw/Feishu/Channels/AI/Mission/Audit/Profiles/Harden/Logs 标签均可见，Feishu 与 AI 页关键字段文本正常。
  4) 浏览器控制台错误级消息为 `0`。
- 后续建议:
  1) 如需中文界面，可后续做一次“统一 UTF-8 中文文案回填”，并增加文案常量集中管理，避免再次局部损坏。
  2) 可在启动脚本中增加“检测旧进程并提示重启”逻辑，避免改完代码后仍看到旧页面缓存/旧进程输出。

## [2026-03-04 08:15] 处理 Web 空白页并将 openclaw-guard Web 端口切换到 18088 [TASK-20260304-002]

- 任务来源: 用户反馈 `localhost:8088` 页面空白，要求先检查 `8080` 端口占用并将 Web 端口改为 `18088` 后复测。
- 仓库范围: openclaw-course
- 指派时间: 2026-03-04 08:06
- 开始时间: 2026-03-04 08:06
- 提交时间: 2026-03-04 08:15
- 任务目标:
  1) 排查 `8080` 端口是否存在冲突占用。
  2) 将 openclaw-guard Web 默认端口统一调整为 `18088`。
  3) 复测空白页问题并确认服务/API可达。
- 执行过程:
  1) 端口排查：检查 `8080/8088/18088` 监听状态，确认 `8080` 无占用，`8088` 被 `node ... tsx src/index.ts web` 进程占用。
  2) 端口改造：将 `openclaw-guard/src/index.ts` 的 `web` 命令默认端口由 `8088` 改为 `18088`；将 `openclaw-guard/package.json` 的 `dev/web` 脚本改为显式 `--port 18088`；同步更新 `start-web.bat` 提示端口。
  3) 空白页根因补修：发现首页返回 HTML 中存在破损闭合标签（如 `?/title>`、`?/div>`），导致页面结构异常；在 `openclaw-guard/src/web-ui.ts` 修复这类闭合标签为标准 `</...>`。
  4) 重启验证：停止旧 `8088` Web 进程后重启，确认 `18088` 正常监听，`/` 与 `/api/info` 返回 200。
- 交付成果:
  1) `8080` 端口冲突排除完成（无监听）。
  2) openclaw-guard Web 入口默认端口已切换到 `18088`。
  3) 页面空白问题已缓解，Playwright 快照可见页面头部与标签栏正常渲染。
- 变更清单:
  - `openclaw-guard/src/index.ts`
  - `openclaw-guard/package.json`
  - `openclaw-guard/start-web.bat`
  - `openclaw-guard/src/web-ui.ts`
  - `worklogs/codex-work-logs.md`
- 提交来源(openclaw-course): repo=`e:\openclaw-course`; branch=`main`; head=`02097a0`; ahead/behind=`ahead 7, behind 0`
- 提交来源(openclaw-feishu): repo=`e:\openclaw-course\openclaw-feishu`; branch=`main`; head=`708fe4a`; ahead/behind=`ahead 1, behind 0`
- 验证结果:
  1) 端口监听：`PORT 8080: no listener`，`PORT 18088: LISTEN`。
  2) HTTP 验证：`GET http://127.0.0.1:18088/` 返回 `200`，`GET /api/info` 返回 `200`。
  3) 浏览器自动化快照：页面标题/导航可见，控制台仅 `favicon.ico 404`（非阻断）。
- 后续建议:
  1) 后续可单独做一次“中文文案编码统一清理”（当前主要修复结构与可用性）。
  2) 如需彻底避免端口冲突，可在启动脚本增加端口占用检测与自动递增策略。

## [2026-03-04 07:54] 修复 openclaw-guard `npm run dev` 启动异常（esbuild TransformError） [TASK-20260304-001]

- 任务来源: 用户反馈 `E:\openclaw-course\openclaw-guard` 执行 `npm run dev` 报错，堆栈指向 `esbuild`，无法正常启动。
- 仓库范围: openclaw-course
- 指派时间: 2026-03-04 07:49
- 开始时间: 2026-03-04 07:50
- 提交时间: 2026-03-04 07:54
- 任务目标:
  1) 定位并修复 `openclaw-guard` 启动报错根因。
  2) 验证 `npm run dev` 可进入可用服务态。
- 执行过程:
  1) 复现问题并抓取真实编译错误，确认 `openclaw-guard/src/index.ts` 存在多处破损字符串（未闭合引号/描述文本损坏），导致 `tsx/esbuild` 解析失败。
  2) 对 `src/index.ts` 进行最小修复：补齐损坏命令描述与选项字符串、修复 Mission 状态输出模板字符串。
  3) 处理文件头部 BOM 导致的 shebang 解析异常（`index.ts:1:4 Syntax error "!"`），移除 UTF-8 BOM。
  4) 调整 `openclaw-guard/package.json` 脚本，将 `dev` 改为直接启动 Web 子命令，并保留 `dev:cli` 用于 CLI 调试。
  5) 进行回归验证：`npx tsc --noEmit` 通过；`tsx src/index.ts --help` 正常；后台拉起 `npm run dev` 后确认 `8088` 端口处于 `Listen`。
- 交付成果:
  1) 已修复 `npm run dev` 抛出 `TransformError` 的问题。
  2) `npm run dev` 现在直接进入 Web 服务启动路径，避免无参 CLI 帮助页退出造成“看似失败”。
  3) 已保留 `npm run dev:cli` 供命令行能力调试。
- 变更清单:
  - `openclaw-guard/src/index.ts`
  - `openclaw-guard/package.json`
  - `worklogs/codex-work-logs.md`
- 提交来源(openclaw-course): repo=`e:\openclaw-course`; branch=`main`; head=`02097a0`; ahead/behind=`ahead 7, behind 0`
- 提交来源(openclaw-feishu): repo=`e:\openclaw-course\openclaw-feishu`; branch=`main`; head=`708fe4a`; ahead/behind=`ahead 1, behind 0`
- 验证结果:
  1) `npx tsc --noEmit` 返回成功。
  2) `npx tsx src/index.ts --help` 返回 CLI 帮助，未再出现 `esbuild TransformError`。
  3) 启动 `npm run dev` 后检测到 `8088` 端口监听（`LISTEN`），并完成进程清理。
- 后续建议:
  1) 后续可单独安排一次“CLI 文案乱码清理”（当前仅修复语法与启动链路，未整体清洗历史乱码文本）。

## [2026-03-03 21:03] 补充“首模型故障注入验证”可复制示例 [TASK-20260303-002]

- 任务来源: 用户要求将“首模型故障注入后自动尝试下一候选”的描述改为更具体示例，包含备份配置、改错首模型、重启网关、命令和会话双验证。
- 仓库范围: openclaw-course
- 指派时间: 2026-03-03 21:02
- 开始时间: 2026-03-03 21:02
- 提交时间: 2026-03-03 21:03
- 任务目标:
  1) 将 Checklist 中第 3 条升级为可执行验证方案。
  2) 给出“故障注入 -> 触发 fallback -> 恢复配置”的完整闭环步骤。
- 执行过程:
  1) 定位文章 `## 六、生产验证 Checklist` 区块，确认第 3 条目前仅为结论句，缺少操作细节。
  2) 将第 3 条改为“见下方实操示例”，并新增独立小节 `### 故障注入实操示例（可直接复制）`。
  3) 补齐 6 个步骤：配置备份、首模型改错、重启网关、命令验证、会话验证、恢复配置。
  4) 同时补充“改错 key 与改坏 baseUrl 的差异说明”，避免把鉴权错误与连接错误混淆。
- 交付成果:
  1) 文档已新增完整故障注入模板，可直接复制执行（Windows/macOS/Linux 均覆盖）。
  2) 验证路径已形成闭环：配置层、运行层、会话层都可确认 fallback 是否生效。
- 变更清单:
  - `wxarticle/南柯/OpenClaw多模型自动切换实战复盘与官方补丁-20260303.md`
  - `worklogs/codex-work-logs.md`
- 提交来源(openclaw-course): repo=`e:\openclaw-course`; branch=`main`; head=`17ce46a`; ahead/behind=`ahead 6, behind 0`
- 提交来源(openclaw-feishu): repo=`e:\openclaw-course\openclaw-feishu`; branch=`main`; head=`708fe4a`; ahead/behind=`ahead 1, behind 0`
- 验证结果:
  1) `20260303` 文章中已出现新小节“故障注入实操示例（可直接复制）”。
  2) 示例已包含备份命令、故障注入方式、`openclaw gateway restart`、`models status --probe --json` 与恢复命令。
- 后续建议:
  1) 若你准备对外发布文章，可再加一段“真实日志截图示例”（首模型失败 + fallback 成功）增强读者信心。

## [2026-03-03 20:42] 补充公众号文档中的环境变量配置（临时生效 + 持久化） [TASK-20260303-001]

- 任务来源: 用户要求将 env 配置方式补充到其文档中，明确“临时生效”和“持久化”两种配置方式。
- 仓库范围: openclaw-course
- 指派时间: 2026-03-03 20:41
- 开始时间: 2026-03-03 20:41
- 提交时间: 2026-03-03 20:42
- 任务目标:
  1) 在 `20260303` 公众号文档中补全环境变量操作指引。
  2) 明确 Windows 场景下临时与持久化配置差异，并补充生效与重启说明。
- 执行过程:
  1) 定位文章中 API Key 配置段落，确认原有描述尚未形成“临时/持久化”分步手册。
  2) 在“`Q：我不知道自己的 API Key 怎么办？`”区块补充占位符映射示例（`${WENWEN_API_KEY}`）。
  3) 重写环境变量配置说明为分平台分场景步骤：macOS/Linux 与 Windows，且 Windows 单独拆分“当前会话临时生效”和“用户级持久化生效”。
  4) 增加验证命令与注意事项（`setx` 不回写当前终端、OpenClaw/Gateway 需重启进程读取新变量）。
- 交付成果:
  1) 文档已补齐 env 方式说明，覆盖临时生效与持久化配置两条路径。
  2) Windows 操作指令已可直接复制执行，并附带验证与生效边界说明。
- 变更清单:
  - `wxarticle/南柯/OpenClaw多模型自动切换实战复盘与官方补丁-20260303.md`
  - `worklogs/codex-work-logs.md`
- 提交来源(openclaw-course): repo=`e:\openclaw-course`; branch=`main`; head=`754bdb3`; ahead/behind=`ahead 5, behind 0`
- 提交来源(openclaw-feishu): repo=`e:\openclaw-course\openclaw-feishu`; branch=`main`; head=`708fe4a`; ahead/behind=`ahead 1, behind 0`
- 验证结果:
  1) 已在文档中看到新增的 Windows 临时配置（`$env:*`）和持久化配置（`setx`）分段说明。
  2) 已补充 `~/.openclaw/openclaw.json` 占位符映射示例与“修改后需重启相关进程”提示。
- 后续建议:
  1) 如你还希望覆盖 CMD 临时变量写法（`set KEY=value`）和“系统级环境变量（Machine）”配置，可在同区块追加“进阶补充”小节。

## [2026-03-02 21:32] 忽略 openclaw-guard/dist 并一次性提交其余未跟踪内容 [TASK-20260302-011]

- 任务来源: 用户要求将 `openclaw-guard/dist/` 目录加入忽略，并把其他改动一次性提交。
- 仓库范围: openclaw-course
- 指派时间: 2026-03-02 21:30
- 开始时间: 2026-03-02 21:31
- 提交时间: 2026-03-02 21:32
- 任务目标:
  1) 将 `openclaw-guard/dist/` 纳入 Git 忽略规则。
  2) 将其余未跟踪内容打包为单次提交。
- 执行过程:
  1) 检查当前未跟踪文件与现有 `.gitignore` 规则。
  2) 在根目录 `.gitignore` 新增 `openclaw-guard/dist/` 忽略项。
  3) 保留 `dist/` 不入库，并对其他未跟踪内容进行一次性提交。
  4) 同步补充本条任务日志，保持记录规范完整。
- 交付成果:
  1) `openclaw-guard/dist/` 已进入忽略规则，不再出现在未跟踪列表中。
  2) 其余未跟踪改动已按要求进行单批次提交。
- 变更清单:
  - `.gitignore`
  - `course-web/start.bat`
  - `worklogs/tmp-sessions-raw.json`
  - `wxarticle/other/images/*`
  - `worklogs/codex-work-logs.md`
- 提交来源(openclaw-course): repo=`e:\openclaw-course`; branch=`main`; head=`4e58239`; ahead/behind=`ahead 4, behind 0`
- 提交来源(openclaw-feishu): repo=`e:\openclaw-course\openclaw-feishu`; branch=`main`; head=`708fe4a`; ahead/behind=`ahead 1, behind 0`
- 验证结果:
  1) `git status --short` 中 `openclaw-guard/dist/` 已不再作为未跟踪项出现。
  2) 剩余目标文件可被正常纳入同一批次提交。
- 后续建议:
  1) 如 `worklogs/tmp-sessions-raw.json` 包含敏感会话信息，建议后续评估是否继续留库或改为脱敏版本。

## [2026-03-02 21:12] 按功能批次完成代码与文档 Git 提交 [TASK-20260302-010]

- 任务来源: 用户要求“把改动的文档、代码按会话或功能批次进行 git 提交”。
- 仓库范围: openclaw-course
- 指派时间: 2026-03-02 21:08
- 开始时间: 2026-03-02 21:09
- 提交时间: 2026-03-02 21:12
- 任务目标:
  1) 将当前已完成功能按批次提交，避免把临时文件混入提交。
  2) 输出可追溯的提交记录（按功能拆分）。
- 执行过程:
  1) 检查工作区改动，区分“代码功能批次”和“文档批次”，排除构建产物与临时数据。
  2) 第 1 批提交 `openclaw-guard` 代码与测试：mission 集成、fallback 配置、Web 交互状态与相关测试。
  3) 第 2 批提交 `worklogs` 与 `wxarticle` 文档：方案、补丁文档、复盘文章、V2 实操教程。
  4) 保留未纳入提交项：`openclaw-guard/dist/`、`worklogs/tmp-sessions-raw.json`、`wxarticle/other/images/`、`course-web/start.bat`。
- 交付成果:
  1) 功能代码批次提交：`408c046`。
  2) 文档批次提交：`d36bc30`。
  3) 当前提交链条按功能可追溯，便于后续单独回滚/Cherry-pick。
- 变更清单:
  - commit `408c046`: `openclaw-guard/README.md`、`openclaw-guard/src/index.ts`、`openclaw-guard/src/models.ts`、`openclaw-guard/src/server.ts`、`openclaw-guard/src/service-mgr.ts`、`openclaw-guard/src/web-ui.ts`、`openclaw-guard/src/mission-control.ts`、`openclaw-guard/src/__tests__/models.test.ts`、`openclaw-guard/src/__tests__/server.test.ts`
  - commit `d36bc30`: `worklogs/*.md`、`worklogs/scripts/collect-recent-14.ps1`、`wxarticle/other/如何在OpenClaw 中配置多个不同的模型模型并且自动切换？.md`、`wxarticle/南柯/OpenClaw多模型自动切换实战复盘与官方补丁-20260302.md`
  - `worklogs/codex-work-logs.md`
- 提交来源(openclaw-course): repo=`e:\openclaw-course`; branch=`main`; head=`d36bc30`; ahead/behind=`ahead 3, behind 0`
- 提交来源(openclaw-feishu): repo=`e:\openclaw-course\openclaw-feishu`; branch=`main`; head=`708fe4a`; ahead/behind=`ahead 1, behind 0`
- 验证结果:
  1) 两批提交已成功创建，`git log --oneline -n 3` 可见 `d36bc30` 与 `408c046`。
  2) 代码批次提交前执行定向测试：`npx vitest run src/__tests__/models.test.ts src/__tests__/server.test.ts` 通过（17/17）。
- 后续建议:
  1) 视需要继续提交“未纳入项”（如图片资源）时，建议再单独做 assets 批次提交。
  2) 推送前可先执行一次 `git push --dry-run` 校验远端权限与分支策略。

## [2026-03-02 20:40] 输出多模型自动切换教程 V2，并将 fallbacks 配置接入 openclaw-guard [TASK-20260302-009]

- 任务来源: 用户要求将 `wxarticle/other/如何在OpenClaw 中配置多个不同的模型模型并且自动切换？.md` 升级为更细节的 V2（含明确文件路径与可复制示例），并把 `fallbacks` 配置加入 `openclaw-guard`。
- 仓库范围: openclaw-course
- 指派时间: 2026-03-02 20:20
- 开始时间: 2026-03-02 20:22
- 提交时间: 2026-03-02 20:40
- 任务目标:
  1) 重写 V2 教程，补齐新手可直接操作的完整示例（含 `openai-codex/gpt-5.3-codex`、`qwen/qwen3.5-plus`、故障注入示例 `disabled-test/gpt-5.3-codex`、配置文件路径）。
  2) 在 `openclaw-guard` 中落地 `fallbacks` 读写能力（配置读取、API 写入、Web UI 配置入口、测试覆盖）。
- 执行过程:
  1) 校验并修复 `openclaw-guard/src/server.ts` 的未闭合字符串导致的解析错误，恢复 `server/models` 测试可运行状态。
  2) 补全 `models.ts` 的 fallback 配置能力：读取 `fallbacks`、标注 `isFallback`、新增 `setFallbackModels()`、删除 provider 时同步清理 fallback 引用。
  3) 在 `server.ts` 增加 `POST /api/ai/fallbacks` 接口，支持 `modelIds`/`models` 数组或逗号字符串输入。
  4) 在 `web-ui.ts` 的 AI 面板新增 `Fallback Models` 输入区与 `Save/Clear` 操作，并在模型标签展示 fallback 标记。
  5) 增补测试并回归验证：`models.test.ts` 增加 fallback 用例，执行 `models/server` 定向测试通过。
  6) 全量重写教程文档为 V2，补充“改哪个文件、如何故障注入、为什么不生效、如何在 guard 里配置”等完整步骤。
- 交付成果:
  1) `openclaw-guard` 已支持 fallback 链配置与展示（模型层 + API 层 + Web UI 层）。
  2) 教程已升级为 V2，内容可直接对标实操并覆盖你提出的关键示例与排障点。
  3) 文档与代码均已落地到仓库可见文件。
- 变更清单:
  - `openclaw-guard/src/models.ts`
  - `openclaw-guard/src/server.ts`
  - `openclaw-guard/src/index.ts`
  - `openclaw-guard/src/web-ui.ts`
  - `openclaw-guard/src/__tests__/models.test.ts`
  - `openclaw-guard/README.md`
  - `wxarticle/other/如何在OpenClaw 中配置多个不同的模型模型并且自动切换？.md`
  - `worklogs/codex-work-logs.md`
- 提交来源(openclaw-course): repo=`e:\openclaw-course`; branch=`main`; head=`fe85f95`; ahead/behind=`ahead 1, behind 0`
- 提交来源(openclaw-feishu): repo=`e:\openclaw-course\openclaw-feishu`; branch=`main`; head=`708fe4a`; ahead/behind=`ahead 1, behind 0`
- 验证结果:
  1) `npx vitest run src/__tests__/models.test.ts src/__tests__/server.test.ts` 通过（17/17）。
  2) `npx esbuild src/web-ui.ts --bundle --platform=node --outfile=.tmp-web-ui-check.js` 通过（已删除临时产物）。
  3) 已确认 `/api/ai/fallbacks`、`fallbackModels`、`isFallback` 相关代码路径闭环。
- 后续建议:
  1) 增加 `server` 层 fallback API 的集成测试（目前主要由模型层测试覆盖）。
  2) 做一次 Guard Web 端手工联调（保存 fallback -> 刷新 -> 触发故障注入验证链路）。
  3) 若后续继续使用 CLI 入口，建议单独清理 `src/index.ts` 历史编码/文案异常，减少后续编译噪音。

## [2026-03-02 19:09] 落地“连接类错误触发 failover”长期补丁并产出补丁文档与公众号文章 [TASK-20260302-008]

- 任务来源: 用户要求执行上一轮未完成事项：将“连接类错误也触发 failover”的代码补丁正式落地，并单独输出补丁文档；同时将整段自动切换排障流程整理为公众号文章，保存到 `wxarticle/南柯`。
- 仓库范围: openclaw-course
- 指派时间: 2026-03-02 19:00
- 开始时间: 2026-03-02 19:02
- 提交时间: 2026-03-02 19:09
- 任务目标:
  1) 修复 `Connection error.` 不触发 fallback 的根因代码。
  2) 提供独立补丁说明文档（可用于后续合并/发布说明）。
  3) 输出一篇完整复盘型公众号文章（含“没生效”排障路径与补丁方案）。
- 执行过程:
  1) 基于源码定位补丁点：`openclaw/src/agents/pi-embedded-helpers/errors.ts` 与 `openclaw/src/agents/failover-error.ts`。
  2) 在 timeout 语义中补齐连接类关键词与错误码匹配（`connection error/fetch failed/network error/ECONNREFUSED/ENOTFOUND/EAI_AGAIN` 等），使其统一归类为 `timeout`。
  3) 补充回归样例到测试文件：`pi-embedded-helpers.isbillingerrormessage.test.ts`、`failover-error.test.ts`。
  4) 尝试运行定向单测验证；当前环境依赖不完整，`vitest` 在工程上下文不可执行，记录为“已尝试但未能完成本地执行”。
  5) 产出独立补丁文档到 `worklogs/`，并按公众号风格产出完整复盘文章到 `wxarticle/南柯/`。
- 交付成果:
  1) 代码补丁已落地：连接类报错可被 failover 识别并触发回退链（源码层）。
  2) 补丁说明文档已生成：`worklogs/openclaw-failover-connection-error-patch-20260302.md`。
  3) 公众号文章已生成：`wxarticle/南柯/OpenClaw多模型自动切换实战复盘与官方补丁-20260302.md`。
- 变更清单:
  - `openclaw/src/agents/pi-embedded-helpers/errors.ts`
  - `openclaw/src/agents/failover-error.ts`
  - `openclaw/src/agents/pi-embedded-helpers.isbillingerrormessage.test.ts`
  - `openclaw/src/agents/failover-error.test.ts`
  - `worklogs/openclaw-failover-connection-error-patch-20260302.md`
  - `wxarticle/南柯/OpenClaw多模型自动切换实战复盘与官方补丁-20260302.md`
  - `worklogs/codex-work-logs.md`
- 提交来源(openclaw-course): repo=`e:\openclaw-course`; branch=`main`; head=`fe85f95`; ahead/behind=`ahead 1`
- 提交来源(openclaw-feishu): repo=`e:\openclaw-course\openclaw-feishu`; branch=`main`; head=`708fe4a`; ahead/behind=`ahead 1`
- 验证结果:
  1) 代码级验证：timeout 分类已覆盖 connection/network 关键文本与典型 socket/DNS 错误码。
  2) 测试级验证：新增单测覆盖连接类错误归类为 `timeout`。
  3) 命令执行结果：`pnpm vitest run ...` 与 `pnpm dlx vitest run ...` 已尝试，但当前环境缺少项目依赖导致未完成本地测试执行（`vitest` 不可用/配置加载失败）。
- 后续建议:
  1) 在具备完整依赖的环境执行定向单测并补齐 CI 记录。
  2) 将补丁合入实际运行版本（你当前全局安装包未必自动包含该仓库源码改动）。
  3) 发布前继续使用“稳定通道优先”的 fallback 顺序作为运行态兜底策略。

## [2026-03-02 18:53] 评估“仅配 primary+backup（未配 fallbacks）是否会自动切模型” [TASK-20260302-007]

- 任务来源: 用户提供一份教程，询问“未配置 `fallbacks` 时，一个模型失效会不会自动调用另一个模型”。
- 仓库范围: openclaw-course
- 指派时间: 2026-03-02 18:48
- 开始时间: 2026-03-02 18:49
- 提交时间: 2026-03-02 18:53
- 任务目标:
  1) 判断教程中的 `backup` 配置是否会被 OpenClaw 实际识别为回退链。
  2) 给出“会/不会自动切换”的明确结论与正确配置方式。
- 执行过程:
  1) 查阅本地 CLI 文档 `openclaw/docs/cli/models.md`，确认官方回退入口是 `models fallbacks` 与 `agents.defaults.model.fallbacks`，未提及 `agents.defaults.model.backup`。
  2) 查阅配置解析实现 `openclaw/src/config/model-input.ts`，确认模型配置仅解析 `primary` 与 `fallbacks` 两个字段。
  3) 查阅回退执行实现 `openclaw/src/agents/model-fallback.ts`，确认候选链由 `primary + fallbacks` 组成；若无 `fallbacks`，通常只有单候选，不存在跨模型自动切换。
- 交付成果:
  1) 结论确认：该教程里 `agents.defaults.model.backup` 不是 OpenClaw 模型回退的有效字段。
  2) 结论确认：未配置 `fallbacks` 时，默认不会在“主模型失效后自动切到备用模型”。
  3) 输出了正确配置方向：使用 `agents.defaults.model.fallbacks`（或 `openclaw models fallbacks add`）建立有序回退链。
- 变更清单:
  - `worklogs/codex-work-logs.md`
- 提交来源(openclaw-course): repo=`e:\openclaw-course`; branch=`main`; head=`fe85f95`; ahead/behind=`ahead 1`
- 提交来源(openclaw-feishu): repo=`e:\openclaw-course\openclaw-feishu`; branch=`main`; head=`708fe4a`; ahead/behind=`ahead 1`
- 验证结果:
  1) 文档证据：`models` CLI 文档仅定义 `fallbacks` 管理。
  2) 代码证据：`resolveAgentModelFallbackValues()` 仅读取 `model.fallbacks`，不读取 `model.backup`。
  3) 代码证据：`runWithModelFallback()` 仅按候选链遍历；未形成多候选链时不会发生跨模型切换。
- 后续建议:
  1) 将教程中的 `backup` 字段改为 `fallbacks` 数组。
  2) 改完后执行 `openclaw models status --probe --json` 验证链路与通道可用性。
  3) 线上验证用 `/new` 新会话，避免旧会话状态影响判断。

## [2026-03-02 18:43] 排查 Feishu `Connection error.` 且未触发自动 fallback 的根因 [TASK-20260302-006]

- 任务来源: 用户反馈“当前返回 Connection error，怀疑 `custom-localhost-8000/claude-opus-4-6` 异常，并询问为何未自动切下一个模型”。
- 仓库范围: openclaw-course
- 指派时间: 2026-03-02 18:38
- 开始时间: 2026-03-02 18:39
- 提交时间: 2026-03-02 18:43
- 任务目标:
  1) 确认 `Connection error.` 的真实来源（配置问题 / 通道故障 / 代码逻辑问题）。
  2) 解释“为什么没有自动切到下一模型”并给出可执行修复路径。
- 执行过程:
  1) 执行 `openclaw models status --probe --json`，确认当前运行态：`defaultModel=disabled-test/gpt-5.3-codex`，fallback 链首位为 `custom-localhost-8000/claude-opus-4-6`，且该通道探测结果为 `status=unknown` + `error=LLM request timed out.`；`wenwen/claude-opus-4-6` 探测 `status=ok`。
  2) 检查最近非 probe 会话日志（`~/.openclaw/agents/main/sessions/*.jsonl`），确认连续错误记录来自 `provider=custom-localhost-8000`、`model=claude-opus-4-6`、`errorMessage=Connection error.`（例如 `aec4e73e-cbd2-4586-b2bd-5e8a9279facd.jsonl`）。
  3) 检查本机端口监听，确认 `11434` 正常监听，而 `8000` 无本地监听进程。
  4) 核对回退判定代码：`openclaw/src/agents/pi-embedded-helpers/errors.ts` 的 `ERROR_PATTERNS.timeout` 未覆盖 `Connection error` 类关键词；`classifyFailoverReason()` 因此返回 `null`。在 `openclaw/src/agents/pi-embedded-runner/run.ts` 中，`shouldRotate` 依赖 `isFailoverAssistantError()`，导致该错误不会触发 fallback 轮转。
- 交付成果:
  1) 根因确认：`custom-localhost-8000` 通道当前不可用（`localhost:8000` 无服务），并非 `wenwen` 通道故障。
  2) 根因确认：`Connection error.` 未被归类为 failover 可重试错误，导致未自动切到下一个 fallback。
  3) 输出可执行修复路径：优先调整 fallback 顺序/临时移除故障通道；长期修复为在 failover 分类中纳入 connection/network 错误模式。
- 变更清单:
  - `worklogs/codex-work-logs.md`
- 提交来源(openclaw-course): repo=`e:\openclaw-course`; branch=`main`; head=`fe85f95`; ahead/behind=`ahead 1`
- 提交来源(openclaw-feishu): repo=`e:\openclaw-course\openclaw-feishu`; branch=`main`; head=`708fe4a`; ahead/behind=`ahead 1`
- 验证结果:
  1) 运行态探测证据：`custom-localhost-8000` 超时、`wenwen` 正常。
  2) 会话证据：`Connection error.` 连续出现在 `custom-localhost-8000/claude-opus-4-6`。
  3) 代码证据：failover 分类未覆盖 `Connection error.`，不满足自动轮转条件。
- 后续建议:
  1) 临时稳定方案：将 `wenwen/claude-opus-4-6` 调整为首个 fallback，待 `localhost:8000` 通道恢复后再放回前位。
  2) 长期方案：扩展 failover 错误模式，至少纳入 `connection error/fetch failed/network error/econnrefused/econnreset/enotfound/eai_again`。
  3) 每次调整模型链后执行一次 `openclaw models status --probe --json` 与 `/new` 新会话验证，避免旧会话干扰判断。

## [2026-03-02 18:24] 修复“禁用主模型不生效”并验证 fallback 自动切换 [TASK-20260302-005]

- 任务来源: 用户反馈“还是没生效啊”，即禁用 `openai-codex/gpt-5.3-codex` 后仍看到该模型回复。
- 仓库范围: openclaw-course
- 指派时间: 2026-03-02 18:10
- 开始时间: 2026-03-02 18:11
- 提交时间: 2026-03-02 18:24
- 任务目标:
  1) 确认“配置已改但仍走 openai-codex”的真实原因。
  2) 让 fallback 在运行态真正生效，并给出可复验结论。
- 执行过程:
  1) 排查 `openclaw-feishu` 与运行中的 `C:\Users\Administrator\.openclaw\extensions\feishu` 插件源码，确认无 `before_model_resolve/before_agent_start` 模型强制覆盖逻辑，也无 `openai-codex/gpt-5.3-codex` 硬编码注入。
  2) 核对 `C:\Users\Administrator\.openclaw\openclaw.json` 与 `openclaw models status --json`，确认配置层已生效：`defaultModel/resolvedDefault = disabled-test/gpt-5.3-codex`，fallback 链为三段（custom-localhost-8000 -> wenwen -> qwen3:8b）。
  3) 检查网关进程，发现 OpenClaw Gateway 自 `2026-03-01 07:27` 持续运行（PID 17628），明显早于本次配置修改时间，属于旧运行态未重载配置。
  4) 执行网关重启（结束 PID 17628，重新拉起 `gateway.cmd`），新进程 PID 135400，启动时间 `2026-03-02 18:19`。
  5) 重启后再次验证会话运行态：`openclaw sessions --json` 与 `openclaw status --json` 显示 Feishu 最新会话已切换到 `custom-localhost-8000/claude-opus-4-6`（新 sessionId `a056433b-f74b-43d6-8d40-710bbdeba70b`）。
- 交付成果:
  1) 根因确认：不是配置写入失败，而是 Gateway 长时间未重启导致旧运行态继续使用旧选模结果。
  2) 已落地修复：网关重启完成，fallback 自动切换在运行态生效。
  3) 验证结果从“仍是 openai-codex”变为“已切到 fallback 的 custom-localhost-8000/claude-opus-4-6”。
- 变更清单:
  - `worklogs/codex-work-logs.md`
- 提交来源(openclaw-course): repo=`e:\openclaw-course`; branch=`main`; head=`fe85f95`; ahead/behind=`ahead 1`
- 提交来源(openclaw-feishu): repo=`e:\openclaw-course\openclaw-feishu`; branch=`main`; head=`708fe4a`; ahead/behind=`ahead 1`
- 验证结果:
  1) `openclaw models status --json`：`resolvedDefault = disabled-test/gpt-5.3-codex`（配置侧正确）。
  2) `openclaw sessions --json`：Feishu 会话最新 `modelProvider = custom-localhost-8000`，`model = claude-opus-4-6`。
  3) `openclaw status --json`：recent Feishu session 已显示 `claude-opus-4-6`，不再是 `openai-codex/gpt-5.3-codex`。
- 后续建议:
  1) 每次修改 `agents.defaults.model.primary/fallbacks` 后固定执行一次 Gateway 重启，再做回退验证。
  2) 验证时先发 `/new` 开新会话，再发送一条普通消息，避免旧会话历史与缓存状态干扰判断。
  3) 若仍看到旧模型，优先检查“会话是否为新 sessionId”与“Gateway 进程启动时间是否晚于配置修改时间”。

## [2026-03-02 18:03] 排查“已禁用主模型仍显示 openai-codex”并定位根因 [TASK-20260302-004]

- 任务来源: 用户反馈已按步骤操作，但回复仍显示 `openai-codex/gpt-5.3-codex`。
- 仓库范围: openclaw-course
- 指派时间: 2026-03-02 17:50
- 开始时间: 2026-03-02 17:51
- 提交时间: 2026-03-02 18:03
- 任务目标:
  1) 明确“禁用主模型后仍显示原模型”的真实原因。
  2) 给出可稳定触发 fallback 的验证办法。
- 执行过程:
  1) 核对当前配置：`agents.defaults.model.primary` 已为 `openai-codex/gpt-5.3-codex-disabled-test`，fallback 链保持有效。
  2) 拉取 `openclaw status --json` 与会话存储，确认 Feishu 会话最近运行记录仍是 `openai-codex/gpt-5.3-codex`，并存在 `session_status` 工具调用输出该模型。
  3) 阅读运行时源码，定位关键行为：当 provider 存在但 modelId 不存在时，`resolveModel()` 会构造 provider 兼容 fallback model（不会立即因 unknown model 失败）。
  4) 结合日志与源码，确定“改坏模型名”不是强制失败手段；需改为“不可用 provider”或“失效 auth”才能稳定触发 fallback。
- 交付成果:
  1) 根因结论：`openai-codex/gpt-5.3-codex-disabled-test` 仍可能被 provider 兼容路径接管，导致会话继续显示/使用 `openai-codex/gpt-5.3-codex`。
  2) 输出改进验证策略：使用不存在 provider（如 `disabled-test/gpt-5.3-codex`）进行主路由失效注入，再观察 fallback 命中。
- 变更清单:
  - `worklogs/codex-work-logs.md`
- 提交来源(openclaw-course): repo=`e:\openclaw-course`; branch=`main`; head=`fe85f95`; ahead/behind=`ahead 1`
- 提交来源(openclaw-feishu): repo=`e:\openclaw-course\openclaw-feishu`; branch=`main`; head=`708fe4a`; ahead/behind=`ahead 1`
- 验证结果:
  1) `openclaw status --json` 显示 defaults 已切到 `gpt-5.3-codex-disabled-test`，但 Feishu recent session 模型仍为 `gpt-5.3-codex`。
  2) 会话文件 `d98b5d2a-...jsonl` 记录了 `session_status` 调用与后续回复，模型字段持续为 `openai-codex/gpt-5.3-codex`。
  3) 代码证据：`resolveModel()` 对“已配置 provider + 未知 modelId”存在 providerCfg fallback 构造逻辑。
- 后续建议:
  1) 用“不可用 provider”而非“改坏 modelId”来验证 fallback（更确定）。
  2) 验证时先发 `/new` 开新会话，避免旧会话状态误导。

## [2026-03-02 17:42] 提供主模型临时禁用与 fallback 自动切换验证步骤 [TASK-20260302-003]

- 任务来源: 用户提问（如何临时禁用 `openai-codex/gpt-5.3-codex` 来验证 fallback 自动切模型）。
- 仓库范围: openclaw-course
- 指派时间: 2026-03-02 17:39
- 开始时间: 2026-03-02 17:40
- 提交时间: 2026-03-02 17:42
- 任务目标:
  1) 给出低风险、可回滚的“主模型临时失效注入”方案。
  2) 给出可操作的验证路径（如何确认已发生自动切换）。
- 执行过程:
  1) 核对本机 OpenClaw CLI 能力，确认 `models set/status/fallbacks`、`logs`、`gateway` 命令可用。
  2) 选择“不改 fallback、仅让 primary 临时不可用”的验证策略，避免影响已落地的回退链。
  3) 输出标准化步骤：备份主模型 -> 设置不可用 primary -> 发送测试请求 -> 查看日志 -> 恢复主模型。
- 交付成果:
  1) 形成一套可直接执行的 PowerShell/CLI 步骤，用于验证 fallback 自动切换。
  2) 提供验证观测点：`openclaw logs --follow --plain` 中应看到 primary 失败与后续 fallback 尝试。
- 变更清单:
  - `worklogs/codex-work-logs.md`
- 提交来源(openclaw-course): repo=`e:\openclaw-course`; branch=`main`; head=`fe85f95`; ahead/behind=`ahead 1`
- 提交来源(openclaw-feishu): repo=`e:\openclaw-course\openclaw-feishu`; branch=`main`; head=`708fe4a`; ahead/behind=`ahead 1`
- 验证结果:
  1) 已确认 `openclaw logs --help` 支持实时跟随与纯文本输出（`--follow --plain`）。
  2) 已确认 `openclaw models` 相关子命令可用于快速切换与恢复 primary/fallback 状态。
- 后续建议:
  1) 首次验证建议在低峰时段进行，并仅发 1-2 条探测请求，避免对生产会话造成扰动。
  2) 验证完成后立即恢复 `openai-codex/gpt-5.3-codex`，并再次执行 `models status` 复核。

## [2026-03-02 16:56] 基于现网配置落地 OpenClaw 多渠道自动回退链 [TASK-20260302-002]

- 任务来源: 用户确认“可以”，同意继续执行“基于现有 provider 直接生成并落地可用配置”。
- 仓库范围: openclaw-course
- 指派时间: 2026-03-02 16:52
- 开始时间: 2026-03-02 16:53
- 提交时间: 2026-03-02 16:56
- 任务目标:
  1) 基于本机真实 `openclaw.json` 将多渠道自动切换配置实际落地，而非仅给模板。
  2) 验证主模型保持不变、fallback 链可被 OpenClaw 正确识别。
- 执行过程:
  1) 读取 `C:\Users\Administrator\.openclaw\openclaw.json`，确认当前主模型为 `openai-codex/gpt-5.3-codex`，存在 3 个 text 渠道，且 `fallbacks` 为空。
  2) 通过 `openclaw models list/status/fallbacks` 验证候选模型引用可识别。
  3) 使用官方 CLI 写入 fallback，观察到同模型 ID（`claude-opus-4-6`）跨 provider 的场景下，连续 `fallbacks add` 出现首条被覆盖现象。
  4) 为稳定固化目标顺序，备份原配置后，直接写入 `agents.defaults.model.fallbacks` 三段链路，并再次用 CLI 校验。
  5) 将本次实配结果、回滚点与后续建议整理为实施文档写入 `worklogs/`。
- 交付成果:
  1) 已落地文本自动回退链：
     - `custom-localhost-8000/claude-opus-4-6`
     - `wenwen/claude-opus-4-6`
     - `custom-127-0-0-1-11434/qwen3:8b`
  2) 主模型保持为 `openai-codex/gpt-5.3-codex`，未变更主路由。
  3) 已生成落地文档：`worklogs/openclaw-multi-channel-auto-fallback-20260302.md`。
  4) 已生成手动备份：`C:\Users\Administrator\.openclaw\openclaw.json.manualbak-202603021656`。
- 变更清单:
  - `worklogs/openclaw-multi-channel-auto-fallback-20260302.md`
  - `worklogs/codex-work-logs.md`
  - `C:\Users\Administrator\.openclaw\openclaw.json`（运行配置，工作区外）
- 提交来源(openclaw-course): repo=`e:\openclaw-course`; branch=`main`; head=`fe85f95`; ahead/behind=`ahead 1`
- 提交来源(openclaw-feishu): repo=`e:\openclaw-course\openclaw-feishu`; branch=`main`; head=`708fe4a`; ahead/behind=`ahead 1`
- 验证结果:
  1) `openclaw models fallbacks list --plain` 返回三段 fallback 链，顺序与目标一致。
  2) `openclaw models status --plain` 返回主模型 `openai-codex/gpt-5.3-codex`。
  3) 配置探查确认当前无 image 输入能力模型，图像自动切换暂不具备落地条件。
- 后续建议:
  1) 若需要“图像请求自动切换”，至少新增一个 `input` 含 `"image"` 的 provider/model，并配置 `agents.defaults.imageModel.primary/fallbacks`。
  2) 建议加一条定时巡检 `openclaw models status --probe --json`（注意会消耗真实配额）。
  3) 当前存在 `feishu` 插件重复注册告警，建议后续去重配置。

## [2026-03-02 16:27] OpenClaw 多模型渠道自动切换可行性评估与实施方案 [TASK-20260302-001]

- 任务来源: 用户提问（评估 `wxarticle/other/如何在OpenClaw 中配置多个不同的模型模型并且自动切换？.md` 是否可解决“多渠道不可用/额度耗尽自动切换”痛点，并给出详细方案）。
- 仓库范围: openclaw-course
- 指派时间: 2026-03-02 16:20
- 开始时间: 2026-03-02 16:21
- 提交时间: 2026-03-02 16:27
- 任务目标:
  1) 判断文章方案是否足以解决生产级“渠道故障自动切换”问题。
  2) 基于 OpenClaw 当前代码与文档，输出可直接落地的详细实施方案（文本与图像模型均覆盖）。
- 执行过程:
  1) 核对文章内容，确认其核心覆盖：多 provider 配置、`primary` 设置、`set-image`/`set-primary` 切换、重启与状态检查。
  2) 核对官方 CLI 文档，确认存在 `models fallbacks`、`models image-fallbacks`、`models status --probe` 等能力。
  3) 核对运行时代码 `src/agents/model-fallback.ts` 与 `src/agents/failover-error.ts`，确认故障分类（rate_limit/auth/billing/timeout 等）、候选链遍历、冷却期与探测策略均已实现。
  4) 形成“可行性结论 + 分层落地方案 + 验证清单 + 运维建议”交付内容，准备按用户场景给出执行步骤。
- 交付成果:
  1) 明确结论：该文可解决“基础多模型配置”，但仅靠文内步骤不足以覆盖生产稳定性；需补全 fallback 链、认证轮转与健康探测流程。
  2) 产出详细方案框架：配置层（providers/primary/fallbacks）、运行层（自动切换策略）、运维层（probe 巡检、告警与回退演练）、验证层（故障注入测试）。
- 变更清单:
  - `worklogs/codex-work-logs.md`
- 提交来源(openclaw-course): repo=`e:\openclaw-course`; branch=`main`; head=`fe85f95`; ahead/behind=`ahead 1`
- 提交来源(openclaw-feishu): repo=`e:\openclaw-course\openclaw-feishu`; branch=`main`; head=`708fe4a`; ahead/behind=`ahead 1`
- 验证结果:
  1) 已验证 `openclaw/docs/cli/models.md` 与 `openclaw/docs/cli/index.md` 的 `fallbacks/image-fallbacks/status --probe` 命令存在且语义明确。
  2) 已验证 `openclaw/src/agents/model-fallback.ts` 存在文本与图像 fallback 执行链及冷却探测逻辑。
  3) 已验证 `openclaw/src/agents/failover-error.ts` 存在故障分类映射（401/403/402/429/408/5xx 等）。
- 后续建议:
  1) 在你的实际 `~/.openclaw/openclaw.json` 上按“同厂商先回退、跨厂商再兜底”建立明确 fallback 顺序。
  2) 增加定时 `openclaw models status --probe` 巡检与失败告警，避免在业务流量到来后才发现通道不可用。
  3) 如需，我可下一步直接按你的 provider 清单生成一份可复制的生产配置（文本+图片双链路）。

## [2026-03-01 21:28] 修复 Web 启动后空白页（前端脚本语法错误） [TASK-20260301-007]

- 任务来源: 用户反馈 `start-web.bat` 启动后 `http://localhost:8088` 页面空白。
- 仓库范围: openclaw-course
- 指派时间: 2026-03-01 21:20
- 开始时间: 2026-03-01 21:21
- 提交时间: 2026-03-01 21:28
- 任务目标:
  1) 定位页面空白根因（服务端返回问题 / 前端渲染问题）。
  2) 修复导致空白页的脚本错误并验证启动可用。
- 执行过程:
  1) 检查 `start-web.bat` 与 `package.json`，确认启动链路使用 `npx tsx src/index.ts web`，非旧 dist 入口。
  2) 抓取首页响应，确认服务端返回 `200` 且 HTML 非空，排除“接口空返回”问题。
  3) 对 `getHtmlPage()` 生成的内联脚本执行语法检查（`vm.Script`），定位到多个历史乱码字符串导致的 JS 语法错误（未闭合引号/条件表达式字符串损坏）。
  4) 在 `web-ui.ts` 修复关键坏行（Dashboard/OpenClaw/Info/Channels/Logs/AI 等区域的损坏文案与条件字符串），替换为可执行英文文案，保证脚本可解析。
  5) 反复执行脚本语法校验直到 `SCRIPT_SYNTAX=OK`，并完成 build/test 回归。
- 交付成果:
  1) 空白页根因已确认：前端内联脚本语法错误导致浏览器脚本初始化失败。
  2) `web-ui.ts` 已修复相关坏字符串，`getHtmlPage()` 产出的内联脚本语法通过。
  3) 本地启动验证首页返回正常 HTML，并包含 `OpenClaw Guard` 与 `panel-dashboard` 标识。
- 变更清单:
  - `openclaw-guard/src/web-ui.ts`
  - `worklogs/codex-work-logs.md`
- 提交来源(openclaw-course): repo=`e:\openclaw-course`; branch=`main`; head=`fe85f95`; ahead/behind=`ahead 1`
- 提交来源(openclaw-feishu): repo=`e:\openclaw-course\openclaw-feishu`; branch=`main`; head=`708fe4a`; ahead/behind=`ahead 1`
- 验证结果:
  1) 已通过 `npm run build`（openclaw-guard）。
  2) 已通过 `npm test`（openclaw-guard，36/36）。
  3) 已通过脚本语法检查：`vm.Script(getHtmlPage() 内联 JS)` -> `SCRIPT_SYNTAX=OK`。
  4) 已通过本地启动抓取：`STATUS=200`，`HAS_TITLE=true`，`HAS_PANEL=true`。
- 后续建议:
  1) 建议增加一个 CI 检查：对 `getHtmlPage()` 的内联 JS 做语法校验，防止再次出现类似空白页。
  2) 建议逐步清理页面中的历史乱码文案，统一为 UTF-8 可维护文本。

## [2026-03-01 21:04] 扩展全局按钮进行中反馈并新增 Mission 任务时间线 [TASK-20260301-006]

- 任务来源: 用户指派（“两项都处理”），要求同时完成更多按钮加载态与 Mission 任务时间线可视化。
- 仓库范围: openclaw-course
- 指派时间: 2026-03-01 20:55
- 开始时间: 2026-03-01 20:56
- 提交时间: 2026-03-01 21:04
- 任务目标:
  1) 将“加载中/任务进行中”交互从 Mission 扩展到更多高频操作按钮，降低重复点击误判。
  2) 为 Mission 面板增加任务时间线（开始时间、阶段、运行状态、结束时间、耗时、结果）并实时更新。
- 执行过程:
  1) 在 `web-ui.ts` 新增通用按钮状态工具：`resolveActionEl`、`setActionLoading`、`clearActionLoading`，支持按钮与可点击文本两类触发器。
  2) 将 OpenClaw 操作接入进行中反馈：`Install/Update/Refresh` 点击后显示 spinner + 英文状态文案，并在请求结束后恢复或重渲染。
  3) 将 Feishu 配置保存接入进行中反馈：保存按钮执行期间锁定并显示 `Saving...`。
  4) 将 Channels 与 AI 关键操作接入进行中反馈：频道启停/保存/清空，Provider 保存/删除，主模型切换均加入执行态与恢复逻辑。
  5) Mission 区新增 `missionTimeline` 状态机与渲染函数，写入固定时间线卡片，并在 `missionAction/startMissionProgress` 流程中持续推送阶段、状态与完成结果。
  6) 执行 `npm run build` 与 `npm test`，确认改动无编译或回归问题。
- 交付成果:
  1) 多模块按钮（OpenClaw/Feishu/Channels/AI）已具备统一“执行中”反馈与防误触体验。
  2) Mission 面板新增“Mission Task Timeline”卡片，包含任务阶段、运行状态、开始/结束时间与耗时，并在任务期间实时刷新。
  3) Mission 完成与失败均会写入时间线结果，用户可直观看到任务是否真正完成。
- 变更清单:
  - `openclaw-guard/src/web-ui.ts`
  - `worklogs/codex-work-logs.md`
- 提交来源(openclaw-course): repo=`e:\openclaw-course`; branch=`main`; head=`fe85f95`; ahead/behind=`ahead 1`
- 提交来源(openclaw-feishu): repo=`e:\openclaw-course\openclaw-feishu`; branch=`main`; head=`708fe4a`; ahead/behind=`ahead 1`
- 验证结果:
  1) 已通过 `npm run build`（openclaw-guard）。
  2) 已通过 `npm test`（openclaw-guard，36/36）。
- 后续建议:
  1) 可将按钮加载文案进一步国际化（zh-CN/en）以匹配现有多语言混合页面。
  2) 可在 Mission 时间线中追加“阶段事件列表”（例如 install/sync/start 每一步时间点）以便排障追踪。

## [2026-03-01 19:16] Mission 端口改造与 Web UI 操作进行中反馈增强 [TASK-20260301-005]

- 任务来源: 用户指派（Mission 端口改为 8089，并为按钮操作增加“加载中/任务进行中”与真实状态收敛反馈）。
- 仓库范围: openclaw-course
- 指派时间: 2026-03-01 19:09
- 开始时间: 2026-03-01 19:10
- 提交时间: 2026-03-01 19:16
- 任务目标:
  1) 将 Mission 默认端口统一改为 `8089`，避免与常见本地开发端口冲突。
  2) 为 Dashboard 服务按钮与 Mission 操作按钮增加进行中状态、重复点击防护与状态轮询，直到检测到真实目标状态再结束。
- 执行过程:
  1) 核对并确认 `openclaw-guard/src/mission-control.ts` 默认端口为 `8089`，并同步 README 默认端口说明。
  2) 重构 `openclaw-guard/src/web-ui.ts` 的 `svcAction` 流程：增加 `svcBusy` 锁、激活按钮 spinner、`/api/service/status` 轮询确认（start/restart=running，stop=stopped）、超时提示与状态恢复。
  3) 重构 Mission 面板动作流：增加 `missionBusy` 锁、为各动作按钮增加 ID 与运行态文案、行动中周期刷新 mission status 与 logs、`start/stop/restart` 增加目标状态轮询确认后再结束。
  4) 增强 `missionHealth()` 按钮反馈，执行期间显示 `Checking...`，完成后恢复按钮文案并输出结果。
  5) 修复替换过程中受编码影响的 5 处字符串结束引号缺失问题，确保 TypeScript 可编译。
- 交付成果:
  1) Mission 默认端口已为 `8089`，文档默认值同步更新。
  2) Dashboard 服务操作按钮具备“进行中 + 真实状态确认 + 防重复点击”能力。
  3) Mission 操作具备“安装/同步/启动/重启/停止”的任务进行中反馈、实时状态与日志刷新、目标状态收敛确认。
  4) Health 按钮具备执行中反馈，避免无响应感知。
- 变更清单:
  - `openclaw-guard/src/mission-control.ts`
  - `openclaw-guard/src/web-ui.ts`
  - `openclaw-guard/README.md`
  - `worklogs/codex-work-logs.md`
- 提交来源(openclaw-course): repo=`e:\openclaw-course`; branch=`main`; head=`fe85f95`; ahead/behind=`ahead 1`
- 提交来源(openclaw-feishu): repo=`e:\openclaw-course\openclaw-feishu`; branch=`main`; head=`708fe4a`; ahead/behind=`ahead 1`
- 验证结果:
  1) 已通过 `npm run build`（openclaw-guard）。
  2) 已通过 `npm test`（openclaw-guard，36/36）。
- 后续建议:
  1) 可在 Mission 面板增加“当前任务时间轴”小组件（开始时间、阶段、结束时间）进一步强化进度可视化。
  2) 可将 Mission 轮询超时阈值暴露为配置项，按机器性能调优。

## [2026-03-01 17:17] 实施 Mission `--prod` 与 `/api/mission/*` 最小鉴权 [TASK-20260301-004]

- 任务来源: 用户指派（继续执行两项任务：`mission start --prod` + Mission API 最小鉴权）。
- 仓库范围: openclaw-course
- 指派时间: 2026-03-01 16:58
- 开始时间: 2026-03-01 17:00
- 提交时间: 2026-03-01 17:17
- 任务目标:
  1) 为 Mission 启动链路增加 `--prod`，实现自动 `build + start` 与 PID/元数据管理。
  2) 为 `/api/mission/*` 增加最小鉴权，默认仅允许本地回环，远程调用需 token。
- 执行过程:
  1) 对齐 `mission-control.ts` 新签名，修复 `start/restart` 参数类型并补齐子进程 PID 安全处理。
  2) 在 CLI `mission` 命令增加 `start --prod`、`restart --prod`，并新增 `credentials`、`reset-password` 便于找回/重置 Mission 登录密码。
  3) 在 `server.ts` 增加 Mission API 访问控制：本地回环地址放行；远程请求需 `OPENCLAW_GUARD_MISSION_TOKEN`，支持 `X-Mission-Token` / `Authorization: Bearer` / `mission_token` 查询参数。
  4) 在 Web UI Mission 面板增加 `Start PROD / Restart PROD` 操作按钮，并增加 Mission Token 本地保存与请求头自动透传。
  5) 修复过程里出现的编码与字符串损坏问题，恢复 `index.ts`、`web-ui.ts` 可编译状态并去除 BOM，确保 `tsx` 命令可执行。
  6) 更新 README，补充 `--prod`、Mission API 鉴权规则、密码读取与重置命令。
- 交付成果:
  1) `mission start --prod` 与 `mission restart --prod` 已可用（自动 build + start）。
  2) `/api/mission/*` 已具备最小鉴权（loopback 免 token，远程必须 token）。
  3) CLI 已支持密码读取与重置：`mission credentials`、`mission reset-password`。
  4) Web UI 已支持 Mission Token 配置与 PROD 模式启动/重启。
- 变更清单:
  - `openclaw-guard/src/mission-control.ts`
  - `openclaw-guard/src/index.ts`
  - `openclaw-guard/src/server.ts`
  - `openclaw-guard/src/web-ui.ts`
  - `openclaw-guard/README.md`
  - `worklogs/codex-work-logs.md`
- 提交来源(openclaw-course): repo=`e:\openclaw-course`; branch=`main`; head=`fe85f95`; ahead/behind=`ahead 1`
- 提交来源(openclaw-feishu): repo=`e:\openclaw-course\openclaw-feishu`; branch=`main`; head=`708fe4a`; ahead/behind=`ahead 1`
- 验证结果:
  1) 已通过 `npm run build`（openclaw-guard）。
  2) 已通过 `npm test`（openclaw-guard，36/36）。
  3) 已通过 `npx tsx src/index.ts mission --help`，确认包含 `start/restart` 的 `--prod` 选项。
  4) 已通过 `npx tsx src/index.ts mission status` 与 `mission credentials`。
  5) 已通过本地 API 冒烟：`/api/mission/status` 返回 `200`。
- 后续建议:
  1) 可在 `server.test.ts` 增加远程 token 鉴权单测（mock `remoteAddress`）以防回归。
  2) 若计划公网暴露 Guard Web，请配合反向代理与 HTTPS，并设置强随机 `OPENCLAW_GUARD_MISSION_TOKEN`。

## [2026-03-01 11:04] 完成 tenacitOS 全面分析并集成至 openclaw-guard [TASK-20260301-003]

- 任务来源: 用户指派（执行两项脚本增强 + 分析 tenacitOS + 全面集成到 openclaw-guard）。
- 仓库范围: both
- 指派时间: 2026-03-01 10:40
- 开始时间: 2026-03-01 10:41
- 提交时间: 2026-03-01 11:04
- 任务目标: 完成两项自动化能力（日志自动插入、zh-CN 输出），并将 tenacitOS 以全功能桥接方式集成到 openclaw-guard。
- 执行过程:
  1) 升级 `worklogs/scripts/collect-recent-14.ps1`，新增 `-Language`、`-InsertIntoLog`、`-LogPath`、`-TaskId` 参数。
  2) 对脚本进行回归，修复 Task 匹配与中文输出细节，验证可把摘要自动写入指定任务块。
  3) 克隆并扫描 `tenacitOS` 仓库，提取技术栈、路由、数据存储、风险点和运维特征。
  4) 在 `openclaw-guard` 新增 Mission Control 管理模块，提供安装/同步/启动/停止/重启/日志/健康检查能力。
  5) 接入 CLI 命令、Web API、Web 管理面（新增 `🦞 Mission` 标签），实现一体化操作路径。
  6) 补充分析与集成文档至 `worklogs/`，并执行 `build + test` 验证。
  7) 执行 `collect-recent-14.ps1 -Language zh-CN -InsertIntoLog`，验证默认可写入最新任务块。
- 交付成果:
  1) `collect-recent-14.ps1` 支持中英输出与一键回写日志。
  2) tenacitOS 完整分析文档与集成手册已落盘。
  3) openclaw-guard 已具备 tenacitOS 全生命周期管理与 Web 入口。
- 变更清单:
  - `worklogs/scripts/collect-recent-14.ps1`
  - `worklogs/tenacitos-full-analysis-20260301.md`
  - `worklogs/openclaw-guard-tenacitos-integration-guide-20260301.md`
  - `openclaw-guard/src/mission-control.ts`
  - `openclaw-guard/src/index.ts`
  - `openclaw-guard/src/server.ts`
  - `openclaw-guard/src/web-ui.ts`
  - `openclaw-guard/src/service-mgr.ts`
  - `openclaw-guard/src/__tests__/server.test.ts`
  - `openclaw-guard/README.md`
  - `worklogs/codex-work-logs.md`
- 提交来源(openclaw-course): repo=`e:\openclaw-course`; branch=`main`; head=`fe85f95`; ahead/behind=`ahead 1`
- 提交来源(openclaw-feishu): repo=`e:\openclaw-course\openclaw-feishu`; branch=`main`; head=`708fe4a`; ahead/behind=`ahead 1`
- 验证结果:
  - 已验证: `npm run build`（openclaw-guard）通过。
  - 已验证: `npm test`（openclaw-guard）36/36 通过。
  - 已验证: `npx tsx src/index.ts mission status`、`mission health` 正常响应。
  - 已验证: `collect-recent-14.ps1 -Language zh-CN -InsertIntoLog -TaskId TASK-20260301-002` 在真实日志中执行成功。
  - 已验证: `collect-recent-14.ps1 -Language zh-CN -InsertIntoLog` 默认写入最新任务（TASK-20260301-003）成功。
- 后续建议:
  1) 如需生产稳定运行，建议新增 `mission start --prod`（自动 `npm run build` + `npm run start`）模式。
  2) 建议为 `/api/mission/*` 增加鉴权（最少 token 或本地回环限制）。

### 项目近况基线（最近 14 批，双仓合并）

- 统计时间: 2026-03-01 11:04
- 统计口径: openclaw-course + openclaw-feishu 合并后按提交时间降序取 14 条。
- 时间窗口: 2026-02-10 15:30 至 2026-02-26 21:23 （北京时间）
- 两仓占比: openclaw-course 10/14 (71.4%); openclaw-feishu 4/14 (28.6%)
- 主题聚类:
  1) 课程与文档: 4/14 (28.6%)
  1) 其他: 3/14 (21.4%)
  1) OpenClaw Guard: 3/14 (21.4%)
  1) 飞书上游同步: 3/14 (21.4%)
  1) 飞书定制能力: 1/14 (7.1%)
- 风险与待办:
  1) openclaw-course 分支 main...origin/main（ahead=1, behind=0），建议同步远端。
  1) openclaw-course 存在未跟踪文件 10 个，建议确认是否纳入版本控制。
  1) openclaw-feishu 存在未跟踪文件 1 个，建议确认是否纳入版本控制。
- 最近 14 批提交摘要（提交级，不展开逐文件 diff）:
  - 2026-02-26 21:23 | openclaw-course | fe85f95 | KingMo | feat(openclaw-guard): Web管理界面增强 - 测试套件、OAuth调研、一键启动
  - 2026-02-26 18:22 | openclaw-feishu | 708fe4a | KingMo | chore: merge upstream @openclaw/feishu v2026.2.25
  - 2026-02-23 18:42 | openclaw-course | 8159494 | KingMo | docs(LabC): 添加飞书技能完整权限配置指南
  - 2026-02-23 17:24 | openclaw-course | 5961dfe | KingMo | feat(memory): 添加南柯小传整理版，优化记忆模块结构
  - 2026-02-23 15:51 | openclaw-course | 07c66e8 | KingMo | docs: Day04增加SOUL.md与IDENTITY.md对比章节，新增热加载机制补充文档
  - 2026-02-23 11:45 | openclaw-course | 8bbd8ed | KingMo | feat: openclaw-guard v2.0.0 + LabF course section - openclaw-guard: add config/channels/models/service-mgr/server/web-ui/openclaw modules - openclaw-guard: fix config path resolution for ~/.openclaw - add LabF: model config and cost optimization course - gitignore: add openclaw-feishu/
  - 2026-02-23 11:43 | openclaw-feishu | bf0c922 | KingMo | feat: merge upstream v2026.2.22 changes - add streaming card, persistent dedup, external keys, send result - update bot, channel, reply-dispatcher, config-schema, monitor, send, types - preserve custom: probe-cache, probe, voice-transcribe
  - 2026-02-22 19:43 | openclaw-course | a3206c6 | KingMo | 新增开发机部署安全章节(Day11) + OpenClaw Guard权限管理工具
  - 2026-02-22 18:01 | openclaw-course | c04a8e1 | KingMo | 同步更新搜索索引：包含课程内容优化后的新增章节
  - 2026-02-22 17:51 | openclaw-course | 2cb8acc | KingMo | 新增：Day 6 加入 ClawMate 角色伴侣完整案例，Day 4 延伸阅读补充 ClawMate 引用
  - 2026-02-22 17:38 | openclaw-course | b30b64b | KingMo | feat: 结合 OpenClaw 最新热点优化课程内容
  - 2026-02-22 17:34 | openclaw-course | 04855e4 | KingMo | feat: 初始提交 - OpenClaw 实战训练营课程全部内容
  - 2026-02-10 19:54 | openclaw-feishu | cab0465 | 南柯 | sync: merge official @openclaw/feishu v2026.2.9 with custom extensions
  - 2026-02-10 15:30 | openclaw-feishu | ec81f9f | 南柯 | feat: add Windows bat backup script + cross-format restore support
## [2026-03-01 10:39] 新增双仓近况自动汇总脚本 collect-recent-14 [TASK-20260301-002]

- 任务来源: 用户确认“可以”，同意实现自动化脚本建议。
- 仓库范围: both
- 指派时间: 2026-03-01 10:35
- 开始时间: 2026-03-01 10:36
- 提交时间: 2026-03-01 10:39
- 任务目标: 新增 `worklogs/scripts/collect-recent-14.ps1`，自动生成 `openclaw-course + openclaw-feishu` 最近 14 批提交基线摘要。
- 执行过程:
  1) 检查 `worklogs/scripts` 目录状态，确认目录不存在。
  2) 新建脚本并实现：双仓提交合并、TopN 截断、时间窗口、仓库占比、主题聚类、风险项输出。
  3) 首次运行发现中文字符串在当前 PowerShell 编码环境下导致解析错误。
  4) 将脚本改为 ASCII 输出并保留中文提交主题原文，二次执行通过。
  5) 验证输出包含最近 14 批提交与风险项，并回写本次交付记录。
- 交付成果:
  1) 新增可执行脚本 `worklogs/scripts/collect-recent-14.ps1`。
  2) 脚本支持参数：`-TopN`、`-PrimaryRepoPath`、`-FeishuRepoPath`、`-OutputPath`。
  3) 脚本默认范围为双仓并输出 Markdown 片段，可直接粘贴到工作日志。
- 变更清单:
  - `worklogs/scripts/collect-recent-14.ps1`
  - `worklogs/codex-work-logs.md`
- 提交来源(openclaw-course): repo=`e:\openclaw-course`; branch=`main`; head=`fe85f95`; ahead/behind=`ahead 1`
- 提交来源(openclaw-feishu): repo=`e:\openclaw-course\openclaw-feishu`; branch=`main`; head=`708fe4a`; ahead/behind=`ahead 1`
- 验证结果:
  - 已验证: `powershell -NoProfile -ExecutionPolicy Bypass -File worklogs/scripts/collect-recent-14.ps1 -TopN 14` 执行成功。
  - 已验证: 输出含时间窗口、两仓占比、主题聚类、风险待办、14 条提交摘要。
  - 已验证: 可识别仓库状态并提示 ahead/behind 与未跟踪文件。
- 后续建议:
  1) 如需中文固定文案，可后续增加 `-Language zh-CN` 参数并统一 UTF-8 执行环境。
  2) 如需直接写入日志，可追加 `-OutputPath` 到临时文件后再由人工审阅合并。

### 项目近况基线（最近 14 批，双仓合并）

- 统计时间: 2026-03-01 11:01
- 统计口径: openclaw-course + openclaw-feishu 合并后按提交时间降序取 14 条。
- 时间窗口: 2026-02-10 15:30 至 2026-02-26 21:23 （北京时间）
- 两仓占比: openclaw-course 10/14 (71.4%); openclaw-feishu 4/14 (28.6%)
- 主题聚类:
  1) 课程与文档: 4/14 (28.6%)
  1) 其他: 3/14 (21.4%)
  1) OpenClaw Guard: 3/14 (21.4%)
  1) 飞书上游同步: 3/14 (21.4%)
  1) 飞书定制能力: 1/14 (7.1%)
- 风险与待办:
  1) openclaw-course 分支 main...origin/main（ahead=1, behind=0），建议同步远端。
  1) openclaw-course 存在未跟踪文件 11 个，建议确认是否纳入版本控制。
  1) openclaw-feishu 存在未跟踪文件 1 个，建议确认是否纳入版本控制。
- 最近 14 批提交摘要（提交级，不展开逐文件 diff）:
  - 2026-02-26 21:23 | openclaw-course | fe85f95 | KingMo | feat(openclaw-guard): Web管理界面增强 - 测试套件、OAuth调研、一键启动
  - 2026-02-26 18:22 | openclaw-feishu | 708fe4a | KingMo | chore: merge upstream @openclaw/feishu v2026.2.25
  - 2026-02-23 18:42 | openclaw-course | 8159494 | KingMo | docs(LabC): 添加飞书技能完整权限配置指南
  - 2026-02-23 17:24 | openclaw-course | 5961dfe | KingMo | feat(memory): 添加南柯小传整理版，优化记忆模块结构
  - 2026-02-23 15:51 | openclaw-course | 07c66e8 | KingMo | docs: Day04增加SOUL.md与IDENTITY.md对比章节，新增热加载机制补充文档
  - 2026-02-23 11:45 | openclaw-course | 8bbd8ed | KingMo | feat: openclaw-guard v2.0.0 + LabF course section - openclaw-guard: add config/channels/models/service-mgr/server/web-ui/openclaw modules - openclaw-guard: fix config path resolution for ~/.openclaw - add LabF: model config and cost optimization course - gitignore: add openclaw-feishu/
  - 2026-02-23 11:43 | openclaw-feishu | bf0c922 | KingMo | feat: merge upstream v2026.2.22 changes - add streaming card, persistent dedup, external keys, send result - update bot, channel, reply-dispatcher, config-schema, monitor, send, types - preserve custom: probe-cache, probe, voice-transcribe
  - 2026-02-22 19:43 | openclaw-course | a3206c6 | KingMo | 新增开发机部署安全章节(Day11) + OpenClaw Guard权限管理工具
  - 2026-02-22 18:01 | openclaw-course | c04a8e1 | KingMo | 同步更新搜索索引：包含课程内容优化后的新增章节
  - 2026-02-22 17:51 | openclaw-course | 2cb8acc | KingMo | 新增：Day 6 加入 ClawMate 角色伴侣完整案例，Day 4 延伸阅读补充 ClawMate 引用
  - 2026-02-22 17:38 | openclaw-course | b30b64b | KingMo | feat: 结合 OpenClaw 最新热点优化课程内容
  - 2026-02-22 17:34 | openclaw-course | 04855e4 | KingMo | feat: 初始提交 - OpenClaw 实战训练营课程全部内容
  - 2026-02-10 19:54 | openclaw-feishu | cab0465 | 南柯 | sync: merge official @openclaw/feishu v2026.2.9 with custom extensions
  - 2026-02-10 15:30 | openclaw-feishu | ec81f9f | 南柯 | feat: add Windows bat backup script + cross-format restore support
## [2026-03-01 10:34] 实施工作日志与项目近况方案（纳入 openclaw-feishu） [TASK-20260301-001]

- 任务来源: 用户指派（基于 `worklogs/Codex-PLAN-202603011028.md` 的实施请求）。
- 仓库范围: both
- 指派时间: 2026-03-01 10:28
- 开始时间: 2026-03-01 10:32
- 提交时间: 2026-03-01 10:34
- 任务目标: 落地日志治理规则，并产出 `openclaw-course + openclaw-feishu` 联合“最近 14 批提交”近况基线。
- 执行过程:
  1) 核验 `worklogs/codex-work-logs.md` 当前状态，确认为空文件。
  2) 核验本机时区与时间格式，确认使用 `China Standard Time` 并统一到分钟。
  3) 分别提取 `openclaw-course` 与 `openclaw-feishu` 的分支状态与提交历史。
  4) 合并两仓提交并按时间降序取最近 14 条，计算时间窗口与仓库占比。
  5) 将“固定准则 + 模板 + 更新机制 + 首条记录 + 近况基线”写入本日志文件。
- 交付成果:
  1) 建立可复用日志准则，覆盖任务字段、时间标准、仓库范围、降级容错规则。
  2) 完成首条任务记录（含分钟级时间戳）。
  3) 产出双仓联合最近 14 批提交基线（含时间窗口、占比、主题聚类、风险待办）。
- 变更清单:
  - `worklogs/codex-work-logs.md`
- 提交来源(openclaw-course): repo=`e:\openclaw-course`; branch=`main`; head=`fe85f95`; ahead/behind=`ahead 1`
- 提交来源(openclaw-feishu): repo=`e:\openclaw-course\openclaw-feishu`; branch=`main`; head=`708fe4a`; ahead/behind=`ahead 1`
- 验证结果:
  - 已验证: 两仓 `git status --short --branch` 可正常返回分支与 ahead 状态。
  - 已验证: 两仓提交合并后可稳定得到最近 14 条，统计结果为 `openclaw-course=10`、`openclaw-feishu=4`。
  - 未验证: 尚未实现自动化脚本化写入，本次为人工记录落地。
- 后续建议:
  1) 后续可新增 `worklogs/scripts/collect-recent-14.ps1`，自动生成双仓近况摘要并减少手工误差。
  2) 在每次发版前补充“ahead/behind 清零检查”，避免本地提交长期未推送。

### 项目近况基线（最近 14 批，双仓合并）

- 统计时间: 2026-03-01 10:34
- 统计口径: `openclaw-course + openclaw-feishu` 合并后按提交时间降序取 14 条。
- 时间窗口: 2026-02-10 15:30 至 2026-02-26 21:23（北京时间）
- 两仓占比: `openclaw-course 10/14 (71.4%)`；`openclaw-feishu 4/14 (28.6%)`
- 主题聚类:
  1) 课程与文档建设持续推进，重点覆盖 LabC、LabF、Day04、Day11。
  2) `openclaw-guard` 进入工程化增强阶段，包含配置治理、Web 管理界面、测试与 OAuth 可行性调研。
  3) `openclaw-feishu` 以“同步上游 + 保留定制能力”为主线，合并了流式卡片、去重、外部密钥与语音扩展相关改造。
- 风险与待办:
  1) `openclaw-course` 与 `openclaw-feishu` 两仓均为 `main...origin/main [ahead 1]`，存在未推送提交。
  2) `openclaw-course` 当前存在未跟踪项：`course-web/start.bat`、`worklogs/`。
  3) 若后续需要纳入 `openclaw` 官方仓，应在记录中显式声明统计口径切换时间点。
- 最近 14 批提交摘要（提交级，不展开逐文件 diff）:
  - 2026-02-26 21:23 | openclaw-course | fe85f95 | feat(openclaw-guard): Web 管理界面增强（测试套件、OAuth 调研、一键启动）
  - 2026-02-26 18:22 | openclaw-feishu | 708fe4a | chore: merge upstream @openclaw/feishu v2026.2.25
  - 2026-02-23 18:42 | openclaw-course | 8159494 | docs(LabC): 飞书技能完整权限配置指南
  - 2026-02-23 17:24 | openclaw-course | 5961dfe | feat(memory): 南柯小传整理版与记忆结构优化
  - 2026-02-23 15:51 | openclaw-course | 07c66e8 | docs: Day04 增加 SOUL/IDENTITY 对比与热加载补充
  - 2026-02-23 11:45 | openclaw-course | 8bbd8ed | feat: openclaw-guard v2.0.0 + LabF 章节 + 配置路径修复
  - 2026-02-23 11:43 | openclaw-feishu | bf0c922 | feat: merge upstream v2026.2.22（流式卡片/去重/外部密钥等）
  - 2026-02-22 19:43 | openclaw-course | a3206c6 | 新增 Day11 开发机部署安全章节 + OpenClaw Guard 工具
  - 2026-02-22 18:01 | openclaw-course | c04a8e1 | 同步更新课程搜索索引
  - 2026-02-22 17:51 | openclaw-course | 2cb8acc | Day6 增加 ClawMate 案例，Day4 补充引用
  - 2026-02-22 17:38 | openclaw-course | b30b64b | 结合 OpenClaw 热点优化课程内容
  - 2026-02-22 17:34 | openclaw-course | 04855e4 | 初始提交：实战训练营课程全量内容
  - 2026-02-10 19:54 | openclaw-feishu | cab0465 | sync: merge official @openclaw/feishu v2026.2.9
  - 2026-02-10 15:30 | openclaw-feishu | ec81f9f | feat: Windows bat 备份脚本 + 跨格式恢复支持


