# OpenClaw Guard x tenacitOS 集成使用手册（2026-03-01）

## 1. 集成目标

- 通过 `openclaw-guard` 统一管理 tenacitOS（Mission Control）生命周期。
- 保留 tenacitOS 原生全部功能，不做阉割重写。
- 在 CLI 与 Web 面板提供一键入口。

## 2. CLI 命令

在 `openclaw-guard` 目录执行：

```bash
npx tsx src/index.ts mission status
npx tsx src/index.ts mission install
npx tsx src/index.ts mission sync
npx tsx src/index.ts mission bootstrap
npx tsx src/index.ts mission start
npx tsx src/index.ts mission stop
npx tsx src/index.ts mission restart
npx tsx src/index.ts mission logs -n 200
npx tsx src/index.ts mission health
```

## 3. Web API 接口

- `GET  /api/mission/status`
- `POST /api/mission/install`
- `POST /api/mission/sync`
- `POST /api/mission/bootstrap`
- `POST /api/mission/start`
- `POST /api/mission/stop`
- `POST /api/mission/restart`
- `GET  /api/mission/logs?lines=200`
- `GET  /api/mission/health`

## 4. Web 面板入口

- 启动 Guard Web：`npx tsx src/index.ts web --port 8088`
- 打开标签页：`🦞 Mission`
- 支持按钮：
  - 安装/更新
  - 同步代码
  - 初始化环境
  - 启动/停止/重启
  - 健康检查
  - 查看日志
  - 打开 Mission Control 页面

## 5. 默认路径

- Mission 目录: `~/.openclaw/workspace/mission-control`
- 状态目录: `~/.openclaw/guard/mission-control`
- PID 文件: `~/.openclaw/guard/mission-control/mission-control.pid`
- 日志文件: `~/.openclaw/guard/mission-control/mission-control.log`

可通过环境变量覆盖：

- `OPENCLAW_GUARD_MISSION_DIR`
- `OPENCLAW_GUARD_MISSION_PORT`

## 6. 初始化行为

安装/同步时，Guard 会自动：

1. 生成或校验 `.env.local`（`ADMIN_PASSWORD`、`AUTH_SECRET` 等）
2. 补齐 `data/*.json`（基于 `.example.json`）
3. 安装 npm 依赖

## 7. 运行验证清单

1. `mission status` 显示 `installed: true`
2. `mission start` 后端口可访问
3. `mission health` 返回可达状态
4. `mission logs` 能读取日志输出
5. Guard Web 的 `🦞 Mission` 标签可执行全部动作
