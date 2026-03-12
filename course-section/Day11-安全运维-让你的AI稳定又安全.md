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
4. ✅ **实施** 日常开发机部署 OpenClaw 的全维度安全方案（用户隔离、目录白名单、沙箱、凭证保护）

---

## 第 2.5 页 · 讲师提示语（可直接口播）

- **开场认知**：安全运维不是给高手学的“附加题”，而是让 AI 助手可以长期稳定运行、不把你拖进反复救火的基础动作。
- **实操前提醒**：这一节不要讲太多抽象安全理论，优先让学员真正做 4 件事：管好 Key、收紧权限、会看状态、会查日志。
- **卡点转场**：学员一旦遇到问题，先重复课堂口令：先看 `openclaw status`，再看 `openclaw gateway health`，最后盯 `openclaw logs --follow`。
- **复盘收口**：今天的目标不是“系统绝对安全”，而是“风险有边界、问题可恢复、故障能定位”。

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

## 第 5.2 页 · 执行审批与 `/elevated`：什么时候该放，什么时候别放

### 三种执行安全级别

| 模式 | 含义 | 课堂建议 |
|------|------|----------|
| deny | 一律不允许主机执行 | 最安全，适合纯聊天 Agent |
| allowlist | 只允许允许列表中的命令 | **推荐默认**，兼顾安全与可用性 |
| full | 放开所有命令 | 只在完全信任、完全理解后使用 |

### `/elevated` 四种状态要讲清

| 指令 | 含义 | 风险提示 |
|------|------|----------|
| `/elevated off` | 关闭提权 | 默认回到普通状态 |
| `/elevated on` / `/elevated ask` | 允许在主机执行，但仍保留审批 | 适合需要人工确认的课堂演示 |
| `/elevated full` | 主机执行 + 跳过 exec 审批 | **不要作为课堂默认值** |

### 三个讲师必须反复强调的边界

1. `tools.deny` 仍然高于提权指令，**被禁掉的工具不会因为 `/elevated` 自动复活**
2. `/elevated full` 只是“方便”，不是“正确默认值”
3. 真正高风险的场景，优先用 **allowlist + on-miss**，而不是一把梭 `full`

> 一句话记忆：**默认用 allowlist，临时用 ask，慎用 full。**

---

## 第 5.5 页 · 🚨 供应链安全：ClawHub 恶意技能危机

### 真实威胁：不是假设，是正在发生的事

2026 年 2 月，安全研究机构发现 ClawHub 市场中存在大规模恶意技能攻击：

- **1,184+ 恶意技能**被上传到 ClawHub，占市场总量约 7-20%
- **"ClawHavoc" 攻击活动**：335 个技能伪装成正常工具，植入 macOS 信息窃取器（Atomic Stealer）
- **283 个技能**存在凭证泄露漏洞，会暴露你的 API Key 和 SSH 密钥
- **CVE-2026-25253**：OpenClaw 被发现存在严重的一键远程代码执行漏洞
- Gartner 建议企业暂时封锁 OpenClaw，直到安全问题得到解决

### 你需要做的防护措施

| 序号 | 措施 | 操作 |
|------|------|------|
| 1 | 保持 OpenClaw 最新版本 | `npm update -g openclaw` |
| 2 | 安装前用 skill-vetting 审查技能 | 让 AI 执行安全扫描 |
| 3 | 检查技能权限要求 | 权限与功能不匹配 = 🚩 红旗 |
| 4 | 定期审查已安装技能 | `openclaw skills list` 并逐一检查 |
| 5 | 启用 Agent Sandbox | 限制 Agent 的系统访问范围 |
| 6 | 监控异常网络请求 | 检查是否有未知的外部连接 |

### 版本更新与漏洞修补

```bash
# 检查当前版本
openclaw --version

# 更新到最新版本
npm update -g openclaw

# 更新后重启 Gateway
openclaw gateway restart

# 查看更新日志确认安全补丁
openclaw changelog
```

> 💡 OpenClaw 团队在 v2026.2.13 和 v2026.2.21 中进行了大规模安全加固（massive security hardening），务必保持更新。

---

## 第 5.6 页 · 🖥️ 日常开发机部署安全：既要能干活，又要管得住

### 核心矛盾

网上推荐用闲置电脑或云服务器部署 OpenClaw，但很多开发者希望在**日常开发机**上运行——让 AI 直接帮你写代码、操作文件、执行部署。

这带来一个核心矛盾：**既要给 AI 足够的权限来干活，又不能让它变成不受控的"超级用户"**。

### 第一层：系统用户隔离

不要用你的日常开发账户运行 OpenClaw，创建专用低权限用户：

```bash
# Linux / macOS
sudo adduser openclaw-agent
sudo chown -R openclaw-agent:openclaw-agent /home/openclaw-agent

# Windows（PowerShell 管理员）
net user openclaw-agent 你的密码 /add
# 不要加入 Administrators 组，保持标准用户
```

> 💡 即使 AI 执行了危险命令，影响范围也被限制在这个用户的权限内。

### 第二层：文件系统——白名单式授权

你的开发机上有 SSH 密钥、Git 凭证、`.env` 文件、浏览器 cookie 等敏感数据。OpenClaw 不应该碰这些。

**必须保护的敏感目录：**

| 目录 | 内容 | 风险 |
|------|------|------|
| `~/.ssh/` | SSH 密钥 | 可登录你的所有服务器 |
| `~/.gnupg/` | GPG 密钥 | 可伪造你的签名 |
| `~/.config/` | 各种应用配置 | 可能包含 token |
| `~/.git-credentials` | Git 凭证 | 可操作你的所有仓库 |
| 浏览器 Profile 目录 | Cookie、密码 | 可劫持你的所有登录会话 |
| 各项目的 `.env` 文件 | API Key、数据库密码 | 可访问你的所有服务 |

**操作方法：**

- 用符号链接把允许 AI 操作的项目目录链接到 `openclaw-agent` 的 home 下
- 敏感目录确保 `openclaw-agent` 用户无读取权限
- `.env` 文件设置 `chmod 600`（Linux/macOS），属主为你的开发用户

```bash
# Linux/macOS：确保 openclaw-agent 无法读取你的 SSH 密钥
chmod 700 ~/.ssh
chmod 600 ~/.ssh/*

# 只把需要 AI 操作的项目目录链接过去
sudo -u openclaw-agent ln -s /path/to/your/project /home/openclaw-agent/workspace
```

### 第三层：命令执行沙箱

`group:runtime` 允许 AI 执行任意 shell 命令——这是最危险的权限。

**三种防护方案（按安全等级递增）：**

| 方案 | 安全等级 | 适用场景 | 操作复杂度 |
|------|----------|----------|------------|
| Skill 封装 | ⭐⭐ | 固定操作流程 | 低 |
| Docker 沙箱 | ⭐⭐⭐ | 通用开发辅助 | 中 |
| 系统级沙箱 | ⭐⭐⭐⭐ | 高安全要求 | 高 |

**方案 A：用 Skill 封装替代通用命令执行**

禁掉 `group:runtime`，把需要的操作封装成专用 Skill：

```json
{
  "tools": {
    "deny": ["group:runtime"],
    "allow": ["group:fs:read", "group:fs:write", "group:web"]
  }
}
```

然后编写专用 Skill（如"部署到测试环境"），里面只允许执行特定命令。

**方案 B：Docker 沙箱部署**

```bash
docker run -d \
  --name openclaw \
  -v /path/to/projects:/workspace \
  -v /path/to/.env:/app/.env:ro \
  --user 1001:1001 \
  --network=bridge \
  openclaw-image
```

关键点：
- 只挂载项目目录，不挂载 `~/.ssh`、`~/.config` 等
- 用 `--user` 指定非 root 用户
- 用自定义网络限制对本机其他服务的访问

**方案 C：系统级沙箱（Linux）**

```bash
# 使用 firejail 限制进程
firejail --private=/home/openclaw-agent \
         --net=none \
         --nosound \
         openclaw gateway start
```

### 第四层：网络隔离

你的开发机上可能跑着本地数据库、Redis、各种开发服务。恶意 Skill 可能尝试连接这些服务或外传数据。

- Docker 部署：用自定义网络限制 OpenClaw 只能访问外网
- 裸机部署：用防火墙规则限制 `openclaw-agent` 用户的出站连接
- 定期检查：`ss -tlnp`（Linux）或 `netstat -an`（Windows）查看异常连接

### 第五层：Git 和代码凭证保护

| 保护对象 | 做法 |
|----------|------|
| Git 凭证 | 确保 `openclaw-agent` 无法读取 `~/.git-credentials` 或系统 keychain |
| 仓库操作 | 给 AI 一个只有特定仓库权限的 deploy key 或 fine-grained PAT |
| 代码审查 | AI 提交的代码不要自动 push 到 main，走 PR 流程 |
| npm/pip token | 不要在 openclaw-agent 用户下配置包管理器的发布 token |

### 第六层：按场景分级配置

| 场景 | 推荐配置 | 风险等级 |
|------|----------|----------|
| 纯聊天/问答 | `minimal` profile，零权限 | 🟢 无风险 |
| 代码辅助（只读） | 只开 `group:fs:read` + `group:web` | 🟢 低风险 |
| 开发辅助（读写） | 开 `group:fs`，限定工作目录 | 🟡 中风险 |
| 全能助手（含命令执行） | Docker 沙箱 + 白名单目录 + 专用用户 | 🟠 需防护 |
| 自动化部署 | 专用 Skill + deploy key + CI/CD token | 🟠 需防护 |

### 定期审计清单

- [ ] 检查 OpenClaw 对话日志和命令执行历史
- [ ] 审查已安装的 Skill 列表，移除不用的
- [ ] 确认 `openclaw-agent` 用户无法访问敏感目录
- [ ] 检查是否有异常网络连接
- [ ] 更新 OpenClaw 到最新版本

> 💡 一句话总结：**用独立用户 + 目录白名单 + 沙箱构建权限边界，用专用 Skill 替代通用命令执行，用专用 token 替代个人凭证**。

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
# 快速总览
openclaw status

# 查看 Gateway 服务状态
openclaw gateway status

# 配置校验
openclaw config validate

# Gateway 健康检查
openclaw gateway health

# 查看 Gateway 日志
openclaw logs --follow

# 完整诊断（适合截图发给讲师）
openclaw status --all

# 查看系统资源
free -h     # 内存
df -h       # 磁盘
htop        # CPU 和进程
```

### 日志轮转

设置日志自动轮转，避免日志文件无限增长

---

## 第 7.2 页 · 上线前的健康检查与回退顺序

### 推荐的检查顺序

```bash
# 1) 先看配置是否合法
openclaw config validate

# 2) 再看 Gateway 是否健康
openclaw gateway health

# 3) 最后看最近日志
openclaw logs --follow
```

### 如果刚改完配置就出问题

1. **先停手，不要继续叠加修改**
2. 看 `config validate` 报错位置
3. 看 `gateway health` 是否变红
4. 查看最近日志
5. 必要时恢复上一个可用配置，再重启 Gateway

> 安全运维不是“出事后再修”，而是**每次改完都先验证、能出问题时有回退顺序**。

---

## 第 7.5 页 · 桌面运维：用虾护卫统一启停查

如果你是在 Windows、macOS 或 Linux 桌面电脑上运行 OpenClaw，建议把 `Gateway` 和 `Guard Web` 的常用操作交给“虾护卫”统一处理，而不是临时切换不同系统命令。

### 三个最常用脚本

| 动作 | Windows | macOS / Linux | 作用 |
|------|---------|---------------|------|
| 启动 / 重启 Guard Web | `start-web.bat` | `bash ./start-web.sh` | 自动执行“先停旧实例，再构建并启动新实例” |
| 停止 Guard Web | `stop-web.bat` | `bash ./stop-web.sh` | 停止当前后台实例，并等待进程真正退出 |
| 查看当前状态 | `status-web.bat` | `bash ./status-web.sh` | 查看端口、PID、访问地址和日志路径 |

### macOS 双击入口

如果你不想开终端，可以直接双击：

- `start-web.command`
- `stop-web.command`
- `status-web.command`

### 推荐使用顺序

1. 页面打不开或状态异常时，先执行 `status-web`
2. 确认是 Guard Web 自身问题，再执行 `start-web`
3. 只想停掉后台服务时，执行 `stop-web`
4. 如果是 OpenClaw 核心配置、插件或环境变量变更，再重启 `Gateway`

### 自定义端口示例

```bash
bash ./start-web.sh --port 18090
bash ./stop-web.sh --port 18090
bash ./status-web.sh --port 18090
```

```bat
start-web.bat --port 18090
stop-web.bat --port 18090
status-web.bat --port 18090
```

> 记住一个原则：`start-web` 负责“先停后启”，`stop-web` 负责“确实停掉”，`status-web` 负责“先确认，再处理”。

---

## 第 8 页 · 四步排查法

### 遇到问题不要慌，按顺序排查

```
第一步：看状态 → openclaw status / openclaw gateway health
    ↓
第二步：看日志 → openclaw logs --follow
    ↓
第三步：查资源 → free -h / df -h / top
    ↓
第四步：查配置 → openclaw config validate
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
5. 执行 `openclaw config validate`
6. 执行 `openclaw gateway health`
7. `openclaw gateway restart` → 验证配置生效

### ✅ 成功标志

- API Key 不再硬编码在配置文件中
- 防火墙已启用
- 不必要的工具权限已被限制
- 知道何时应该使用 `allowlist / ask`，何时不该直接上 `full`

---

## 第 11 页 · 实操任务 2：故障排查练习

### 操作步骤

1. `openclaw status` → 查看整体状态
2. `openclaw gateway status` → 查看 Gateway 服务状态
3. `openclaw config validate` → 检查配置是否合法
4. `openclaw gateway health` → 看 Gateway 是否健康
5. `openclaw logs --follow` → 查看实时日志
6. `free -h` → 检查内存
7. `df -h` → 检查磁盘
8. `ping google.com` → 测试网络
9. `status-web` → 确认 Guard Web 是否真的在目标端口运行
10. 如发现问题，按“状态 → 日志 → 资源 → 配置”手册处理

### ✅ 成功标志

- 熟悉故障排查的基本流程和常用命令
- 能独立完成一次“配置校验 → 健康检查 → 日志定位”的诊断闭环

---

## 第 12 页 · 诊断命令速查表

| 用途 | 命令 |
|------|------|
| 快速总览 | `openclaw status` |
| Gateway 服务 | `openclaw gateway status` |
| 配置校验 | `openclaw config validate` |
| Gateway 健康 | `openclaw gateway health` |
| 实时日志 | `openclaw logs --follow` |
| 完整诊断 | `openclaw status --all` |
| 重启 Gateway | `openclaw gateway restart` |
| Guard Web 状态 | `status-web.bat` / `bash ./status-web.sh` |
| Guard Web 重启 | `start-web.bat` / `bash ./start-web.sh` |
| Guard Web 停止 | `stop-web.bat` / `bash ./stop-web.sh` |
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
5. 优先使用 `allowlist + ask`，慎用 `/elevated full`
6. 每次改配置后先跑 `config validate` 和 `gateway health`
7. 敏感信息不通过 AI 对话传输
8. 定期更新系统和 OpenClaw

---

## 第 14 页 · 验收自检

- [ ] 完成了 API Key 的环境变量迁移
- [ ] 配置了防火墙和工具权限限制
- [ ] 能说出至少 3 个 OpenClaw 安全最佳实践
- [ ] 已将 OpenClaw 更新到最新版本，确认安全补丁已应用
- [ ] 了解 ClawHub 供应链安全风险，能说出恶意技能的识别方法
- [ ] 配置了 Agent 权限边界（tools.deny），遵循最小权限原则
- [ ] 能解释 `/elevated on|ask|full` 的区别，知道为什么默认不推荐 `full`
- [ ] 会执行 `openclaw config validate` 和 `openclaw gateway health`
- [ ] 了解日常开发机部署 OpenClaw 的六层安全防护体系
- [ ] 能根据使用场景选择合适的权限分级配置

---

## 第 15 页 · 今日总结与预告

### 今天你完成了 🎉

- 掌握了 API Key 安全管理
- 完成了服务器安全加固
- 配置了 Agent 权限边界
- 学会了四步排查法
- 掌握了日常开发机部署的六层安全防护方案

### 明天预告：Day 12

**毕业项目——打造你的 AI 工作流**

综合运用所学知识，打造属于你自己的 AI 自动化工作流！

---

## 第 16 页 · 延伸阅读

- [OpenClaw 安全指南](https://openclaw.io/docs/security)
- [OpenClaw Tools 权限配置](https://openclaw.io/docs/tools)
- [OpenClaw 安全加固 101（Adversa AI）](https://adversa.ai/blog/openclaw-security-101-vulnerabilities-hardening-2026/) —— CVE-2026-25253 漏洞详解与加固方案
- [ClawHub 恶意技能分析报告（The Hacker News）](https://thehackernews.com/2026/02/researchers-find-341-malicious-clawhub.html) —— ClawHavoc 攻击活动详细分析
- [OpenClaw 安全危机深度解读（Conscia）](https://conscia.com/blog/the-openclaw-security-crisis/) —— 企业视角的安全评估
