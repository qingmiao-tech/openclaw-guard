# tenacitOS 开源项目全面分析（2026-03-01）

## 1. 分析目标

- 对 `https://github.com/carlosazaustre/tenacitOS` 做可落地的工程级分析。
- 输出可直接用于集成决策的结论：架构、功能边界、风险面、运维要求。
- 明确 `openclaw-guard` 如何“完整承接 tenacitOS 功能”，避免重复造轮子。

## 2. 样本与版本快照

- 仓库地址: `https://github.com/carlosazaustre/tenacitOS`
- 本地分析目录: `e:\openclaw-course\worklogs\tmp\tenacitOS`
- 当前 HEAD: `b021506`
- 最近公开提交节奏:
  - `ab2d4cb` 初始公开版
  - `6b063f7` 清理个人数据、转为 env 驱动
  - `7b88b56` README 重写（面向公开安装）
  - `b021506` README 增加截图

## 3. 技术栈与部署模型

## 3.1 前端/后端

- Next.js 16.1.6 + React 19.2.3 + Tailwind CSS v4
- App Router 结构，API 路由与页面都在 `src/app`
- 3D 能力:
  - `@react-three/fiber`
  - `@react-three/drei`
  - `@react-three/rapier`
- 编辑/可视化:
  - Monaco Editor
  - Recharts

## 3.2 数据与存储

- JSON 文件（`data/*.json`）: cron、notifications、activities、tasks 等
- SQLite (`better-sqlite3`): usage/cost tracking、部分分析数据
- OpenClaw 原生目录读取:
  - `OPENCLAW_DIR/openclaw.json`
  - 各 workspace 文件与 memory

## 3.3 运行方式

- 典型部署为 sidecar 仪表盘:
  - 与 OpenClaw 同主机
  - 通过环境变量定位 OpenClaw 状态目录
  - 不引入独立业务数据库（主要读取 OpenClaw + 本地 data）

## 4. 功能域全景

从 README 与代码结构看，tenacitOS 将能力分成以下 12 个域：

1. System Monitor（系统资源 + 服务状态）
2. Agent Dashboard（Agent 概览/会话状态）
3. Cost Tracking（token/cost 统计）
4. Cron Manager（计划任务与运行历史）
5. Activity Feed（活动流 + 统计）
6. Memory Browser（记忆文件浏览/检索）
7. File Browser（文件浏览、写入、上传下载）
8. Global Search（跨 memory/workspace 全局检索）
9. Notifications（通知中心）
10. Office 3D（3D 可视化工位）
11. Terminal（受限终端命令执行）
12. Auth（登录、cookie、限流）

## 5. 代码结构与规模观察

- API 路由文件数: 38
- Dashboard 页面文件数: 22
- 组件文件数: 73
- 结构特征:
  - `src/app/api/**/route.ts` 统一 API 接口层
  - `src/lib/*` 封装路径、定价、解析、活动日志等通用逻辑
  - `data/*.example.json` 作为初始化模板

## 6. API 面能力清单（按职责分组）

## 6.1 Agent/Session/Activity

- `/api/agents`
- `/api/agents/[id]/status`
- `/api/sessions`
- `/api/activities`
- `/api/activities/stats`
- `/api/activities/stream`

## 6.2 System/Service/Terminal

- `/api/system`
- `/api/system/monitor`
- `/api/system/stats`
- `/api/system/services`
- `/api/terminal`
- `/api/health`

## 6.3 File/Memory/Search

- `/api/files`
- `/api/files/write`
- `/api/files/upload`
- `/api/files/download`
- `/api/files/delete`
- `/api/files/mkdir`
- `/api/files/workspaces`
- `/api/memory/search`
- `/api/search`
- `/api/browse`

## 6.4 Cron/Notification/Reporting

- `/api/cron`
- `/api/cron/run`
- `/api/cron/runs`
- `/api/notifications`
- `/api/reports`
- `/api/analytics`
- `/api/costs`
- `/api/weather`

## 7. 安全与可维护性评估（关键结论）

## 7.1 正向设计

- 登录接口含 IP 级别失败限流（内存 Map + lockout）
- `system/services` 路由使用 allowlist + action allowlist
- Docker 容器 ID 做了正则约束
- `AUTH_SECRET` + `httpOnly` cookie 模式，具备基础保护

## 7.2 风险点（集成时已考虑）

1. 多处 API 使用 shell 命令拼接（`execAsync`），对输入验证依赖较强。
2. 限流状态为内存态，重启后清空，分布式部署不可复用。
3. 许多功能依赖 Linux 命令（`systemctl`、`pm2`、`df`、`top`），跨平台可移植性弱。
4. 作为 Next.js 全栈应用，依赖面较大，独立并入 Guard 单体会显著提高复杂度。

## 7.3 集成建议

- 不直接重写 tenacitOS 功能到 Guard 的单页代码。
- 采用 sidecar 编排方式，将 tenacitOS 原生能力“整体承接”，由 Guard 统一运维入口。
- 保持职责分离:
  - Guard: 安全治理、配置、服务编排入口
  - tenacitOS: rich dashboard + 深度可视化功能

## 8. 与 openclaw-guard 的集成映射（本次已落地）

本次采用“桥接集成”方式，已把 tenacitOS 全功能接入 Guard：

1. 生命周期管理（CLI）
   - 安装/同步/初始化/启动/停止/重启/日志/健康检查
2. HTTP API 集成（Guard Web Server）
   - `/api/mission/*` 全套管理接口
3. Web 管理面集成（Guard 内置 HTML UI）
   - 新增 `🦞 Mission` 标签页
   - 一键执行 `install/sync/bootstrap/start/stop/restart/health`
   - 内置日志查看与外链打开 Mission Control

## 9. 关键实现文件（集成侧）

- `openclaw-guard/src/mission-control.ts`
- `openclaw-guard/src/index.ts`
- `openclaw-guard/src/server.ts`
- `openclaw-guard/src/web-ui.ts`
- `openclaw-guard/README.md`

## 10. 结论

- tenacitOS 适合定位为 OpenClaw 的“操作系统层仪表盘”，功能覆盖面完整。
- 其复杂度与依赖决定了“桥接集成”优于“功能重写”。
- 本次在 `openclaw-guard` 内已实现统一入口与生命周期编排，满足“功能全面集成到 Guard 使用路径中”的目标。
