![OpenClaw 2.6 调教实录：从崩溃 4671 次到省 50% token](https://mmbiz.qpic.cn/mmbiz_jpg/IzH5BgecYStjLIsNxiapCEHd0KAffUumFwmOia8EuPRRT5epVEMF0ibOFKWTzOOMcwRcdKt1bmOhxezPrTW5iaxZxSvEaqdhjpHSVyvEicGatices/0?wx_fmt=jpeg)

# OpenClaw 2.6 调教实录：从崩溃 4671 次到省 50% token

> **作者**: 孟健的AI编程认知
> **发布日期**: 2026年2月9日 14:53
> **来源**: [原文链接](https://mp.weixin.qq.com/s/fOkBFeul10pxqqCtUAecEw)

---

大家好，我是孟健。

我的AI助手偷偷崩了4671次，我一点没察觉。

直到有一天，我发现定时任务连续3天没跑——每天早上的选题推送、晚上的X运营候选、认证监控……全部静悄悄消失了。我以为是bug，顺手一查，挖出了一个让我后背发凉的坑。

这篇文章记录我怎么排查这个事故，以及趁机把 OpenClaw 2.6 做了一次全面体检——**最终 token 费用降了 30-50%，记忆不再丢失**。

所有配置都可以直接抄。

![文章图片](https://mmbiz.qpic.cn/sz_mmbiz_png/IzH5BgecYSsOwJNib2UPE4icThUWpX9kkS6SrwoDgGFvcyyU0aIj00rNbAQd3n4OAfRtNACTsUa7oTFS52HlA8BH0v6Twhq8XHDZ7CibVlFkF0/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=0)

**01 事故现场：4671次无效 重启**

我用的是 OpenClaw 2.6，一个可以7×24小时运行的AI助手框架。它帮我管公众号选题、Twitter运营、日程提醒，基本是我的"数字员工"。

那天我跑了一句命令看服务状态：

```
journalctl --user -u openclaw-gateway --since "3 days ago" | grep "start" | wc -l
```

**4671。**

![文章图片](https://mmbiz.qpic.cn/sz_mmbiz_png/IzH5BgecYSvqcqseWibk4W89ZDjm1zK5mUcL6iaINkNLRdEN1yECKjK9ysgUQvutDAMtr6RKntSSFuew7js7gHEhM9Qsq2SlPSLOrLGUt3mJ4/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=1)

三天，4671次重启。平均每5秒崩一次，再起来，再崩，无限循环。

更可怕的是——**我完全不知道。** 因为用户级的服务一直正常跑着，该回复消息照样回复。只是 cron 调度器被搞乱了，定时任务全部漏跑了3-4天。

**根因：两个同名服务打架**

排查下来，原因出奇地蠢：

-   **用户级服务**（`~/.config/systemd/user/openclaw-gateway.service`）：正常运行，占着18789端口
    
-   **系统级服务**（`/etc/systemd/system/openclaw-gateway.service`）：每5秒尝试启动，发现端口被占，立即退出，systemd 又拉起来……
    

两个同名服务，一个占着端口好好的，一个疯狂撞墙。**36小时的CPU白白浪费**，cron 调度器的状态被反复刷乱，`nextRunAtMs` 跳到了未来某个不存在的时间。

怎么来的？大概率是某次运行 `openclaw gateway install` 时，系统级和用户级各生成了一个服务文件。

**教训：升级或重装 OpenClaw 后，跑一句 \`systemctl list-units | grep openclaw\` 确认没有重复服务。**

**02 三步修复**

修复过程反而简单，3条命令搞定：

```
# 1. 停掉并禁用多余的系统级服务sudo systemctl stop openclaw-gateway.servicesudo systemctl disable openclaw-gateway.service# 2. 删除系统级服务文件（建议先备份）sudo rm /etc/systemd/system/openclaw-gateway.service# 3. 重载 systemdsudo systemctl daemon-reload
```

保留用户级服务正常运行就行。

**03 全身体检：9项配置优化**

修完事故，我想：都拆开了，干脆对照 OpenClaw 2.6 的最新文档做个全面体检。

最终调了9项，效果是 **token 费用降了 30-50%，记忆不再丢失，体验明显提升**。

以下逐条说，每条都可以直接抄。

![文章图片](https://mmbiz.qpic.cn/sz_mmbiz_png/IzH5BgecYStykbSVNWEhWkibsMFYXNma8e3eTdgqdfsn5K5XqI6tW4vvM0cHib9zsHFFocpU3gLtibStzeOGQ75pm1cjoMyepnyc3tW0QcgdS0/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=2)

**① contextPruning：自动裁剪旧内容，省 token**

```
"contextPruning": {  "mode": "cache-ttl",  "ttl": "5m"}
```

**Before**：每次对话把所有历史 tool 输出都带上，token 越聊越多。

**After**：超过5分钟的 tool 输出自动裁剪，上下文保持精简。

这一项大概能省 **20-30% 的 token**。

注意：这只影响发给 LLM 的上下文，不会删除磁盘上的 session 历史（.jsonl 文件保持完整）。

**② compaction safeguard：防记忆丢失**

```
"compaction": {  "mode": "safeguard",  "memoryFlush": true}
```

OpenClaw 会在对话太长时自动压缩上下文（compaction），但默认模式下压缩时可能把重要记忆挤掉。

`safeguard` 模式会在压缩前触发一次"记忆刷盘"——把关键信息写到 MEMORY.md，**确保什么都不丢**。

**没有记忆的AI助手就是个高级复读机。** 这项必开。

**③ subagents 模型降级：省60%费用**

```
"subagents": {  "model": "minimax/MiniMax-M2.1",  "archiveAfterMinutes": 30}
```

**Before**：子任务（cron 定时任务、后台处理）默认继承主模型 Claude Opus 4.6，贵。

**After**：子任务用 MiniMax-M2.1，费用只有 Opus 的 1/3 左右。

大部分 cron 任务不需要最强模型——发个早报、跑个监控，够用就行。**把好钢用在刀刃上。**

`archiveAfterMinutes` 从60降到30，子 session 更快回收，减少内存占用。

**④ heartbeat 降频 + activeHours**

```
"heartbeat": {  "intervalMinutes": 120,  "activeHours": "08:00-24:00"}
```

**Before**：每30分钟心跳一次，7×24小时不间断。每天48次心跳。

**After**：每2小时一次，只在早8点到晚12点。每天8次。

**一个人睡觉的时候，不需要有人每30分钟戳一下看你醒没醒。**

**⑤ identity：让AI认识自己**

```
"identity": {  "agents": {    "main": {      "name": "小墨",      "emoji": "🐈⬛"    }  }}
```

配了之后，AI 在群聊里能识别 @小墨 ，自动 ack reaction 也带上身份标识。小事，但体验好很多。

**⑥ inbound debounce：连续消息合并**

```
"inbound": {  "debounceMs": 3000}
```

你在 Telegram 连发3条消息，OpenClaw 不会触发3次处理，而是等3秒合并成一次。**省 token，也省你等3次回复的时间。**

**⑦ session reset：自然过期**

```
"session": {  "resetMode": "idle",  "idleMinutes": 240}
```

4小时没聊天就重置 session。比固定时间重置更自然——深夜聊到2点也不会被打断。

**⑧ userTimezone：时区修正**

```
"userTimezone": "Asia/Shanghai"
```

别小看这个。时区不对，AI 说的"今天""明天"全是乱的，cron 任务的触发时间也会偏移。**基础设施级的配置，第一天就该设好。**

**⑨ cron 链接修复**

升级2.6后一些旧配置没跟着更新：

-   文档索引的 URL 还指向旧域名 `docs.clawd.bot`，改成了 `docs.openclaw.ai`
    
-   认证监控的命令还是旧的 `clawdbot`，改成了 `openclaw`
    

**升级框架版本后，一定要检查 cron 任务里的硬编码路径和命令。** 这种隐形bug不会报错，只是默默失效。

**04 进阶：用 QMD 替代默认记忆搜索**

做完基础体检，我又研究了一个社区里很多人在用的省 token 方案：**QMD**。

QMD 是一个本地优先的搜索工具，用 BM25 + 向量 + 重排序 三重机制来检索 Markdown 文件。OpenClaw 2.6 原生支持它作为记忆后端。

**为什么要换？**

默认的记忆搜索用远程 embedding API（OpenAI / Gemini / Voyage），每次搜索都要调一次 API。QMD 跑在本地，**零 API 费用，零延迟，数据不出机器**。

社区有人反馈用 QMD 后 token 节省了 **60-97%**（因为它只拉最相关的2-3句话进上下文，而不是把整段记忆塞进去）。

**怎么配？**

```
# 1. 安装 QMDbun install -g https://github.com/tobi/qmd# 2. 确认 qmd 命令可用qmd --version
```

然后在 OpenClaw 配置里加一行：

```
"memory": {  "backend": "qmd"}
```

重启 Gateway 生效。Markdown 文件仍然是唯一的"真相来源"，QMD 只负责检索。

**注意事项**

-   QMD 目前还是实验性功能（experimental），建议先在子 agent 上测试
    
-   需要单独安装 QMD CLI
    
-   如果你的记忆文件不多（<50个），默认的 SQLite 向量搜索其实也够用
    

**05 OpenClaw 2.6 还有什么新东西？**

顺带整理一下 2.6 的关键更新，帮你判断值不值得升级：

-   **模型支持**：原生支持 Anthropic Opus 4.6 和 OpenAI Codex gpt-5.3-codex
    
-   **xAI (Grok) 接入**：可以用 Grok 作为 provider 了
    
-   **Web UI token 仪表盘**：直接看 token 消耗趋势
    
-   **Voyage AI 原生支持**：记忆向量搜索多了一个 embedding 选择
    
-   **Cron 调度修复**：修了好几个定时任务漏跑和提醒不送达的 bug（这个我深有体会）
    
-   **安全增强**：skill/plugin 代码安全扫描，config.get 响应自动脱敏
    
-   **Compaction 重试**：上下文溢出时允许多次压缩重试，不会直接崩
    

**如果你还在用 2.5 或更早版本，强烈建议升级。** 尤其是 cron 调度的修复，2.5 的 cron 在某些场景下会默默停跑。

**最终效果**

指标

Before

After

Token 费用

基准

降低 30-50%

记忆丢失风险

有

基本消除

子任务费用

Opus 全量

降低 60%+

无效心跳

48次/天

8次/天

Cron 任务

漏跑3-4天

全部恢复

记忆搜索

远程 API

本地 QMD（可选）

**写在最后**

AI助手不是装完就能跑一辈子的。

它就像一辆车——你得定期保养，检查机油、轮胎、刹车。不然哪天高速上抛锚，你才发现发动机早就拉缸了。

我的这次"体检"发现了一个跑了4671次的隐形故障，顺带优化出 30-50% 的成本节省。**总共花了不到2小时。**

如果你也在用 OpenClaw，建议你现在就跑一句：

```
systemctl list-units | grep openclaw
```

看看有没有"幽灵服务"在偷偷消耗你的资源。

**工具会变强，但不会自己变好。调教它的人，才是真正的竞争力。**

---

OpenClaw 交流群（群满可以在公众号后台回复openclaw入群）：

![文章图片](https://mmbiz.qpic.cn/mmbiz_jpg/IzH5BgecYSu0dgHf5QjcicGT6E6pAjUzBSxMfoPNiczEwQC1AQdzQibA1QJMtwBcVhJ6Hc6ImsTYhkCooDaAYkqZ1wKPIxprZzF878araibXxow/640?wx_fmt=jpeg&from=appmsg&watermark=1#imgIndex=3)

🚀 想要与更多AI爱好者交流，共同成长吗？

[和一群志同道合的人，持续精进 AI 的每一天](https://mp.weixin.qq.com/s?__biz=Mzk0ODM5NTEyNA==&mid=2247500204&idx=1&sn=8623ff02362512fb3c63cc6d183a9793&scene=21#wechat_redirect)

![我的微信](https://mmbiz.qpic.cn/mmbiz_png/IzH5BgecYStne6g435Rq2rXELicT7bg5nicWkvsl8QuZRQY2oDLYuVpnUZAHfTU97FHj46xVF18rHicrgvhI6kOm1Sm0XibTVMia0QoaP91BQ4PU/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=4)

  

📚 精选文章推荐

-   [吹爆 OpenClaw！一个人 +6 个 AI 助理，我再也不想招人了](https://mp.weixin.qq.com/s?__biz=Mzk0ODM5NTEyNA==&mid=2247505033&idx=1&sn=b6cf6fd439b467f4a22941440247038e&scene=21#wechat_redirect)
    
-   [16 个 AI Agent 协作从零写出 C 编译器，还能编译 Linux 内核——Claude 4.6 做到了](https://mp.weixin.qq.com/s?__biz=Mzk0ODM5NTEyNA==&mid=2247505018&idx=1&sn=1ed02d6269b31b41cd4a8973ffbbc9a7&scene=21#wechat_redirect)
    
-   [神仙打架！Claude Opus 4.6 vs GPT-5.3-Codex 同日发布，AI 编程格局要变了](https://mp.weixin.qq.com/s?__biz=Mzk0ODM5NTEyNA==&mid=2247505006&idx=1&sn=0fca9729b7ce37af0adad517db226dfe&scene=21#wechat_redirect)
    
-   [Claude 一个插件，让全球软件股蒸发 2850 亿美元](https://mp.weixin.qq.com/s?__biz=Mzk0ODM5NTEyNA==&mid=2247504993&idx=1&sn=56449a3fea330d9286078a0d58f77627&scene=21#wechat_redirect)
    
-   [我做了个 OpenClaw 入门站，7天教程 + 70篇资源全网最全](https://mp.weixin.qq.com/s?__biz=Mzk0ODM5NTEyNA==&mid=2247504983&idx=1&sn=7ff5d6453836af9e41475b42c20c1750&scene=21#wechat_redirect)
    
-   [OpenAI 放大招：Codex 独立 App 上线，一次跑 10 个 AI Agent 帮你写代码](https://mp.weixin.qq.com/s?__biz=Mzk0ODM5NTEyNA==&mid=2247504786&idx=1&sn=d615be741321dd323c77aa99687f1ae7&scene=21#wechat_redirect)
    
-   [OpenClaw 101 上线啦！7 天从 0 跑到自动化（35+ 教程已整理）](https://mp.weixin.qq.com/s?__biz=Mzk0ODM5NTEyNA==&mid=2247504654&idx=1&sn=cf7b5c2f0769c26cf5d4e26062f8d076&scene=21#wechat_redirect)
    
-   [月费 8 块的 AI 私人助手，不会写代码也能搭（OpenClaw 零基础教程）](https://mp.weixin.qq.com/s?__biz=Mzk0ODM5NTEyNA==&mid=2247504624&idx=1&sn=992f79971bd5890ece97d41ad1c3b85b&scene=21#wechat_redirect)
    
-   [一周 10 万 Star 的 OpenClaw，我花 4 天把它变成了 80+技能的私人全能助手](https://mp.weixin.qq.com/s?__biz=Mzk0ODM5NTEyNA==&mid=2247504582&idx=1&sn=e778e6dc16e7db6554545812968b6d99&scene=21#wechat_redirect)
    
-   [免费接入 Stripe，不到 2 小时搞定：OpenCode + K2.5 实操全流程](https://mp.weixin.qq.com/s?__biz=Mzk0ODM5NTEyNA==&mid=2247504360&idx=1&sn=8a3699121e3621d05736ab2c99a03ca9&scene=21#wechat_redirect)