# tenacitOS 深度分析与 openclaw-guard 对比报告（2026-03-07）

## 1. 任务目标与分析口径

本报告用于回答一个明确问题：

1. `https://github.com/carlosazaustre/tenacitOS` 这个项目在工程上到底做了什么、边界在哪里、风险在哪里？
2. 与当前项目 `openclaw-guard` 相比，能力重叠、能力缺口、最佳集成方式是什么？
3. 在不重复造轮子的前提下，给出可执行的演进建议。

分析口径：

- 以 tenacitOS 主仓源码为准（本地快照 commit：`b021506`，2026-02-21）。
- 以当前工作区 `openclaw-guard` 源码现状为准（本地 `main` 分支当前版本）。
- 输出偏“架构决策文档”，不是功能宣传稿。

---

## 2. 样本快照（可复核）

## 2.1 tenacitOS（上游）

- 仓库：`https://github.com/carlosazaustre/tenacitOS`
- 本地分析目录：`e:/openclaw-course/.tmp/tenacitOS-main`
- HEAD：`b0215064fe0678dcca8c68a30617a47312317086`
- 最近提交时间：`2026-02-21 13:21:45 +0000`
- 代码规模（本次扫描）：
  - `src` 文件数：`151`
  - Next App Router API 路由文件（`route.ts`）数：`38`
  - 运行依赖：`15`
  - 开发依赖：`8`

## 2.2 openclaw-guard（当前项目）

- 路径：`e:/openclaw-course/openclaw-guard`
- 代码规模（本次扫描）：
  - `src` 文件数：`17`
  - 测试文件数：`4`
  - 运行依赖：`3`
  - 开发依赖：`5`

---

## 3. tenacitOS 架构与能力深拆

## 3.1 定位与运行模型

tenacitOS 是一个“贴着 OpenClaw 工作目录运行的全栈控制台”，核心模型是：

- 前后端同仓：Next.js App Router（页面 + API 路由）
- 数据来源以 OpenClaw 本地数据为主（`openclaw.json`、workspace、memory、logs）
- 本地补充存储：`data/*.json` + SQLite（`usage-tracking.db`）

关键特征：

1. 功能密集：系统监控、代理面板、成本看板、Cron 管理、活动流、文件/记忆浏览、全局检索、通知、终端、3D 办公室。
2. 运维上偏 Linux：大量 API 路由通过系统命令和 OpenClaw CLI 取数（`openclaw`, `systemctl`, `pm2`, `df`, `top`, `curl` 等）。
3. 是“富运营台”而非“轻量守护器”。

## 3.2 核心技术栈

- 框架：Next.js `16.1.6`, React `19.2.3`
- UI/可视化：Tailwind v4, Recharts, Monaco
- 3D 场景：`@react-three/fiber`, `@react-three/drei`, `@react-three/rapier`, `three`
- 数据：`better-sqlite3`

工程含义：

1. 可视化与交互能力强。
2. 依赖面较宽，升级和安全补丁面也更大。

## 3.3 数据与接口设计

数据平面分三类：

1. OpenClaw 原生数据（主数据源）：
  - `OPENCLAW_DIR/openclaw.json`
  - `OPENCLAW_DIR/workspace*`
2. tenacitOS 运维数据（本地 JSON）：
  - `data/activities.json`, `data/cron-jobs.json`, `data/notifications.json`, `data/tasks.json` 等
3. 成本统计数据（SQLite）：
  - `data/usage-tracking.db`

接口平面（38 个 API 路由）覆盖读写两大类：

- 读：agents、sessions、system、analytics、reports、search、browse、logs、health
- 写：files write/upload/delete/mkdir、cron run/update/delete、notifications patch/delete、actions

结论：tenacitOS 不是“只读看板”，而是可对工作区与运行状态执行实际变更。

## 3.4 安全模型（源码层观察）

正向设计：

1. 中间件统一鉴权（`mc_auth` cookie + `AUTH_SECRET`），未登录 API 返回 401，页面跳转 login。
2. 登录接口有 IP 维度失败限流（`MAX_ATTEMPTS=5`，锁定 15 分钟）。
3. Browser Terminal 有 allowlist + blocklist，显式封禁 `env/curl/wget/node/python` 等高风险命令。
4. 文件写入类接口使用 `path.resolve + startsWith(base)` 做路径穿越防护（多处）。

仍需注意的工程风险：

1. 认证是单密码 + cookie，未内建多用户/RBAC/2FA。
2. 部分 API 存在“运维动作级”能力（如 quick actions 的 `clear-temp`、`restart-gateway`），一旦控制台暴露面过大，影响面较大。
3. 运行高度依赖宿主机命令生态，跨平台一致性（尤其 Windows）较弱。
4. 无内置自动化测试套件（本次扫描未发现 test/spec 文件），升级回归主要靠手测。

## 3.5 可扩展性与路线图成熟度

`ROADMAP.md` 显示项目定位是长期演进平台（含周级阶段规划、3D 办公室、智能建议引擎、多 Agent 编排等），说明其目标已超出“单一控制台”范畴，趋向“Agent Operations 平台”。

---

## 4. openclaw-guard 当前能力画像

当前 `openclaw-guard` 的核心是“治理层 + 编排入口”，而不是“重型可视化平台”。

## 4.1 当前主轴能力

1. 安全治理：审计、profile、加固脚本。
2. OpenClaw 管理：安装/更新、service 控制、配置读写。
3. 渠道/模型治理：飞书配置、AI provider + primary/fallbacks。
4. Mission（tenacitOS）编排：
  - `mission install/sync/bootstrap/start/stop/restart/logs/health`
  - 新增 `--prod`（自动 build + start + PID/Meta 管理）
  - 默认端口 `8089`（避免常见端口冲突）
5. Web 入口：轻量内嵌 HTTP 面板（默认 `18088`）。

## 4.2 对 tenacitOS 的当前集成方式

当前实现是“Sidecar 编排而非重写”：

1. Guard 负责 tenacitOS 的生命周期（安装、同步、环境初始化、运行状态、日志、健康检查）。
2. Guard 暴露 `/api/mission/*` 作为控制面 API。
3. Mission API 增加最小鉴权：
  - 回环地址默认放行
  - 非回环需 `OPENCLAW_GUARD_MISSION_TOKEN`
  - 支持 `X-Mission-Token` / `Authorization: Bearer` / query token

工程价值：

1. 保留 tenacitOS 原生功能密度。
2. 将“可变更风险”集中在 Guard 管理入口做约束。
3. 避免把 Next.js 大体量功能重写进 Guard。

## 4.3 当前短板（相对 tenacitOS）

1. Guard 自身 UI 不是数据平台型 UI（更偏控制台）。
2. Mission API 之外的 Guard API 当前无统一鉴权（主要依赖本机使用假设）。
3. Mission 集成测试缺失（当前测试未覆盖 mission-control 模块）。
4. 缺少“上游版本锁定 + 升级回滚”策略（目前以 `git pull` 为主）。

---

## 5. tenacitOS vs openclaw-guard 对比矩阵

| 维度 | tenacitOS | openclaw-guard | 结论 |
|---|---|---|---|
| 产品定位 | 运营与观测平台（Rich Dashboard） | 治理与编排工具（Control Plane） | 定位互补，不冲突 |
| 技术体量 | Next.js 全栈 + 3D + SQLite，151 源文件 | Node CLI + 轻量 Web，17 源文件 | Guard 更轻，tenacitOS 更重 |
| 运维能力 | 监控、活动、成本、文件、Cron、终端 | 安全审计、配置治理、服务编排 | 组合使用优于二选一 |
| 对 OpenClaw 的耦合 | 深度读取 workspace/config/sessions | 深度写配置 + 管理 gateway/mission | 二者都深耦合，但关注点不同 |
| 安全默认面 | 密码登录 + cookie + 限流 | Mission API 有回环/Token门槛 | Guard 在“控制面约束”更可控 |
| 跨平台 | 偏 Linux 最优 | 明确支持 Win/macOS/Linux | Guard 更适合作为统一入口 |
| 测试覆盖 | 未见测试目录 | 有基础测试但未覆盖 mission | 两者都需加强自动化回归 |
| 升级策略 | 上游仓库快速演进 | 本地可做版本钉住与灰度 | 应由 Guard 承担版本治理 |

---

## 6. 集成结论（建议保留“分层架构”）

建议继续采用并强化当前架构：

- **Guard = 管理平面（Control Plane）**
- **tenacitOS = 运营平面（Operations UI）**

不建议“把 tenacitOS 全部重写进 Guard”，原因：

1. 工程复杂度陡增（依赖、构建、跨平台、前端体量）。
2. 上游演进速度快，重写会造成持续追赶成本。
3. 已有 sidecar 方式能覆盖 90% 业务目标，ROI 更高。

---

## 7. 建议的下一步改造（按优先级）

## P0（立即）

1. Mission 版本锁定机制  
  在 Guard 增加可选参数：
  - `mission install --ref <tag|commit>`
  - `mission sync --ref <tag|commit>`
  避免 `git pull` 引入不可控变化。

2. Mission 回滚机制  
  在 `~/.openclaw/guard/mission-control/` 记录上一版本 commit，支持一键 rollback。

3. Guard API 总体鉴权  
  目前仅 `/api/mission/*` 有最小鉴权，建议给 `openclaw-guard` Web API 增加全局 Token 或本机绑定策略。

## P1（短期）

1. Mission 集成测试补齐  
  最少覆盖：
  - install/sync/bootstrap/start/stop/restart
  - PID 与端口一致性
  - `/api/mission/*` 鉴权分支

2. 健康探测增强  
  除 `/api/health` 外补充：
  - 首屏关键 API 探针（如 `/api/agents`, `/api/costs`）
  - Node 进程与日志关键字联合判断

3. 运行配置预检  
  启动前校验 `.env.local` 必需项、`OPENCLAW_DIR` 是否存在、数据模板是否齐全。

## P2（中期）

1. 在 Guard UI 增加 “Mission 兼容性报告”：
  - 上游 commit
  - 本地 Node 版本兼容
  - 关键 API 连通性
  - 风险提示（命令依赖、权限要求）

2. 增加“受控代理”模式：
  - 对 Mission 的危险动作（如清理临时文件、重启服务）做开关白名单
  - 通过 Guard 统一授权策略下发

---

## 8. 最终结论（给决策者）

1. tenacitOS 是一个成熟的“OpenClaw 运维控制台上层应用”，功能密度高、可观测性强。
2. openclaw-guard 的价值不在重做 UI，而在“统一治理、跨平台编排、安全约束、生命周期管理”。
3. 当前“Guard 编排 + tenacitOS sidecar”是正确方向，应继续强化版本治理、鉴权、测试与回滚能力。

---

## 9. 主要参考来源

## 上游仓库（tenacitOS）

1. https://github.com/carlosazaustre/tenacitOS
2. https://github.com/carlosazaustre/tenacitOS/blob/main/README.md
3. https://github.com/carlosazaustre/tenacitOS/blob/main/package.json
4. https://github.com/carlosazaustre/tenacitOS/blob/main/docs/COST-TRACKING.md
5. https://github.com/carlosazaustre/tenacitOS/blob/main/src/middleware.ts
6. https://github.com/carlosazaustre/tenacitOS/blob/main/src/app/api/auth/login/route.ts
7. https://github.com/carlosazaustre/tenacitOS/blob/main/src/app/api/terminal/route.ts
8. https://github.com/carlosazaustre/tenacitOS/blob/main/src/app/api/actions/route.ts
9. https://github.com/carlosazaustre/tenacitOS/blob/main/src/app/api/cron/route.ts
10. https://github.com/carlosazaustre/tenacitOS/blob/main/src/lib/usage-collector.ts
11. https://github.com/carlosazaustre/tenacitOS/blob/main/src/lib/pricing.ts
12. https://github.com/carlosazaustre/tenacitOS/blob/main/ROADMAP.md

## 本地项目（openclaw-guard）

1. `e:/openclaw-course/openclaw-guard/src/mission-control.ts`
2. `e:/openclaw-course/openclaw-guard/src/server.ts`
3. `e:/openclaw-course/openclaw-guard/src/index.ts`
4. `e:/openclaw-course/openclaw-guard/README.md`

