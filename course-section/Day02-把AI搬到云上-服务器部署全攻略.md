# Day 2：把 AI 搬到云上——服务器部署全攻略

> PPT 文稿 | 预计时长：2h | 所属层级：基础层

---

## 第 1 页 · 封面

### Day 2：把 AI 搬到云上——服务器部署全攻略

**OpenClaw 实战训练营 · 基础层**

预计时长：2 小时

> 今天的目标：让你的 AI 助手 7×24 小时在线，随时随地为你服务。

---

## 第 2 页 · 今日学习目标

1. ✅ **安装** OpenClaw 到云服务器，完成初始配置与模型对接
2. ✅ **配置** 后台守护进程，实现 7×24 小时在线
3. ✅ **使用** 部署验证清单确认部署成功，排查常见问题

---

## 第 2.5 页 · 讲师提示语（可直接口播）

- **开场认知**：今天不是教大家成为运维工程师，而是把 Day 1 的本地体验，升级成一套可以稳定在线的 AI 服务。
- **实操前提醒**：今天最重要的不是“装完”，而是“每走一步都验证一步”，避免最后卡在不知道哪一步错了。
- **卡点转场**：如果学员卡住，不要先怀疑 OpenClaw 本身，先分三层看：机器环境、Gateway 服务、模型连通。
- **复盘收口**：这一节结束后，学员应该拥有一台“能连上、能跑起来、能重启、能验证”的 OpenClaw 服务器，而不是一台“今天刚好能用”的机器。

---

## 第 3 页 · 为什么要部署到云服务器？

| 对比项 | 本地运行 | 云端运行 |
|--------|----------|----------|
| 在线时间 | 关机就断 | 7×24 小时 |
| 访问方式 | 仅本机 | 任何设备 |
| 渠道对接 | 不稳定 | 随时在线回复 |
| 定时任务 | 需要电脑开机 | 持续运行 |
| 适用场景 | 体验和调试 | 长期使用 |

> 💡 消息渠道（Telegram、QQ 等）需要 AI 随时在线才能及时回复

---

## 第 4 页 · 云服务器选择建议

### 国内推荐

- 腾讯云轻量应用服务器（新用户优惠）
- 阿里云 ECS

### 海外推荐

- AWS Lightsail
- DigitalOcean Droplets
- Vultr

### 最低配置

| 项目 | 要求 |
|------|------|
| CPU | 1 核 |
| 内存 | 1GB |
| 硬盘 | 20GB |
| 系统 | Ubuntu 22.04 LTS |
| 预算 | 国内 30-50 元/月，海外 $4-6/月 |

---

## 第 5 页 · SSH 连接到服务器

### macOS / Linux

```bash
ssh root@你的服务器IP
```

### Windows

```powershell
ssh root@你的服务器IP
# 或使用 PuTTY 等 SSH 客户端
```

### 首次连接

- 提示确认指纹 → 输入 `yes`
- 输入密码（或使用 SSH 密钥）

---

## 第 6 页 · 基础环境准备

```bash
# 确认系统版本
cat /etc/os-release

# 更新系统
apt update && apt upgrade -y

# 检查磁盘空间
df -h

# 安装 Node.js 22.x（OpenClaw 当前要求）
curl -fsSL https://deb.nodesource.com/setup_22.x | sudo bash -
sudo apt install -y nodejs

# 验证
node -v    # 应输出 v22.12.0 或更高
npm -v
```

> 💡 如果你在旧教程里看到 Node 18，那是历史版本。当前 OpenClaw 请统一按 **Node 22+** 准备环境。

---

## 第 7 页 · 安装 OpenClaw（按平台分支）

### 公共步骤

```bash
npm install -g openclaw@latest
openclaw --version
```

### 平台差异

| 平台 | 注意事项 |
|------|----------|
| **Linux / 云服务器** | 建议创建专用用户，不用 root 运行 |
| **macOS** | 可用 Homebrew 安装 Node.js |
| **Windows** | 强烈推荐使用 WSL |

### Linux 创建专用用户

```bash
adduser openclaw
usermod -aG sudo openclaw
su - openclaw
```

---

## 第 8 页 · 初始配置与模型对接

```bash
# 启动初始化向导
openclaw onboard --install-daemon

# 建议：API Key 用环境变量管理
echo 'export OPENAI_API_KEY=你的Key' >> ~/.bashrc
source ~/.bashrc

# 快速测试
openclaw tui
# 发送一条消息确认正常 → Ctrl+C 退出

# 上线前再做两步机器校验
openclaw config validate
openclaw gateway health
```

> ⚠️ 不要将 API Key 直接写在配置文件中！
>
> 如果后面要手动修改配置，优先使用 `openclaw config set`，比直接编辑 JSON 更不容易出错。

---

## 第 8.5 页 · 部署闭环：验证、备份、回退

### 上线前三件事

1. **先备份当前配置**：后续切模型、改 Provider 时可以快速回退
2. **再验证配置语法**：避免 JSON 或字段拼写错误
3. **最后检查 Gateway 健康**：确认不仅“能启动”，而且“真的能对外工作”

```bash
# 备份当前配置
cp ~/.openclaw/openclaw.json ~/.openclaw/openclaw.json.bak.day2

# 验证配置语法
openclaw config validate

# 检查 Gateway 健康状态
openclaw gateway health
```

### 切模型时的安全动作

```bash
# 推荐用命令改配置，而不是手改 JSON
openclaw config set agents.defaults.model.primary "openai/gpt-5"

# 改完立即验证
openclaw config validate
openclaw gateway health
```

### 如果改坏了，怎么回退？

```bash
# 切回刚才备份的配置
cp ~/.openclaw/openclaw.json.bak.day2 ~/.openclaw/openclaw.json

# 重启 Gateway
openclaw gateway restart
```

> 课堂上要让学员形成一个意识：**部署不是“装完就算完”，而是“能验证、能回退、能复现”。**

---

## 第 9 页 · 后台运行配置（OpenClaw 守护服务）

### 为什么主线改成这套 CLI？

- 和 `openclaw onboard --install-daemon` 是同一套官方路径
- `status / health / restart / logs` 口径统一，课堂更容易排障
- 学员后续自己维护时，不需要再额外记一套第三方进程管理命令

### 推荐主路径

```bash
# 如果刚完成初始化，通常守护服务已经装好
openclaw gateway status

# 如果尚未安装，则手动安装并启动
openclaw gateway install
openclaw gateway start

# 日常检查
openclaw gateway status
openclaw gateway health

# 配置改动后重启
openclaw gateway restart
```

---

## 第 10 页 · 后台运行配置（pm2 / systemd 补充了解）

### 什么时候你还会遇到这些方案？

- 团队机器已经统一用 `pm2` 管 Node 服务
- 服务器已有现成的 `systemd` 监控、告警和发布体系
- 你在接手旧项目，需要先看懂对方的运维栈

### 课堂统一口径

- 学员主线按 OpenClaw 自带守护服务走
- `pm2 / systemd` 只作为“融入存量环境”的补充资料
- 只要不是已有旧系统，不建议课堂上让新手先学第三套命令

---

## 第 11 页 · 部署验证清单 ✅

| 检查项 | 命令 | 预期结果 |
|--------|------|----------|
| 配置语法 | `openclaw config validate` | 显示 `Config valid` |
| Gateway 健康 | `openclaw gateway health` | 显示 `OK` |
| Gateway 状态 | `openclaw gateway status` | 显示服务已安装且正在运行 |
| 模型连接 | `openclaw tui` 发消息 | AI 正常回复 |
| 日志检查 | `openclaw logs --follow` | 无持续 ERROR |
| 持久性测试 | 断开 SSH → 重连 → `openclaw gateway status` | 仍在运行 |

---

## 第 12 页 · 实操任务

### 任务 1：在云服务器上安装 OpenClaw（30 分钟）

SSH 连接 → 安装 Node.js 22+ → 安装 OpenClaw → onboard 配置 → `config validate` → `gateway health` → 测试对话

### 任务 2：配置后台运行并验证（30 分钟）

安装守护服务 → 启动 Gateway → 查看 `gateway status` → 备份 `openclaw.json` → 运行验证清单 → 断开重连测试

---

## 第 13 页 · 常见故障排查 TOP 5

| # | 问题 | 快速解决 |
|---|------|----------|
| 1 | SSH 连接超时 / 密钥报错 | 检查 IP、安全组放行 22 端口；私钥执行 `chmod 600` |
| 2 | Node.js 版本过低 | 重新安装 Node.js 22.x，确保 `node -v` ≥ `22.12.0` |
| 3 | `openclaw` 命令找不到 | 将 npm 全局 bin 目录加入 PATH，重新打开终端 |
| 4 | 配置无效或 Gateway 启动失败 | 先跑 `openclaw config validate`，再看 `openclaw logs --follow` |
| 5 | 切模型后 AI 不回复 | 恢复备份的 `openclaw.json`，然后 `openclaw gateway restart` |

---

## 第 14 页 · 🔒 安全提示

- 👤 **不要长期用 root 运行**，建议创建 `openclaw` 专用用户
- 🔑 **SSH 密钥登录**，禁用密码登录
- 🧱 **防火墙**仅开放必要端口（22 + Gateway 端口）
- 🔐 **API Key** 用环境变量管理，不硬编码
- 💾 **改模型前先备份配置**，避免课堂上改坏后无从回退
- 🔄 **定期更新**系统和 OpenClaw
- 🚪 修改默认 SSH 端口（可选）

```bash
sudo ufw allow 22/tcp
sudo ufw allow <Gateway端口>/tcp
sudo ufw enable
```

---

## 第 15 页 · 验收自检

- [ ] OpenClaw 在云服务器安装成功
- [ ] onboard 配置完成，TUI 对话正常
- [ ] `openclaw config validate` 与 `openclaw gateway health` 均通过
- [ ] Gateway 已通过 OpenClaw 守护服务后台运行
- [ ] 知道如何备份并回退 `~/.openclaw/openclaw.json`
- [ ] 断开 SSH 后重连，OpenClaw 仍在运行
- [ ] 部署验证清单全部通过

---

## 第 15 页 · 社区实战案例：混合部署——云端大脑 + 本地手脚

> 💬 来源：社区实战分享

### 第三种部署方式：混合部署

除了本地部署和云端部署，还有一种更强大的架构——**混合部署**：

| 部署方式 | 特点 | 适合谁 |
|----------|------|--------|
| 本地部署 | 关机就断，仅限体验 | 想试试的新手 |
| 云端部署 | 7×24 在线，但只能在服务器上干活 | 长期使用者 |
| **混合部署** | 云端当大脑 + 本地当手脚 | 需要操控本地电脑的用户 |

### 混合部署的核心链路

```
手机 → Telegram → 云服务器(AI大脑) → SSH隧道 → Windows电脑 → 执行操作
```

云服务器跑 Gateway 接所有聊天渠道，Windows 电脑跑 Node 执行本地操作，两者通过 SSH 隧道打通。

### 关键步骤概览

1. Windows 上安装 OpenClaw：`npm i -g openclaw`
2. 从云服务器获取 Gateway Token（`openclaw.json` 中的 `auth.token`）
3. 建立 SSH 隧道：`ssh -N -L 18790:127.0.0.1:18789 root@服务器IP`
4. 启动 Node 连接：`openclaw node run --host 127.0.0.1 --port 18790`
5. 在服务器端审批设备配对
6. 配置执行权限白名单

### 踩坑经验

- SSH 隧道窗口不能关，一关连接就断
- 输密码时屏幕无显示是正常的（Linux 安全机制）
- Gateway 重启后 Node 连接会断，需要重新建立
- 服务器端和 Windows 端的权限都要放行

### 实际使用场景

- 📂 出门在外，手机远程查看电脑上的文件
- 🖥️ 一个入口同时管理云服务器和 Windows 电脑
- 🌐 跨平台协作：在服务器上部署代码，在 Windows 上打开浏览器验证

> 💡 AI 助手的价值不在于它多聪明，而在于它能触及多少东西。当它能操控你的电脑时，它就是一个真正的员工。

---

## 第 16 页 · 社区实战案例：腾讯云一键部署

> 💬 来源：社区零基础教程

### 不想敲命令？网页操作也能搞定

腾讯云已经把 OpenClaw 做成了应用模板，适合完全不懂技术的用户：

- 最低 ¥99/年（约 ¥8.25/月），2 核 2G 足够
- 买服务器时选择 **OpenClaw 应用模板**，自动安装
- 在"应用管理"面板中配置 API Key 和聊天渠道
- 支持腾讯云 DeepSeek、通义千问、Kimi 等国内模型

### 全程费用

服务器 ¥8.25/月 + AI 模型按量付费（日常几块钱）≈ 一杯奶茶的钱

> 💡 新手推荐先用腾讯云 DeepSeek，在腾讯云控制台直接创建 API Key，一步到位。

---

## 第 17 页 · 今日总结与预告

### 今天你完成了 🎉

- 在云服务器上部署了 OpenClaw
- 配置了 7×24 小时后台运行
- 掌握了部署验证和故障排查

### 明天预告：Day 3

**拆解引擎——OpenClaw 六大核心组件**

理解 OpenClaw 的核心架构，为后续的个性化定制和渠道对接打好基础！
