# Day 11：安全运维：让你的 AI 稳定又安全

> PPT 文稿 | 预计时长：1.5h | 所属层级：实战层

---

## 第 1 页 · 封面

### Day 11：安全运维：让你的 AI 稳定又安全

**OpenClaw 实战训练营 · 实战层**

预计时长：1.5 小时

> 今天的目标：掌握 API Key 安全管理、服务器控制和 Agent 权限配置，让 AI 助手稳定安全运行。

---

## 第 2 页 · 今日学习目标

完成本模块后，你将能够：

1. ✅ **配置** API Key 安全管理、服务器访问控制和 Agent 权限边界
2. ✅ **解释** OpenClaw 使用中的主要安全风险和防护措施
3. ✅ **使用** 系统化的故障排查流程定位和解决常见问题

---

## 第 3 页 · API Key 安全管理

### 风险

API Key 泄露 → 他人盗用你的 AI 额度 → 产生高额费用 💸

### 最佳实践

| 做法 | 说明 |
|------|------|
| ✅ 环境变量存储 | 不硬编码在配置文件中 |
| ✅ .env 文件管理 | 将 .env 加入 .gitignore |
| ✅ 定期轮换 | 定期更换 API Key |
| ✅ 设置限额 | 在服务商后台设置用量限额和告警 |
| ❌ 不要分享 | 不要发到群里、截图、提交到 Git |

### 环境变量配置

```bash
# 创建 .env 文件
echo 'OPENAI_API_KEY=你的Key' > .env

# 在 .bashrc 中加载
echo 'source ~/.env' >> ~/.bashrc
source ~/.bashrc
```

---

## 第 4 页 · 服务器访问控制

### 五项安全加固

| 序号 | 措施 | 命令/操作 |
|------|------|-----------|
| 1 | SSH 密钥登录 | `ssh-keygen` 生成密钥对 |
| 2 | 禁用密码登录 | 修改 sshd_config |
| 3 | 防火墙配置 | `sudo ufw allow 22/tcp && sudo ufw enable` |
| 4 | 非 root 用户运行 | `adduser openclaw` |
| 5 | 定期更新系统 | `apt update && apt upgrade -y` |

### 防火墙配置示例

```bash
sudo ufw allow 22/tcp          # SSH
sudo ufw allow <Gateway端口>/tcp  # OpenClaw
sudo ufw enable                 # 启用防火墙
sudo ufw status                 # 查看状态
```

---

## 第 5 页 · Agent 权限边界

### 工具权限控制

通过 openclaw.json 的 `tools.allow` / `tools.deny` 限制 Agent 可用工具

### 四种预设配置（Tool Profiles）

| 配置 | 说明 | 适用场景 |
|------|------|----------|
| minimal | 最小权限，仅基本对话 | 纯聊天场景 |
| coding | 允许文件和代码操作 | 开发辅助 |
| messaging | 允许消息和通知 | 渠道对接 |
| full | 全部权限开放 | 完全信任场景 |

### 按场景限制示例

```json
{
  "tools": {
    "deny": ["group:runtime", "group:fs:write"]
  }
}
```

> 只允许读取文件，不允许写入和执行命令

---

## 第 6 页 · 数据隐私保护

### 数据流向

```
你的对话 → OpenClaw（本地） → AI 模型服务商（云端）
```

### 注意事项

| 要点 | 说明 |
|------|------|
| 对话内容会发送给 AI 服务商 | 敏感信息不要通过对话传输 |
| 了解服务商数据政策 | 不同服务商的数据处理方式不同 |
| 本地模型方案 | 使用 Ollama 等本地模型，数据完全不出本机 |
| 记忆文件存储在本地 | 保护好服务器访问权限 |

---

## 第 7 页 · 监控与日志

### 常用监控命令

```bash
# 查看 Gateway 日志
pm2 logs openclaw-gw

# 查看系统资源
free -h     # 内存
df -h       # 磁盘
htop        # CPU 和进程

# 进程资源监控
pm2 monit

# 清空日志（防止过大）
pm2 flush
```

### 日志轮转

设置日志自动轮转，避免日志文件无限增长

---

## 第 8 页 · 四步排查法

### 遇到问题不要慌，按顺序排查

```
第一步：看日志 → pm2 logs openclaw-gw --lines 100
    ↓
第二步：查资源 → free -h / df -h / top
    ↓
第三步：测网络 → ping google.com / curl API地址
    ↓
第四步：查配置 → cat openclaw.json | python3 -m json.tool
```

> 🎯 排查口诀：**日志 → 资源 → 网络 → 配置**，四步走完问题清

---

## 第 9 页 · 实操任务总览

| 任务 | 目标 | 预计时间 |
|------|------|----------|
| 任务 1 | 安全加固你的 OpenClaw 部署 | 30 分钟 |
| 任务 2 | 练习故障排查流程 | 20 分钟 |

---

## 第 10 页 · 实操任务 1：安全加固

### 操作步骤

1. 将 API Key 迁移到环境变量（创建 .env 文件）
2. 配置防火墙：`sudo ufw allow 22/tcp && sudo ufw enable`
3. 检查是否使用非 root 用户运行
4. 配置工具权限：在 openclaw.json 中设置 `tools.deny`
5. `pm2 restart openclaw-gw` → 验证配置生效

### ✅ 成功标志

- API Key 不再硬编码在配置文件中
- 防火墙已启用
- 不必要的工具权限已被限制

---

## 第 11 页 · 实操任务 2：故障排查练习

### 操作步骤

1. `pm2 status` → 查看 Gateway 状态
2. `pm2 logs openclaw-gw --lines 50` → 查看日志
3. `free -h` → 检查内存
4. `df -h` → 检查磁盘
5. `ping google.com` → 测试网络
6. 如发现问题，按故障排查手册处理

### ✅ 成功标志

- 熟悉故障排查的基本流程和常用命令

---

## 第 12 页 · 诊断命令速查表

| 用途 | 命令 |
|------|------|
| 进程状态 | `pm2 status` |
| 实时日志 | `pm2 logs openclaw-gw` |
| 重启 Gateway | `pm2 restart openclaw-gw` |
| 资源监控 | `pm2 monit` |
| 内存检查 | `free -h` |
| 磁盘检查 | `df -h` |
| 端口检查 | `ss -tlnp \| grep <端口>` |
| 网络测试 | `ping <地址>` |
| JSON 格式验证 | `cat openclaw.json \| python3 -m json.tool` |

---

## 第 13 页 · 🔒 安全提示

本模块本身就是安全主题，核心要点回顾：

1. API Key 用环境变量管理，不硬编码
2. SSH 密钥登录，禁用密码
3. 防火墙仅开放必要端口
4. Agent 权限最小化
5. 敏感信息不通过 AI 对话传输
6. 定期更新系统和 OpenClaw

---

## 第 14 页 · 验收自检

- [ ] 完成了 API Key 的环境变量迁移
- [ ] 配置了防火墙和工具权限限制
- [ ] 能说出至少 3 个 OpenClaw 安全最佳实践

---

## 第 15 页 · 今日总结与预告

### 今天你完成了 🎉

- 掌握了 API Key 安全管理
- 完成了服务器安全加固
- 配置了 Agent 权限边界
- 学会了四步排查法

### 明天预告：Day 12

**毕业项目——打造你的 AI 工作流**

综合运用所学知识，打造属于你自己的 AI 自动化工作流！

---

## 第 16 页 · 延伸阅读

- [OpenClaw 安全指南](https://openclaw.io/docs/security)
- [OpenClaw Tools 权限配置](https://openclaw.io/docs/tools)
