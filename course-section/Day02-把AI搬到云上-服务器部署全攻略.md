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

# 安装 Node.js 18.x
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo bash -
sudo apt install -y nodejs

# 验证
node -v    # 应输出 v18.x.x
npm -v
```

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
openclaw onboard

# 建议：API Key 用环境变量管理
echo 'export OPENAI_API_KEY=你的Key' >> ~/.bashrc
source ~/.bashrc

# 快速测试
openclaw tui
# 发送一条消息确认正常 → Ctrl+C 退出
```

> ⚠️ 不要将 API Key 直接写在配置文件中！

---

## 第 9 页 · 后台运行配置（pm2）

### 为什么需要后台运行？

关闭 SSH → 进程停止 → AI 下线 😱

### 使用 pm2（推荐新手）

```bash
# 安装 pm2
npm install -g pm2

# 启动 Gateway
pm2 start "openclaw gateway" --name openclaw-gw

# 查看状态
pm2 status

# 查看日志
pm2 logs openclaw-gw

# 配置开机自启
pm2 startup
pm2 save
```

---

## 第 10 页 · 后台运行配置（systemd 可选）

### 适合有 Linux 经验的学员

```bash
# 创建服务文件
sudo nano /etc/systemd/system/openclaw.service

# 启用并启动
sudo systemctl enable openclaw
sudo systemctl start openclaw

# 查看状态
sudo systemctl status openclaw
```

> pm2 和 systemd 效果相同，新手选 pm2 即可

---

## 第 11 页 · 部署验证清单 ✅

| 检查项 | 命令 | 预期结果 |
|--------|------|----------|
| Gateway 状态 | `pm2 status` | 状态为 online |
| 模型连接 | `openclaw tui` 发消息 | AI 正常回复 |
| 日志检查 | `pm2 logs openclaw-gw --lines 50` | 无 ERROR |
| 端口检查 | `ss -tlnp \| grep openclaw` | 端口在监听 |
| 持久性测试 | 断开 SSH → 重连 → `pm2 status` | 仍在运行 |

---

## 第 12 页 · 实操任务

### 任务 1：在云服务器上安装 OpenClaw（30 分钟）

SSH 连接 → 安装 Node.js → 安装 OpenClaw → onboard 配置 → 测试对话

### 任务 2：配置后台运行并验证（30 分钟）

安装 pm2 → 启动 Gateway → 配置开机自启 → 运行验证清单 → 断开重连测试

---

## 第 13 页 · 常见故障排查 TOP 5

| # | 问题 | 快速解决 |
|---|------|----------|
| 1 | SSH 连接超时 | 检查 IP、安全组放行 22 端口 |
| 2 | Node.js 版本过低 | 用 NodeSource 脚本重装 |
| 3 | openclaw 命令找不到 | 将 npm bin 目录加入 PATH |
| 4 | Gateway 启动崩溃 | 查日志：API Key / 端口占用 / 内存不足 |
| 5 | 重启后不自动启动 | 确认执行了 `pm2 startup` + `pm2 save` |

---

## 第 14 页 · 🔒 安全提示

- 🔑 **SSH 密钥登录**，禁用密码登录
- 🧱 **防火墙**仅开放必要端口（22 + Gateway 端口）
- 🔐 **API Key** 用环境变量管理，不硬编码
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
- [ ] Gateway 通过 pm2 后台运行，状态 online
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
