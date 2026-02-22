![一周 10 万 Star 的 OpenClaw，我花 4 天把它变成了 80+技能的私人全能助手](https://mmbiz.qpic.cn/mmbiz_jpg/ta0Hx5vm0hN1aNgrZSuD1JsicJ00nLrnEQRicnZvnniasJv2uckNRrDtvZicNb3rlJrlYBTib5quWydFnOa5cCgjR6Q/0?wx_fmt=jpeg)

# 一周 10 万 Star 的 OpenClaw，我花 4 天把它变成了 80+技能的私人全能助手

> **作者**: 孟健的AI编程认知
> **发布日期**: 2026年1月31日 16:52
> **来源**: [原文链接](https://mp.weixin.qq.com/s/gC_69VvFmVYee8oR9dquww)

---

大家好，我是孟健。

全网最火的开源项目，你可能已经刷到了——**一周 10 万 Star，200 万次访问，Forbes、CNET、IBM 轮着报道，Andrej Karpathy 亲自站台推荐。**

它叫 OpenClaw。我花了 4 天，把它变成了一个拥有 80+技能、7×24 在线的私人运维。月费不到 100 块。

上次我写过一篇搭建 7×24 小时 AI 助手的文章，不少朋友私信问细节。那篇只是开了个头——当时系统刚跑起来，能聊天，能记事，但离"能干活"还差得远。

**这次，我把它彻底搞完了。从"能对话"变成"能替你干任何事"，质变了。**

今天这篇，把 4 天的搭建过程、5 个杀手级场景、成本明细、踩坑经验全交代清楚。

  

01 OpenClaw 是什么，为什么火成这样

先讲个段子。这项目 5 天改了 3 次名。

![文章图片](https://mmbiz.qpic.cn/mmbiz_png/ta0Hx5vm0hN1aNgrZSuD1JsicJ00nLrnEJibEXibR1xkIWD6ia8ppjg6e0k7ybWTYuvchOKwBZxbM6vicPzyIpYdicoQ/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=0)

最早叫 Clawdbot，创始人 Peter Steinberger 周末随手写的——一个跑在你自己服务器上的 AI Agent，通过 Telegram 或 Discord 跟你对话，能读文件、跑命令、上网搜索、操作浏览器，还有长期记忆。

说白了，**是一个真正住在你服务器上的 AI 员工。**

没想到一夜爆火。然后 Anthropic 的律师函来了——"Clawd 这个名字和 Claude 太像了，改。"

行，改。改成 Moltbot。

结果 24 小时内，moltbot.com 被人抢注了，更离谱的是，有人发了同名加密货币割韭菜。

再改。最终定名 OpenClaw。

**5 天 3 次改名，每改一次上一波热搜。**

这大概是开源史上最魔幻的品牌事件——完全不是策划的，但传播效果比任何营销都猛。

Peter 本人都在推特上哭笑不得。

回到产品本身。OpenClaw 的核心价值就一句话：**让你用自然语言操控自己的服务器。**

它不是 ChatGPT 那种纯聊天，它能动手。你说"重启 Docker"，它真的帮你重启。

你说"看下昨天流量"，它真的调 API 给你拉数据。

加上社区贡献的海量 Skills（技能插件），它几乎可以干任何事。

  

02 4 天搭建全记录

我从 1 月 27 号开始，到 31 号基本成型。逐天讲，重点说踩坑和转折。

**Day 1（1/27）：部署 + 破冰**

Hetzner 开了台 CPX31，一行命令直接跑起来。

![文章图片](https://mmbiz.qpic.cn/mmbiz_png/ta0Hx5vm0hN1aNgrZSuD1JsicJ00nLrnEghyUUttGtrEDI91DRnpBibYnRN67bEdfKNzVel7a3yEPVfsXic0LlTicA/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=1)

第一次对话就惊了——不是那种客服式的"有什么可以帮您"，是真的能在终端里执行命令、读写文件。

当天干了两件关键的事：配好记忆系统（MEMORY.md + 每日记忆文件），给它取名**小墨**，设定了赛博黑猫的人设。

你可能觉得取名没有必要。但后来的体验证明，**有人设的 AI，你用起来会完全不一样。**

你会更自然地跟它对话，它的回复也更有性格和一致性。

**Day 2（1/28）：让它"认识"我**

这天做了件特别有成就感的事。让小墨通过无头浏览器，自己去公众号抓我写过的文章，通读之后生成了一份"主人画像"。又装了 markitdown PDF 解析工具，让它读完了我的所有 PDF。

![文章图片](https://mmbiz.qpic.cn/mmbiz_png/ta0Hx5vm0hN1aNgrZSuD1JsicJ00nLrnEnoAOO6IfbpW0he0BFiaiaDUTzjlpFDr0SX5BxiaerFSCj2yJVicG2ibG0kQ/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=2)

**读完之后，它知道我在做什么产品、用什么技术栈、关注什么方向。**

后续交互的效率直接翻倍——不用每次都重新解释背景了。

同一天，我的美国公司 Nextfield Labs LLC 注册完成。小墨在记忆里帮我记了这件事。

![文章图片](https://mmbiz.qpic.cn/mmbiz_png/ta0Hx5vm0hN1aNgrZSuD1JsicJ00nLrnE0icgGCw3rxzibC2JvMqWrdBeesyBtHgHHuSCOCPPWTiauSASnBu0q9a6A/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=3)

**Day 3（1/29）：踩坑大修**

这天几乎全在救火。Claude 被限制，OpenRouter API 配置出了问题，模型频繁超时，对话动不动断掉。

![文章图片](https://mmbiz.qpic.cn/mmbiz_jpg/ta0Hx5vm0hN1aNgrZSuD1JsicJ00nLrnEhzfMe3cj3YMhiaBsbLWRFNkhUjTOM3gic5q7lhIeNDG1wic9qGwhOhUcA/640?wx_fmt=jpeg&from=appmsg&watermark=1#imgIndex=4)

折腾半天，最后的方案是设 **fallback****链**：Claude Opus 4.5 → GPT-5.2 → MiniMax M2.1。主力模型挂了自动切备用，保证 7×24 不断线。

还修了一个安全隐患——文件权限没收紧，AI 理论上能碰到它不该碰的东西。

**这个必须修。给 AI 发大权限又不做隔离，迟早出事。**

![文章图片](https://mmbiz.qpic.cn/mmbiz_jpg/ta0Hx5vm0hN1aNgrZSuD1JsicJ00nLrnEY5q11YJHDmMLtBer3LKtwPictIR8GHyNuUy7ib1rXuUQd1nk3h5gkRHA/640?wx_fmt=jpeg&from=appmsg&watermark=1#imgIndex=5)

不光彩的一天，但最重要的一天。基础不牢，后面全白搭。

**Day 4（1/30-31）：技能大爆发**

这天是质变。一口气安装了 44 个新技能，加上之前的，**总计 80+**。

![文章图片](https://mmbiz.qpic.cn/mmbiz_png/ta0Hx5vm0hN1aNgrZSuD1JsicJ00nLrnEGLFdKWIPyoI1h6APvyCgJW9786icCJhdhjFAIugXKqeqR9X5Tq1MhKA/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=6)

几个重要的里程碑：

-   搭了 **Plausible 自托管统计**，替代 Google Analytics，数据完全在自己服务器上
    
-   配好 **OpenCode + VSCode 远程开发环境**，小墨可以直接在我项目里读代码、改代码
    
-   打通**浏览器远程控制**——我在手机上发条 Telegram 消息，小墨就能打开网页、填表单、截图
    
-   接入 **Google Workspace +****GSC****\+ GA4**，全链路数据自动化
    

![文章图片](https://mmbiz.qpic.cn/mmbiz_png/ta0Hx5vm0hN1aNgrZSuD1JsicJ00nLrnEIkN254C333OfAEXce3oIMLtkiap3Y8wLOeKbiaiatdYQb1Yx94hbt9CKw/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=7)

它直接**反向控制了我的 windows 电脑的浏览器**，这是个非常大的突破！

**4 天。从"能聊天"变成了"能替你干活"。**

  

03 它现在能干什么

不罗列功能。说 5 个我每天真实在用的场景。

**场景一：一句话查网站数据**

Telegram 里发一句"看下 xxx 昨天的流量"。30 秒，小墨调 GA4 API 返回结果——UV、PV、来源分布、热门页面、跳出率，全有。以前我得登后台，选日期，点报表，至少 5 分钟。**现在 5 秒钟，而且躺在床上就能看。**

\*\*场景二：\*\***SEO****机会自动发现**

"xxx 最近什么词排名涨了？" 小墨调 Google Search Console，按曝光量排序，标出"高曝光低点击"的机会词，还会建议我优化哪些页面的 Title 和 Description。这以前是请 SEO 外包才能干的活。

**场景三：服务器运维零****SSH**

"重启一下 Docker 里的 plausible 服务。" 它直接跑 docker compose 命令，看日志，确认服务正常，把结果贴回来。我连终端都不用开。半夜服务挂了？发条消息就修了。

**场景四：技术调研提速 10 倍**

"帮我调研一下 Stripe 最新的 Pricing API 怎么用。" 它上网搜索、读官方文档、翻 Stack Overflow、总结要点，附上可用的代码示例。以前这种调研我至少花一小时，现在 **5 分钟拿到结果，质量还不差。**

**场景五：直接在项目里写代码**

通过 OpenCode 集成，小墨可以在我的代码仓库里读代码、改代码、跑测试。我用自然语言描述需求，它改完告诉我动了哪几行、为什么这么改、测试是否通过。

![文章图片](https://mmbiz.qpic.cn/mmbiz_png/ta0Hx5vm0hN1aNgrZSuD1JsicJ00nLrnEoRQr4oIPUERTHSGL8l4LWibccNIib4I3FJqK33PcgzEolAsogUonrX7A/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=8)

**这 5 个场景叠在一起，覆盖了一个初级运维 + 半个****SEO****专员 + 半个技术助理的工作量。**

一个人做出海，这个组合够了。最主要的是远程遥控，我在家就能让它 24 小时干活。

  

04 算一笔账

来，掏计算器。

服务器 Hetzner CPX31：40 元。

Claude Pro 账号：140 元。

其他额外成本（其他账号、按量计费）：20 元。

**总计：每月 150-250 元。**

对比一下市场价：

-   兼职运维：3000-5000 元/月
    
-   SEO 外包：2000-8000 元/月
    
-   技术/运营助理：5000+/月
    

我不是说小墨能 100%替代这些角色。复杂的架构设计、关键的业务判断，还需要人来决策。

但那些重复性的琐事呢？查数据、跑脚本、读文档、改配置、看日志、做调研——**这些占了日常工作量的 70%以上。** 小墨全能接。

**对个人来说，月费 200 块，省下来的时间值多少钱，自己算。**

  

05 踩坑经验

5 条，都是真金白银换来的。

**1\. 模型必须配****fallback****链。** 没有任何一个模型能保证 100%可用。设主力 + 备用 + 兜底，三层保险。不然关键时刻 AI 断线，你比没有 AI 还惨——因为你已经依赖它了。

**2\. 权限隔离第一天就要做。** OpenClaw 默认对服务器有很大权限。把敏感目录、关键配置做好隔离和备份。AI 不会故意搞破坏，但它会犯错。犯错时你得兜得住。

**3\. 记忆系统是灵魂。** 没有记忆的 AI 助手就是个高级复读机。花时间配好 MEMORY.md 和每日记忆文件，让它记住你的项目、偏好、上下文。**同样的问题，有记忆和没记忆的回答质量，差距巨大。**

**4\. 技能按需装，不要贪多。** 80+技能听着唬人，我日常高频用的也就十几个。先把核心场景打通，其余按需加。装太多反而会让 AI 选择困难。

**5\. 先跑起来，再慢慢调。** 不要追求一步到位。Day 1 能对话就行，Day 2 加记忆，Day 3 修问题，Day 4 堆技能。渐进式的效果远好于一次性堆满。

  

写在最后

很多人还在讨论"AI 会不会替代程序员"。我觉得这个问题问反了。

**真正的问题是：一个拥有全能助理的人，能干多少人的活？**

我现在的答案是：**一个人 + 一只赛博黑猫，约等于一个 3 人小团队。**

4 天搭建，月费 200 块，80+技能，7×24 在线。不请假，不摸鱼，凌晨 3 点发消息也秒回。

这不是未来。这就是 2026 年 1 月，已经在跑的东西。

**工具就摆在那里。用不用，是你的事。**

  

**如果你也想搭建自己的 AI 助理，或者对 OpenClaw 感兴趣，欢迎在评论区聊。**

**如果这篇文章对你有帮助，点个「在看」让更多人看到。**

  

🚀 想要与更多AI爱好者交流，共同成长吗？

[和一群志同道合的人，持续精进 AI 的每一天](https://mp.weixin.qq.com/s?__biz=Mzk0ODM5NTEyNA==&mid=2247500204&idx=1&sn=8623ff02362512fb3c63cc6d183a9793&scene=21#wechat_redirect)

![我的微信](https://mmbiz.qpic.cn/mmbiz_png/ta0Hx5vm0hN1aNgrZSuD1JsicJ00nLrnEhKbjnaaq2xUEiaQODGUKw3wTA5YurqvoEqOcia0aBXWu8oR2wTsxeNibA/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=9)

  

#### 📚 精选文章推荐

[免费接入 Stripe，不到 2 小时搞定：OpenCode + K2.5 实操全流程](https://mp.weixin.qq.com/s?__biz=Mzk0ODM5NTEyNA==&mid=2247504360&idx=1&sn=8a3699121e3621d05736ab2c99a03ca9&scene=21#wechat_redirect)

[花一天研究了 565 个 Skills，我的 Clawdbot 比 ChatGPT 更懂我！](https://mp.weixin.qq.com/s?__biz=Mzk0ODM5NTEyNA==&mid=2247504250&idx=1&sn=f64623fa5fcb6c09c512f0f56c3fae94&scene=21#wechat_redirect)

[Kimi K2.5 多 Agent 一键做站实测：国产最强大模型能交付到什么程度？](https://mp.weixin.qq.com/s?__biz=Mzk0ODM5NTEyNA==&mid=2247504223&idx=1&sn=4855bb5d5d3fc09a639a7999404c7cad&scene=21#wechat_redirect)

[我给自己部署了一个 7×24 小时的 AI 私人助理（Clawdbot 完整部署指南）](https://mp.weixin.qq.com/s?__biz=Mzk0ODM5NTEyNA==&mid=2247504122&idx=1&sn=d98663dbed761162f9e9c395ee2217c7&scene=21#wechat_redirect)

[AI 时代接入 PayPal 订阅支付有多简单？我用三轮对话把整套系统跑通了（含 Webhook 调试）](https://mp.weixin.qq.com/s?__biz=Mzk0ODM5NTEyNA==&mid=2247504106&idx=1&sn=91d98bfbbd15ede35f60436186b496c7&scene=21#wechat_redirect)

[程序员的“死期”定了？](https://mp.weixin.qq.com/s?__biz=Mzk0ODM5NTEyNA==&mid=2247504082&idx=1&sn=d22c55a9e374a8f574b1961ad6191a94&scene=21#wechat_redirect)

[AI越学越快，人却越容易沉迷](https://mp.weixin.qq.com/s?__biz=Mzk0ODM5NTEyNA==&mid=2247504067&idx=1&sn=5f2ae5e631e25e408532644ae0601d4a&scene=21#wechat_redirect)

[AdSense 被判无效流量？官方聊完后我总结了 8 条避坑](https://mp.weixin.qq.com/s?__biz=Mzk0ODM5NTEyNA==&mid=2247504038&idx=1&sn=ddefdeb6898e6291f9b1eab9a1c33a9d&scene=21#wechat_redirect)

[字流 2.0 发布：我把 14 个平台的发布流程压到 10 分钟](https://mp.weixin.qq.com/s?__biz=Mzk0ODM5NTEyNA==&mid=2247503909&idx=1&sn=3645c69cf23c97f72226615008a33930&scene=21#wechat_redirect)

[出海收款门槛又低了：PayPal 支持个人卖家账户（亲测 30 分钟通过）](https://mp.weixin.qq.com/s?__biz=Mzk0ODM5NTEyNA==&mid=2247503579&idx=1&sn=9a27c0d31457c0ed4b633fa825f630ee&scene=21#wechat_redirect)