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
