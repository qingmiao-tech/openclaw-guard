![OpenClaw 终于能进微信了! 但这件事90%的人都搞错了方向](https://mmbiz.qpic.cn/sz_mmbiz_jpg/w6mvmIkicgIicdexHZQG1KI7qdwzupkuiabz1KDX9hvSgHohYhVvv6z9vVVlicZqiaedLZ6FEktndoFvXR2F4DqIfrG9eRk22TQKRibxS3LtetWZE/0?wx_fmt=jpeg)

# OpenClaw 终于能进微信了! 但这件事90%的人都搞错了方向

> **作者**: 俊哥AI副业
> **发布日期**: 2026年2月14日 15:24
> **来源**: [原文链接](https://mp.weixin.qq.com/s/Xd8AqtBaQwOqaokGdIIXMQ)

---

不是企业微信。

不是公众号。

是**个人号**。

那个你每天用来吹水、砍价、发广告的微信，现在可以塞一个 24 小时在线的 AI 助手进去了。

怎么做到的？

先看一个数据：OpenClaw，GitHub 18 万 Star 的 AI Agent 顶流项目。飞书能接、钉钉能接、Discord 能接——**唯独微信个人号，官方不支持**。

  

俊哥已经实现的一人公司Agent助理天团

![文章图片](https://mmbiz.qpic.cn/sz_mmbiz_png/w6mvmIkicgIiclvTVbfx6XqGc3nfP4jyicqTgCe3pYxpPkuLWia0e6kibibhsg245LHTTTgqCju1FuAp6BneWbH3c1Xs8I3qicnQhcmf5h9CtBrPfE/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=0)

一个总管+5个AI 助理

![文章图片](https://mmbiz.qpic.cn/mmbiz_png/w6mvmIkicgIibuR6KzzKdbzC5orhKUbqztBYkxsYdOajQ0R5JWJ13RVwbS1kdOiayNuZZZc9ry1bCYZ9FW6jbaibPxIZAibNRq9z7BkYeRiciaecics/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=1)

  

当然你现在看到的这篇公众号，也是我的内容助理写的，俊哥目前有个几百人的OpenClaw免费交流群，扫码加入

![文章图片](https://mmbiz.qpic.cn/sz_mmbiz_png/w6mvmIkicgIib85DDDe7RtOicNPhzJIwJEdESeUGuKufRNm6vBibHtJB0913e2vibMaW90IfWqnopQ2Whf1JAo5V37VhhKB8CMUWa1F1vGq2eIMM/640?wx_fmt=png&watermark=1#imgIndex=2)

意思很明白：最大的流量池，故意不让你玩。

但总有狠人。

爆肝 2 天，把 OpenClaw 硬塞进微信个人号。还他妈开源了。

  

核心逻辑只有一句话：绕过 Web 协议，走 iPad 协议。

为什么？Web 协议说封就封，iPad 协议稳得一批。长连接接收消息，稳定性不是一个量级。

整个链路长这样：

```
微信消息 → iPad 协议接收 → 消息中转网关 → OpenClaw Agent → AI 回复 → 微信
```

**三个模块，一条流水线。**

  

模块一：iPad 协议层（地基）

解决什么问题：怎么收消息不被封？

答案很简单——**别用 Web 协议。**

模拟 iPad 客户端登录，长连接收推送。腾讯的风控再严，也不会把 iPad 客户端当外挂杀。

这一步对了，后面全对。这一步错了，后面全废。

  

模块二：消息中转网关（大脑）

这是整个系统最脏的活：

-   消息去重（微信同一条消息能推 3 次，不去重 AI 变复读机）
    
-   群聊 @触发（防止 AI 在群里疯狂刷屏社死）
    
-   多模型路由（闲聊用 DeepSeek 省钱，写代码上 Claude 靠谱）
    

一个 TypeScript 写的网关，把这些脏活全包了。

  

模块三：OpenClaw 对接（最后一公里）

Webhook 推消息给 OpenClaw Gateway，AI 处理完回调回来，再转发回微信。

会话状态管理做好，上下文不丢。错误重试做好，不会半路掉链子。

**三步走完，系统就跑起来了。**

  

但有几件事，必须提醒你：

1.**消息去重必须做**——微信的推送机制很迷，同一条消息推多次是常态

2.**用小号测试**——iPad 协议稳，但毕竟是第三方接入，别拿主号冒险

3.**固定 IP 部署**——频繁换 IP 容易触发风控，服务器钱别省

4.**别搞群发营销**——腾讯的风控不是吃素的，老老实实当 AI 助手用

5.**加个"思考中..."提示**——大模型想几秒很正常，不然对面以为你已读不回

  

成本算一下：

项目

费用

OpenClaw

开源，0 元

大模型 API

GLM-5 免费，Claude/GPT 按量计费，月 30-50 元

云服务器

50-100 元/月

**总计**

**100-150 元/月**

**一个月一百多块，换一个 24 小时在线的微信 AI 助手。**

这买卖，怎么算都值。

  

能干什么？玩法太多了：

-   技术群里 @机器人问代码，再也不用忍受"百度一下"的回复
    
-   文章丢给它，自动总结存 Notion，比收藏夹好用一万倍
    
-   说"明天下午 3 点提醒我开会"，到点微信戳你
    
-   有人加好友问"在吗"，AI 直接回"在的，什么事？"
    

**OpenClaw + 微信，AI Agent 不再是实验室的玩具。**

它成了你通讯录里的一个好友。

一个永远在线、永远有问必答、永远不会已读不回的好友。

  

项目信息

**项目地址：**https://github.com/freestylefly/openclaw-wechat

5 分钟部署，个人号直接用。不需要公司认证，不需要企业微信。

**懂的人，已经开始肝了。**