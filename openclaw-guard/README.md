# OpenClaw Guard

OpenClaw 权限管理与安全审计工具，帮助你在日常开发机上安全地部署和运行 OpenClaw。

跨平台支持 Windows / macOS / Linux。

## 安装

```bash
cd openclaw-guard
npm install
```

## 使用

```bash
# 查看系统环境信息
npx tsx src/index.ts info

# 执行安全审计
npx tsx src/index.ts audit

# 查看可用的安全 Profile
npx tsx src/index.ts profile list

# 查看某个 Profile 的详细配置
npx tsx src/index.ts profile show coding

# 应用安全 Profile 到 openclaw.json
npx tsx src/index.ts profile apply coding

# 查看加固步骤
npx tsx src/index.ts harden --steps

# 生成加固脚本
npx tsx src/index.ts harden -o harden.sh

# 安装并初始化 tenacitOS (Mission Control)
npx tsx src/index.ts mission install

# 查看 Mission Control 状态
npx tsx src/index.ts mission status

# 启动 Mission Control（默认 8089 端口）
npx tsx src/index.ts mission start

# 检查 Mission Control 健康状态
npx tsx src/index.ts mission health
```

## 安全 Profile

| Profile | 风险等级 | 适用场景 |
|---------|----------|----------|
| chat | 🟢 无风险 | 纯聊天/问答 |
| readonly | 🟢 低风险 | 代码审查、文档查阅 |
| coding | 🟡 中风险 | 开发辅助（文件读写） |
| devops | 🟠 需防护 | 全能开发（含命令执行） |
| full | 🔴 高风险 | 完全信任（需沙箱隔离） |

## 核心功能

- **安全审计** (`audit`): 检查用户隔离、敏感目录权限、凭证安全、OpenClaw 配置
- **Profile 管理** (`profile`): 按场景选择预设的权限配置方案
- **系统加固** (`harden`): 生成跨平台的安全加固脚本
- **环境信息** (`info`): 显示当前系统环境和 OpenClaw 路径
- **Mission Control 集成** (`mission`): 一键安装/同步/启动/健康检查 tenacitOS
- **Web 集成面板** (`web`): 在 Guard Web UI 中直接管理 tenacitOS 生命周期与日志

## Mission Control 运维补充

### 生产模式启动（稳定长期运行）

```bash
# 自动执行 build + start，并写入 PID/运行元信息
npx tsx src/index.ts mission start --prod

# 生产模式重启（先 stop，再 build + start）
npx tsx src/index.ts mission restart --prod
```

### 登录密码找回/重置

```bash
# 查看当前 Mission Control 登录密码（ADMIN_PASSWORD）
npx tsx src/index.ts mission credentials

# 生成并写回新密码到 .env.local
npx tsx src/index.ts mission reset-password
```

### Mission API 最小鉴权（/api/mission/*）

- 本地回环地址（`127.0.0.1` / `::1` / `::ffff:127.0.0.1`）可直接访问。
- 非回环远程请求默认拒绝；需配置环境变量 `OPENCLAW_GUARD_MISSION_TOKEN`。
- 远程调用可通过以下任一方式传 token：
  - 请求头：`X-Mission-Token: <token>`
  - 请求头：`Authorization: Bearer <token>`
  - 查询参数：`?mission_token=<token>`

## AI Fallbacks (new)

You can now configure fallback model chain directly in OpenClaw Guard.

### Web UI
- Open Guard Web -> `AI` tab.
- Edit `Fallback Models` with comma-separated `provider/model` IDs.
- Click `Save Fallbacks` or `Clear`.

### API

Set fallbacks:

```http
POST /api/ai/fallbacks
Content-Type: application/json

{
  "modelIds": [
    "qwen/qwen3.5-plus",
    "wenwen/claude-opus-4-6"
  ]
}
```

Read current AI config:

```http
GET /api/ai/config
```

Response includes:
- `primaryModel`
- `fallbackModels`
- per-model `isFallback`
