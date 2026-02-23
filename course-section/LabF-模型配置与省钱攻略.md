# Lab F：模型配置与省钱攻略

> PPT 文稿 | 预计时长：1h | 模块类型：选修 Lab

---

## 第 1 页 · 封面

### Lab F：模型配置与省钱攻略

**OpenClaw 实战训练营 · 选修 Lab**

预计时长：1 小时

> 今天的目标：搞定模型配置中的常见坑，学会用最低成本接入 Claude 4.6 Opus。

---

## 第 2 页 · 学习目标

完成本模块后，你将能够：

1. ✅ **排查** OpenClaw 模型配置报错，理解 contextWindow 和 maxTokens 的含义
2. ✅ **配置** 中转站 API 接入 Claude 4.6 Opus，实现低成本使用
3. ✅ **设置** 合理的上下文参数，避免"聊着聊着就挂了"的问题

---

## 第 3 页 · 真实案例：模型上下文报错

### 报错现场

启动 OpenClaw 后，聊天直接报错：

```
Model context window too small (4096 tokens). Minimum is 16000.
[agent/embedded] blocked model (context window too small):
  custom-localhost-8000/claude-opus-4-6 ctx=4096 (min=16000)
  source=modelsConfig
```

### 问题分析

模型本身支持 200K 上下文，但 OpenClaw 读到的是 4096。

关键线索在 `source=modelsConfig` —— 问题出在**配置文件**，不是模型本身。

OpenClaw 从 `~/.openclaw/openclaw.json`（或旧版 `~/.clawdbot/clawdbot.json`）读取模型配置。如果配置里的 `contextWindow` 字段缺失或设置过小，OpenClaw 会用默认值 4096，然后因为低于最低要求 16000 而拒绝使用。

---

## 第 4 页 · 配置文件在哪里？

### 配置文件路径

OpenClaw 按以下顺序查找配置文件：

| 优先级 | 路径 | 说明 |
|--------|------|------|
| 1 | `OPENCLAW_CONFIG_PATH` 环境变量 | 最高优先级，直接指定 |
| 2 | `~/.openclaw/openclaw.json` | 新版默认路径 |
| 3 | `~/.clawdbot/clawdbot.json` | 旧版兼容路径 |
| 4 | `~/.moldbot/moldbot.json` | 历史遗留路径 |

> 💡 Windows 上 `~` 就是 `C:\Users\你的用户名`

### 查看配置文件

```bash
# Linux / macOS
cat ~/.openclaw/openclaw.json | python3 -m json.tool

# Windows PowerShell
Get-Content "$env:USERPROFILE\.openclaw\openclaw.json" | python -m json.tool

# 如果找不到，搜索旧版路径
ls ~/.clawdbot/
ls ~/.moldbot/
```

---

## 第 5 页 · contextWindow 和 maxTokens 详解

### 两个关键参数

| 参数 | 含义 | 比喻 |
|------|------|------|
| `contextWindow` | 模型能"看到"的最大 token 数 | 桌子大小 —— 能同时摊开多少资料 |
| `maxTokens` | 模型单次回复的最大 token 数 | 笔的墨水量 —— 一次能写多长 |

### 各模型参考值

| 模型 | contextWindow | maxTokens |
|------|--------------|-----------|
| Claude 4.6 Opus（官方） | 200000 | 32768 |
| Claude 4.6 Opus（Kiro 渠道） | **150000** | 32768 |
| Claude Sonnet 4.5 | 200000 | 32768 |
| GPT-4o | 128000 | 16384 |
| DeepSeek V3 / R1 | 128000 | 8192 |
| Qwen Max | 128000 | 8192 |

> ⚠️ Kiro 渠道的上下文约 150K，不是满血 200K。这个差异很关键，后面会详细说。

---

## 第 6 页 · 修复报错：手动改配置

### 找到问题模型

打开配置文件，找到 `models.providers` 下你的 provider：

```json
{
  "models": {
    "providers": {
      "custom-localhost-8000": {
        "baseUrl": "http://localhost:8000",
        "apiKey": "sk-xxx",
        "models": [
          {
            "id": "claude-opus-4-6",
            "name": "Claude Opus 4.6",
            "contextWindow": 4096,    // ← 问题在这里！
            "maxTokens": 4096         // ← 这个也太小了
          }
        ]
      }
    }
  }
}
```

### 修改为正确值

```json
{
  "id": "claude-opus-4-6",
  "name": "Claude Opus 4.6",
  "api": "anthropic-messages",
  "contextWindow": 150000,
  "maxTokens": 32768,
  "input": ["text"],
  "cost": { "input": 0, "output": 0, "cacheRead": 0, "cacheWrite": 0 }
}
```

保存后重启 Gateway：

```bash
pm2 restart openclaw-gw
# 或
openclaw gateway restart
```

---

## 第 7 页 · 修复报错：让小龙虾自己改

### 更简单的方式

如果你的小龙虾还能对话（比如有其他可用模型），直接发消息：

```
帮我修改模型配置，把 claude-opus-4-6 的 contextWindow 改成 150000，
maxTokens 改成 32768，然后重启
```

小龙虾会自己找到配置文件、修改、重启。

### 添加新模型也一样

```
帮我添加一下模型渠道，模型 id 是 claude-opus-4-6，
apikey 是 sk-xxx，url 是 https://xxx.com，
使用 Anthropic 格式，设置上下文为 150k，并设置为默认模型
```

> 💡 「上下文为 150k」这句别漏，漏了就是后面要讲的"聊着聊着就挂了"。

---

## 第 8 页 · 为什么要用 Claude？

### 国产模型 vs Claude 的差距

OpenClaw 对模型的 Agent 能力和"智商"要求很高。你需要模型能：

- 🧠 记住你配过的十几个工具
- 📋 遵循你写好的工作流程
- 💬 聊几十上百轮之后还不把前面的配置忘了
- 🤖 有"人味儿"，不是机械式回答

国产模型最近做的确实不错，但在 Agent 场景下，群友反馈：

> "配好了小龙虾，工具装了，SOP 也给了。但过两天跟失忆一样，之前配的东西全忘了。一问，果然，用的国产模型。"

目前能稳定胜任 OpenClaw Agent 场景的，Claude 4.6 Opus 是最优选。

---

## 第 9 页 · 便宜 24 倍怎么来的

### API 的"旗舰店"和"经销商"

Anthropic 官方 API：**5 美金 / 百万 token**

但 Anthropic 有两个大金主：亚马逊云（AWS）和 Google。它们都拿到了 Claude 的授权，模型一模一样，但拿货成本更低。

中转站相当于 API 代购，批量开通经销商会员，把 Claude 的回答包装成标准 API 转卖。支持人民币，国内直连，不用翻墙。

### 目前主流渠道

| 渠道 | 价格 | 倍率 |
|------|------|------|
| Anthropic 官方 | 5 美金 / 百万 token | 1x |
| Claude Code 逆向 | ≈ 1.5 元 = 1 美金额度 | 约 5x |
| **Kiro 逆向** | **≈ 0.3 元 = 1 美金额度** | **约 24x** |

> ⚠️ 中转站本质是灰产，有风险。建议小额充值，用多少充多少。

---

## 第 10 页 · 中转站的坑

### 提前知道的风险

1. **渠道随时可能被封**
   - Google Antigravity 渠道 2026 年 1 月已大规模封号
   - Kiro 目前正常，但没人保证什么时候跟进

2. **有掺假的**
   - 有商家拿便宜的 Kiro 渠道冒充 Claude Code 渠道的价格卖
   - 选运营久的、口碑好的、价格不离谱的

3. **上下文不是满血**
   - Kiro 渠道上下文约 150K，不是官方的 200K
   - 这是最容易踩的坑，下一页详细说

### 选站建议

打开 RelayPulse（relaypulse.top），相当于中转站的"大众点评"，24 小时检测可用率和稳定性。选一家稳定的注册即可。

---

## 第 11 页 · 聊着聊着就挂了？

### 这个坑踩的人太多了

OpenClaw 有自动压缩机制，聊久了会把历史对话压缩成精华版腾出空间。

**问题来了：**

- Claude 4.6 Opus 官方上下文 200K
- OpenClaw 按 200K 来算，到 180K 才准备压缩
- 但 Kiro 渠道在 **150K 就满了**
- 结果：到 150K 直接爆了，报错，怎么修都没用

### 表现

聊着聊着突然报错，只能新开会话。问题不在对话内容，在上下文上限。

### 解决方案

配置时把 `contextWindow` 设成 **150000**（而不是 200000）：

```json
"contextWindow": 150000
```

OpenClaw 就会在 120K 左右提前压缩，预留 30K 缓冲，不会爆。

> 💡 这就是为什么前面反复强调"上下文设 150K"。

---

## 第 12 页 · 实操任务 1：检查当前模型配置

### 操作步骤

1. 找到配置文件：
   ```bash
   # Linux/macOS
   cat ~/.openclaw/openclaw.json | grep -A 10 "contextWindow"
   
   # Windows PowerShell
   Select-String -Path "$env:USERPROFILE\.openclaw\openclaw.json" -Pattern "contextWindow"
   ```

2. 检查 `contextWindow` 和 `maxTokens` 的值

3. 如果 `contextWindow` 小于 16000 或缺失，按第 6 页的方法修复

4. 重启 Gateway 验证：
   ```bash
   openclaw gateway restart
   ```

5. 发送 `/status` 确认模型正常加载

### ✅ 成功标志

- `/status` 显示当前模型为你配置的模型
- 能正常对话，不再报 context window 错误

---

## 第 13 页 · 实操任务 2：接入中转站 API

### 操作步骤

1. 打开 RelayPulse（relaypulse.top），选一家稳定的中转站注册

2. 在中转站后台：
   - 进「模型广场」，找 Claude 4.6 Opus，确认价格和渠道
   - 点「令牌管理」→「添加令牌」，**注意选对分组**（每家命名不同）
   - 在「API 信息」页面获取连接地址（Base URL）

3. 小额充值测试（建议先充 10-20 元）

4. 配置到 OpenClaw（二选一）：

   **方式 A：让小龙虾自己配**
   ```
   帮我添加一下模型渠道，模型 id 是 claude-opus-4-6，
   apikey 是 sk-xxx，url 是 https://你的中转站地址，
   使用 Anthropic 格式，设置上下文为 150k，并设置为默认模型
   ```

   **方式 B：手动改配置文件**
   编辑 `~/.openclaw/openclaw.json`，在 `models.providers` 下添加：
   ```json
   "my-relay": {
     "baseUrl": "https://你的中转站地址",
     "apiKey": "sk-你的令牌",
     "models": [
       {
         "id": "claude-opus-4-6",
         "name": "Claude Opus 4.6",
         "api": "anthropic-messages",
         "contextWindow": 150000,
         "maxTokens": 32768,
         "input": ["text"],
         "cost": { "input": 0, "output": 0, "cacheRead": 0, "cacheWrite": 0 }
       }
     ]
   }
   ```

5. 设置为默认模型（在 `agents.defaults.model.primary` 中设置）

6. 重启后发 `/status` 验证

### ✅ 成功标志

- `/status` 显示 Claude 4.6 Opus
- 能正常对话
- 长对话（50+ 轮）不会突然报错

---

## 第 14 页 · 故障排查速查

| 问题 | 原因 | 解决方案 |
|------|------|----------|
| context window too small (4096) | 配置文件中 contextWindow 缺失或太小 | 设置为 150000（Kiro 渠道）或 200000（官方） |
| 聊着聊着突然报错 | 上下文设了 200K 但渠道只支持 150K | 把 contextWindow 改成 150000 |
| 模型调不通 | 中转站分组选错了 | 检查令牌的分组是否对应 Kiro 渠道 |
| 扣的是贵渠道的钱 | 分组选错，走了 Claude Code 渠道 | 重新创建令牌，选对分组 |
| 找不到配置文件 | 可能在旧版目录 | 检查 `~/.clawdbot/` 或 `~/.moldbot/` |
| 修改后没生效 | 没重启 Gateway | `pm2 restart openclaw-gw` 或 `openclaw gateway restart` |

---

## 第 15 页 · 🔒 安全提示

- **API Key 不要发到群里、截图、提交到 Git**
  - 泄露 = 别人花你的钱
- **中转站是灰产，有跑路风险**
  - 小额充值，用多少充多少
  - 不要一次充几百块
- **不要在 soul.md 或对话中暴露 API Key**
  - 使用环境变量或配置文件管理
- **定期检查用量**
  - 在中转站后台查看消耗，设置告警

---

## 第 16 页 · 验收自检

- [ ] 能找到 OpenClaw 配置文件的位置
- [ ] 理解 contextWindow 和 maxTokens 的含义和区别
- [ ] 能排查并修复 "context window too small" 报错
- [ ] 知道 Kiro 渠道上下文要设 150K 而不是 200K 的原因
- [ ] （可选）成功接入中转站 API，能用 Claude 4.6 Opus 正常对话

---

## 第 17 页 · 常见问题

**Q：为什么不直接用 Anthropic 官方 API？**
A：可以用，但贵。5 美金/百万 token，跑几个复杂任务一天几百块。中转站同样的模型便宜 24 倍，适合学习和日常使用。

**Q：Kiro 渠道和官方 API 效果有区别吗？**
A：模型一样，效果一样。区别是上下文上限（150K vs 200K）和稳定性（中转站可能偶尔波动）。

**Q：国产模型真的不行吗？**
A：不是不行，是在 OpenClaw 的 Agent 场景下不够用。如果只是简单问答，国产模型够了。但要让 AI 记住十几个工具、遵循复杂工作流、长对话不失忆，目前 Claude 4.6 Opus 是最优选。

**Q：maxTokens 设大了会怎样？**
A：不会多花钱。maxTokens 是上限，实际用多少算多少。设大只是允许模型在需要时输出更长的回复。

**Q：中转站跑路了怎么办？**
A：换一家就行。配置只需要改 baseUrl 和 apiKey，模型 id 不变。所以搞懂原理比记住某家中转站更重要。

---

## 第 18 页 · 今日总结

### 你学到了 🎉

- 模型配置报错的排查思路：看日志 → 找配置文件 → 改参数 → 重启
- contextWindow 和 maxTokens 的含义和推荐值
- Kiro 渠道 150K 上下文的坑和解决方案
- 低成本接入 Claude 4.6 Opus 的方法

### 一句话总结

> 不要花时间省 token，花时间让 token 烧得更有价值。但把"省"这件事一次性解决掉，后面就能专注于用。

---

## 第 19 页 · 延伸阅读

- [RelayPulse 中转站评测](https://relaypulse.top) —— 中转站的"大众点评"，24 小时检测可用率
- [Anthropic API 文档](https://docs.anthropic.com/en/docs) —— 官方 API 参考
- [OpenClaw 模型配置文档](https://openclaw.io/docs/models) —— 官方模型配置说明