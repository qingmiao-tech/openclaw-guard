# OpenClaw Guard 状态接口、缓存机制与页面加载耗时分析

- 文档日期: 2026-03-10
- 分析对象: `openclaw-guard` 原生工作台
- 目标: 解释当前部分页面点击后长时间停留在“正在加载…”状态的技术原因，梳理前端调用逻辑、后端业务处理链、缓存设计，以及“为什么理论上文件读取很快，但页面仍然慢”。

## 1. 结论摘要

当前页面加载慢，主要不是因为 `openclaw.json`、`env`、通知 JSON 等本地文件读取慢，而是因为多个核心页签会间接触发外部 CLI 命令：

1. `openclaw status --json`
2. `openclaw cron list --json`
3. `openclaw cron status --json`
4. `git status --porcelain` / `git branch --show-current` / 嵌套仓扫描

这些命令的冷启动耗时明显高于普通文件读取，Guard 再在此基础上做二次聚合、成本汇总、活动落盘、通知生成和 DOM 一次性渲染，因此用户看到的是“整页一直加载”，而不是“局部先出来、慢块后补”。

本机这次实测得到的关键结论如下：

1. 读取配置文件和 env 本身基本是毫秒级，不是瓶颈。
2. `openclaw status --json` 是当前最重的基础命令，冷态约 11 到 14 秒，热态仍在 8 秒量级。
3. 驾驶舱、会话、成本三个页面都依赖同一条运行态快照链路，因此会共用同一个慢点。
4. Cron 页慢，根因是它冷态要跑两条命令: `cron list` 和 `cron status`。
5. Git 同步页不算最慢，但在 `.openclaw` 文件很多、嵌套仓较多时，Git 状态扫描会持续抬高首屏耗时。
6. 前端是“等待整批接口完成后一次渲染”，没有渐进式渲染，所以慢接口会拖住整个页签。

## 2. 前端页签调用逻辑

前端入口在 `openclaw-guard/web/guard-ui.js`，统一由 `loadActiveTab()` 负责切页。

关键特点:

1. 切换页签时，面板会先被清空成“正在加载…”。
2. 对应页签的 `loadXxx()` 函数会 `await` 其所需的所有接口。
3. 只有当 `await` 完成后，才会调用 `setPanel()` 一次性渲染整个页面。

这意味着:

1. 任何一个慢接口都会阻塞整个页签。
2. 即使某些数据很快返回，也不会先显示局部内容。
3. 用户体感上的加载时间，等于“该页签最慢接口耗时 + 前端字符串拼接和 DOM 注入时间”。

### 2.1 通用请求行为

前端请求封装在 `apiRequest()`:

- 文件: `openclaw-guard/web/guard-ui.js`
- 关键点:
  - 默认超时 `15000 ms`
  - 超时前页面会一直显示“正在加载…”
  - 超时后才报错

这意味着如果后端接口接近 10 到 15 秒，用户会看到长时间转圈或空白等待。

### 2.2 各重点页签依赖的接口

#### 驾驶舱

文件: `openclaw-guard/web/guard-ui.js`

`loadOverview()` 会并发请求:

1. `/api/dashboard/overview`
2. `/api/web-background/status`
3. `/api/cache-prewarm/status`

其中真正决定耗时的是 `/api/dashboard/overview`。

#### 运维

`loadSystem()` 会并发请求:

1. `/api/info`
2. `/api/service/status`
3. `/api/web-background/status`
4. `/api/env`
5. `/api/cache-prewarm/status`

这里大多数接口都很快，但 `/api/info` 内部会调用 `detectOpenClaw()`，因此在 OpenClaw 状态缓存失效时，运维页仍可能出现 2 到 3 秒等待。

#### OpenClaw

`loadOpenClawTab()` 会并发请求:

1. `/api/openclaw/status`
2. `/api/gateway/dashboard`
3. `/api/gateway/token`

其中慢点主要是 `/api/openclaw/status`。

#### 会话

`loadSessions()` 请求:

1. `/api/sessions`

虽然只有一个接口，但它内部会走运行态快照链，冷态非常慢。

#### 成本

`loadCosts()` 请求:

1. `/api/costs`

同样会间接触发运行态快照链，和会话页本质上共用同一瓶颈。

#### Cron

`loadCron()` 请求:

1. `/api/cron-ui`

内部会组合 `openclaw cron list --json` 和 `openclaw cron status --json`，冷态较慢。

#### Git 同步

`loadGitSync()` 并发请求:

1. `/api/git-sync/status`
2. `/api/git-sync/gitignore-preview`

状态链本身有缓存，但冷态仍要做 Git 状态扫描和嵌套仓扫描。

## 3. 后端业务处理流程

后端路由入口在 `openclaw-guard/src/server.ts`。路由本身非常薄，主要是把请求转给各模块函数处理。

### 3.1 `/api/dashboard/overview` 的真实链路

这是当前最关键的慢链路。

调用路径如下:

1. `/api/dashboard/overview`
2. `getDashboardOverview()`
3. `captureSessionOverview()`
4. `getRuntimeSnapshot()`
5. `buildRuntimeSnapshot()`
6. `runOpenClawJson(['status'])`
7. 实际执行 `openclaw status --json`

在命令返回后，Guard 还会继续做这些事:

1. 解析并标准化会话数据
2. 读取旧快照，与新快照做 diff
3. 生成活动事件
4. 把最新快照写入 `latest.json`
5. 把历史快照追加到 `jsonl`
6. 把活动事件追加到 `activity/*.jsonl`
7. 计算成本摘要
8. 把成本摘要写入 `costs/latest.json`
9. 再组合 Agent、记忆文件、通知、系统资源、Gateway 状态，形成驾驶舱最终 JSON

也就是说，驾驶舱并不是“读一个缓存文件就返回”，而是“运行时命令 + 解析 + diff + 多次落盘 + 聚合”。

### 3.2 `/api/sessions` 和 `/api/costs` 为什么也慢

这两个接口都不是简单读静态文件:

1. `/api/sessions` 直接调用 `captureSessionOverview()`
2. `/api/costs` 调用 `captureSessionOverview().costSummary`

因此它们与驾驶舱共用运行态快照链。如果快照缓存刚好失效，三个页面都会同时受到影响。

### 3.3 `/api/openclaw/status` 的真实链路

该接口调用 `detectOpenClaw()`，其内部不是只看一个固定 JSON，而是动态探测本机 OpenClaw 安装状态。典型步骤包括:

1. `npm --version`
2. `npm config get prefix`
3. `where openclaw` 或 `which openclaw`
4. `openclaw --version`
5. `npm view openclaw version`

因此它虽然有缓存，但冷态并不轻。

### 3.4 `/api/cron-ui` 的真实链路

该接口调用 `getCronOverview()`，内部会触发:

1. `getCronSnapshot()`
2. `buildCronSnapshot()`
3. `runOpenClawJson(['cron', 'list'])`
4. `buildCronStatusSummary()`
5. `runOpenClawJson(['cron', 'status'])`

冷态下实际上要等两条 CLI 命令都跑完。

### 3.5 `/api/git-sync/status` 的真实链路

`getGitSyncStatus()` 会构建同步状态，其中包含:

1. `git status --porcelain`
2. `git branch --show-current`
3. `git remote get-url`
4. 扫描变更路径
5. 递归判断是否存在嵌套 Git 仓
6. 生成 stageable 文件列表与 skipped 仓列表
7. 可能追加通知

所以 Git 页不是单纯读 `git-sync.json` 文件。

## 4. 当前缓存机制梳理

### 4.1 Persistent Cache 基础层

文件: `openclaw-guard/src/persistent-cache.ts`

特点:

1. 既有内存缓存，也有磁盘缓存
2. 磁盘缓存目录: `~/.openclaw/guard/state/cache/`
3. 每个 key 单独一个 JSON 文件
4. 支持 `ttlMs`
5. 支持 `staleIfErrorMs`

这层缓存很好，但它只缓存“函数结果”，并不会自动把所有上层聚合都变成静态快照。

### 4.2 OpenClaw 安装状态缓存

文件: `openclaw-guard/src/openclaw.ts`

当前 TTL:

1. 本地安装状态缓存: `15 分钟`
2. npm registry 最新版本缓存: `6 小时`

这解释了为什么:

1. OpenClaw 页冷态可能慢 3 秒左右
2. 但热态通常几乎瞬时

### 4.3 Gateway 服务状态缓存

文件: `openclaw-guard/src/service-mgr.ts`

当前 TTL:

1. `getServiceStatus()` 底层缓存: `2500 ms`

所以 Gateway 状态探测不是当前主要瓶颈。

### 4.4 运行态快照缓存

文件: `openclaw-guard/src/openclaw-runtime.ts`

当前 TTL:

1. `getRuntimeSnapshot()`: `15 秒`
2. `getCronStatusSummary()`: `20 秒`
3. `getCronSnapshot()`: `20 秒`

这是当前最重要的一层缓存。问题不是“没有缓存”，而是:

1. 驾驶舱/会话/成本在缓存 miss 时代价极高
2. TTL 只有 15 秒，用户如果隔一会儿再点，就会重新触发一次重型 CLI

### 4.5 Git 状态缓存

文件: `openclaw-guard/src/git-sync.ts`

当前 TTL:

1. `getGitSyncStatus()`: `15 秒`

Git 页冷态不算最慢，但 `.openclaw` 内容很多时仍会明显抬高等待时间。

### 4.6 启动预热缓存

文件: `openclaw-guard/src/cache-prewarm.ts`

当前预热任务包含:

1. `OpenClaw status`
2. `Gateway service status`
3. `Dashboard overview`
4. `Cron overview`
5. `Git sync status`

这能显著改善“服务刚启动后第一次点击”的体验，但不能解决所有场景:

1. TTL 过期后仍会回到冷态
2. 预热只是在后台先跑一次，不等于永久热缓存

## 5. 本机实测数据

说明:

1. 测试时间: 2026-03-10
2. 平台: Windows
3. 口径:
   - 冷态: 当前进程第一次执行
   - 热态: 紧接着的第二次执行，命中内存或持久化缓存

### 5.1 直接 CLI 命令耗时

| 命令 | 第 1 次 | 第 2 次 |
| --- | ---: | ---: |
| `openclaw.cmd status --json` | 14106 ms | 8079 ms |
| `openclaw.cmd cron list --json` | 3041 ms | 2027 ms |
| `openclaw.cmd cron status --json` | 3023 ms | 2022 ms |

结论:

1. 当前最大的原始耗时来自 `openclaw status --json`
2. Cron 两条命令加起来冷态约 6 秒，Guard 经过缓存和组合后仍有 4 秒级等待

### 5.2 Guard 函数级耗时

| 函数 | 第 1 次 | 第 2 次 | 说明 |
| --- | ---: | ---: | --- |
| `loadConfig()` | 1 ms | 0 ms | 读配置文件非常快 |
| `readAllEnv()` | 0 ms | 0 ms | 读 env 非瓶颈 |
| `detectOpenClaw()` | 2985 ms | 0 ms | 冷态要做 npm / 路径 / 版本探测 |
| `getServiceStatus()` | 66 ms | 60 ms | 端口探测较轻 |
| `getAgentCatalog()` | 2 ms | 1 ms | Agent 配置读取很快 |
| `listMemoryFiles()` | 15 ms | 2 ms | 递归扫记忆文件，当前规模不大 |
| `getNotificationSummary(100)` | 2 ms | 0 ms | 通知 JSON 很快 |
| `captureSessionOverview()` | 11026 ms | 2 ms | 当前最重的 Guard 业务入口 |
| `getRecentActivity(50)` | 0 ms | 0 ms | 读取 activity jsonl 很快 |
| `getDashboardOverview()` | 76 ms | 6 ms | 在快照已热时很快；冷态实际上被 `captureSessionOverview()` 拖慢 |
| `getCronOverview()` | 4285 ms | 0 ms | 冷态要跑 Cron CLI |
| `getGitSyncStatus()` | 1 ms | 0 ms | 此轮测试时已命中缓存 |

### 5.3 预热任务拆分耗时

通过 `cache-prewarm` 的最新一次分析任务，得到如下分项数据:

| 任务 | 耗时 |
| --- | ---: |
| `OpenClaw status` | 3570 ms |
| `Gateway service status` | 67 ms |
| `Dashboard overview` | 10146 ms |
| `Cron overview` | 4315 ms |
| `Git sync status` | 477 ms |
| 总耗时 | 18577 ms |

这组数据与前面函数级和 CLI 级测试是一致的。

### 5.4 路由级实测

在本机对典型 HTTP 接口做的两轮请求结果:

| 接口 | 第 1 次 | 第 2 次 |
| --- | ---: | ---: |
| `/api/dashboard/overview` | 14759 ms | 60 ms |
| `/api/info` | 1 ms | 1 ms |
| `/api/cron-ui` | 3864 ms | 0 ms |
| `/api/git-sync/status` | 335 ms | 9 ms |

这说明:

1. 驾驶舱页的“几十秒加载感”核心来自冷态的 `/api/dashboard/overview`
2. 只要缓存热了，接口本身并不慢
3. 因此问题不是浏览器渲染能力不足，而是后端第一次拿数据太重

## 6. 为什么“文件缓存很快”，页面还是会慢

这是当前最容易误判的点。

### 6.1 Guard 并不是总在直接读 OpenClaw 的文件缓存

理论上，OpenClaw 自己内部很多数据来自本地文件与状态目录，读取速度应当很快。  
但 Guard 当前实现并没有直接复用 OpenClaw 内部所有缓存文件，而是大量通过 CLI 获取标准化 JSON:

1. `openclaw status --json`
2. `openclaw cron list --json`
3. `openclaw cron status --json`

CLI 带来的额外开销包括:

1. 进程创建成本
2. 命令本身的内部初始化
3. JSON 输出生成
4. Guard 再次解析

因此“OpenClaw 底层可能有缓存”并不等价于“Guard 调它就一定快”。

### 6.2 配置文件读取确实快，但它不是主耗时项

本次实测:

1. `loadConfig()` 基本 0 到 1 ms
2. `readAllEnv()` 基本 0 ms
3. `getAgentCatalog()` 1 到 2 ms
4. `getNotificationSummary()` 0 到 2 ms

这已经说明:

1. `openclaw.json`
2. `env`
3. Guard 自己的状态 JSON

都不是当前用户体感卡顿的主要来源。

### 6.3 真正慢的是“外部命令 + 聚合 + 一次性等待”

当前慢链路通常满足三个条件:

1. 需要 shell out 到 OpenClaw CLI 或 Git CLI
2. 返回后还要做二次聚合、落盘、diff、通知
3. 前端页面必须等所有数据都好之后才统一渲染

所以最终用户看到的是:

1. 页面一直加载
2. 等很久之后一下子出来
3. 或者 15 秒后才超时报错

## 7. 渲染层面的附加影响

当前前端渲染虽然不是最主要瓶颈，但也存在放大体感问题的地方。

### 7.1 一次性等待，不做分段渲染

`loadActiveTab()` 的模式是:

1. 先清空面板
2. 显示“正在加载…”
3. 等 `loadXxx()` 所需数据全部回来
4. 再一次性拼出完整 HTML

这样会带来两个问题:

1. 快数据不能先展示
2. 用户无法区分“已经拿到 80% 数据”和“接口完全卡住”

### 7.2 大列表页仍有字符串拼接和 DOM 注入成本

例如:

1. Git 同步页会渲染变更文件列表
2. 通知页会渲染最多 200 条通知
3. Agent 页会为每个 Agent 拼较大的卡片
4. Cron 页会渲染完整编辑表单和任务列表

在数据量继续增加时，这部分渲染耗时会进一步放大，但当前不是主瓶颈。

## 8. 当前问题的核心归因

综合代码和实测，可以把当前“部分页面点击后加载时间过长”归纳为 5 个核心原因:

1. 驾驶舱、会话、成本共用同一条重量级运行态快照链。
2. 这条链底层依赖 `openclaw status --json`，其冷态本身就很慢。
3. Cron 页冷态依赖两条命令，因此首开也慢。
4. Git 同步页虽然已有缓存，但冷态仍需要真实 Git 扫描。
5. 前端是整页阻塞式等待，没有分块渲染和“慢块后到”的交互设计。

## 9. 优化方向建议

这部分不是本次实现变更，只是为后续改造提供明确方向。

### 9.1 优先级 P0

1. 给驾驶舱、会话、成本共享一个更高层级的“聚合快照缓存”，而不是每次都从 `captureSessionOverview()` 重新组织。
2. 把驾驶舱改成分块渲染:
   - 第一块先显示系统/本地文件类快数据
   - 第二块异步补运行态快照
3. 给页面增加“正在加载哪一层数据”的提示，而不是统一显示“正在加载…”。

### 9.2 优先级 P1

1. 把运行态快照 TTL 从 `15 秒` 调整为更适合工作台交互的策略。
2. 引入后台定时刷新快照，而不是在用户点击时同步拉 CLI。
3. Cron 页拆成:
   - 任务列表快照
   - 状态快照
   先显示列表，再补调度状态。

### 9.3 优先级 P2

1. Git 同步页把嵌套仓扫描和 `.gitignore` 预览改成后台任务。
2. 通知、Agent、文件、记忆等页在数据量上来后，增加分页或虚拟化。
3. 搜索页目前是实时全量扫描，后续需要单独索引化，否则工作区大了会成为新瓶颈。

## 10. 最终判断

当前系统并不是“没有缓存”，而是“缓存层级还不够靠上”。  
配置文件读取没有问题，真正的问题在于:

1. 关键页签仍然依赖重量级 CLI 命令
2. 这些命令虽然已有 15 到 20 秒短 TTL 缓存，但一旦 miss，用户就重新感受到冷启动
3. 前端还没有把快慢数据拆开显示

因此，下一阶段优化重点不应该放在 `openclaw.json` 或 env 的读取速度上，而应该放在:

1. 运行态快照的高层缓存
2. 后台刷新
3. 页签分块渲染
4. 重型接口的异步化与状态可视化

