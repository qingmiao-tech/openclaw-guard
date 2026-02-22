![别乱装！OpenClaw Skills安全避坑+实战配置全记录](https://mmbiz.qpic.cn/mmbiz_jpg/oIQL0FjlVPPzNeNHHI9SOsMDncW6xdHzU86zRyS7Zgc1sFGrickdWKRloTnKTwrPpakVVbicP0vf5KCcGibGXAibEKUsaBibW05y7M5hoCUpJSB8/0?wx_fmt=jpeg)

# 别乱装！OpenClaw Skills安全避坑+实战配置全记录

> **作者**: 
> **发布日期**: 2026年2月13日 12:29
> **来源**: [原文链接](https://mp.weixin.qq.com/s/r_88gWOsmGyB2LpZ_-gsjQ)

---

# 5000多个技能怎么选？恶意的怎么识别？装多了AI反而变笨？

# 亲身实测，我总结了三步排雷法+25个亲测技能清单+3个真实踩坑案例，非程序员也能照着配。

  

![文章图片](https://mmbiz.qpic.cn/sz_mmbiz_jpg/oIQL0FjlVPOcGjbUK0M5BJD1e3eTfbO6ZxEJfbVjqxRe68a4IBEnDibcaKSkdkr9yVPCky4PHG0PwdYic4NtNFD8u4tpQYO9SjbntKlzjYXZw/640?wx_fmt=jpeg&from=appmsg&watermark=1#imgIndex=0)

  

昨天我在群里分享了AI日报，有人问了一句：

![文章图片](https://mmbiz.qpic.cn/sz_mmbiz_png/oIQL0FjlVPNHIg4XdFWM99wtwnQzNwjgF7f0U6Ltpsaqqrvn90VxYUHXHOyZeiaQf2agQhyFIkU40eP6TosFRBCBzas0BbVPsw8GuX5H0K7E/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=1)

  

我才意识到，很多人还卡在这一步——听说过Skills，但不知道怎么选、怎么装、哪些有坑。

但值得注意的是，技能商店里几千个技能包，社区已经发现不少存在安全隐患的。

偷Key、传文件、植后门的都有。

所以今天这篇，不是教你"装哪个"，而是教你"怎么安全地装、聪明地选"。

## 一、Skills是什么？一句话讲清楚

给你的AI助手加"职业技能"的插件。

就像手机装App——不装App的iPhone只能打电话，不装Skills的AI只能聊天。

装了Skills，AI就能帮你操作浏览器、生成文档、读取文件、调用API、甚至自动发消息。

比如：

没装Skills："帮我总结这个YouTube视频" → AI回复"抱歉我不能访问YouTube"

装了youtube-transcript：直接给你3分钟文字版精华

Skills让AI从"聊天工具"变成"自动化工作台"。

## 二、为什么要小心装？

OpenClaw的技能商店是开放的——任何人都能上传技能包。

这意味着：好用的很多，但有毒的也不少。

### 社区已经发现的真实案例：

-   偷API Key：技能运行时悄悄把你的OpenAI Key发到作者服务器
    
-   上传文件：你让AI处理文档，技能把文件传到第三方
    
-   植入后门：技能代码里藏命令注入，远程控制你的AI
    

【①】ClawHub技能商店页面

![文章图片](https://mmbiz.qpic.cn/sz_mmbiz_png/oIQL0FjlVPOezfzoza8v9zTsgB9qgg7wwhhK4UibxPpA5YibvrWZyYjLv2icezG3PNPodXEPiaBE3U3kOCXq6mRVuRYS0BgPGcbaxUZRPicdib0XA/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=2)

  

【②】GitHub-Skills 仓库页

![文章图片](https://mmbiz.qpic.cn/mmbiz_png/oIQL0FjlVPMEUenXyDfN4quia1h2rN7TsYW011pubN69dZDNkrozicdicbkMRJeAe8LBqRC6as5gsWWibicq26nOhicwPpqXGXLo88iaXKnfd7VOjg/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=3)

  

重要提醒：技能商店没有官方审核机制，所有技能都是"自负风险"。

## 三、怎么选技能？三步避坑法

### 第一步：用skill-vetting先扫一遍

这是唯一一个我建议你第一个装的技能——专门用来检查其他技能安全性的。

装好后，每次装新技能前先问AI：

"帮我审查一下\[技能名\]的安全性。"

它会自动检查：

-   代码里有没有可疑网络请求
    
-   有没有读取敏感文件
    
-   权限要求是否合理
    

📸【③】skill-vetting扫描结果示例，标注安全/警告/危险三种颜色

![文章图片](https://mmbiz.qpic.cn/mmbiz_png/oIQL0FjlVPOic9OJ6CbDHgW993Cqb1lJTnmM1dwG9lH35yLiby59qOHs74q6Alf95q42fpf7aruSpfBTgI05l04qJ7bxqp46DJicibsq8ZPxl4Q/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=4)

  

### 第二步：看权限要求

每个技能安装时会申请权限，比如：

-   读取文件系统
    
-   访问网络
    
-   执行系统命令
    

红旗信号：一个"计算器"技能要求"完全文件系统访问"——这不合理。

📸【④】技能权限要求页面，看一下技能具体描述

![文章图片](https://mmbiz.qpic.cn/mmbiz_png/oIQL0FjlVPMqhHJLmbqj9hXOEn3KrB7yISMV7iaYwnibD3njfsia11yV9aykaickM9AZeAXNT5oTQwzhIs8JkpE2svJDZs87dicrhuTy8gxqm9gA/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=5)

  

### 第三步：优先选有口碑的

GitHub星标多的、下载量高的、社区推荐的，踩坑概率小很多。冷门技能不是不能装，但多一份审查。

## 四、怎么装？普通人的真实方式

很多教程教你敲命令行，什么npm install、clawhub search……

我的做法更简单：直接让AI帮我装。

零零壹是我给AI助手起的名字（OpenClaw可以自定义名字和人设），我是这么跟它说的：

"把今天推荐的必装技能都装上。"

然后它自动完成了所有步骤：

1.  在技能商店搜索最匹配的技能
    
2.  逐个安装到工作区
    
3.  安装完检查哪些能用、哪些有前置条件
    
4.  主动删掉了2个暂时用不上的
    

📸【⑤】我跟零零壹的完整对话截图

![文章图片](https://mmbiz.qpic.cn/mmbiz_png/oIQL0FjlVPPKlXzypwcq9VLgq5A5Lwsib1g6alJLDZ00r0Nqfl75cnuFqDqPgsMoy3TO0JOO5N9tVWUkWjsiatogcFRZ6uOn7ic9xmBlzOq7T8/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=6)

  

📸【⑥】AI安装完成后的反馈截图

![文章图片](https://mmbiz.qpic.cn/mmbiz_png/oIQL0FjlVPM4792NkXRuN1ptET2TTwFGD4yzsKyF0rI1KR9zlfImwUa4GBkRS4AXWMkG1gPBbyh0ibFmOtLTXlAA0DibWptOelGxyvjDJS2VI/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=7)

  

它不是无脑全装，而是帮我判断哪个该留、哪个该删。

这才是AI助手的真正价值——你不需要变成技术专家，你需要一个靠谱的技术搭档。

## 五、我踩过的坑（先避坑，再看推荐）

### 坑1：装太多反而乱

刚开始兴奋地装了19个，结果有些根本用不上，AI反而容易"选择困难"。

后来精简到11个，效率明显提升。现在25个是逐步验证有用才加回来的。

教训：够用就停，先产出再说。 别陷入配置地狱。

### 坑2：有些技能需要额外服务

比如有个RSS新闻聚合技能，听着很美好——自动抓新闻。但它需要你先部署一个RSS服务器。

装了才发现用不了，白折腾。

⑧】安装后发现需要前置条件的截图

![文章图片](https://mmbiz.qpic.cn/mmbiz_png/oIQL0FjlVPPVWOucJHq2JUGe2HYPVdIF1icibbxhl0gtLIeB0kI0EhsGj1bRiaVxkVEf9NU8SAOQ32yFuuoVFyfdmMg6CnBcr5c83sOx2Je81Y/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=8)

教训：装之前看一眼前置条件。 或者直接问AI"这个我现在能用吗？"

### 坑3：技能可能重复

技能商店同一个功能可能有3-5个不同的技能包，名字还差不多。

教训：让AI帮你比较选择，别自己一个个翻。

## 六、我的25个技能全公开

知道了怎么找、怎么避坑、怎么装，下面是我实际在用的全部技能。

### 如果只装5个，我推荐这5个👇

`skill-vetting — 技能安全扫描，安全第一这个必须最先装   agent-browser — 浏览器自动化，不需要API也能操作任何网站   evolink-z-image — AI图片生成，封面配图刚需   youtube-transcript — YouTube视频转文字，3分钟提取30分钟精华   pdf — PDF全能处理，读合同、合并拆分、OCR   `

这5个覆盖安全、浏览器、图片、视频、文档五个核心场景，零门槛直接用。

### 完整清单（25个）：

###  内容创作 & 办公（6个）

`docx — Word文档生成,写报告做模板   xlsx — Excel表格处理,数据整理统计   pptx — PPT演示文稿,路演材料   pdf — PDF全能处理,读合同、OCR扫描件   youtube-transcript — YouTube视频转文字   evolink-z-image — AI图片生成,封面配图   `

###  飞书生态（10个）

`feishu-im — 发消息、建群、置顶、加急   feishu-bitable — 多维表格数据管理   feishu-doc-writer — 写入飞书云文档   feishu-drive — 云盘文件管理   feishu-wiki — 知识库页面管理   feishu-calendar — 日程安排、查冲突   feishu-task — 任务派发和跟踪   feishu-approval — 审批流自动化   feishu-contact — 通讯录查询   feishu-card — 发送交互式卡片消息   `

飞书10件套是我用得最多的。AI直接操作知识库、写文档、发消息，省掉大量重复操作。如果你不用飞书，这10个可以跳过，换成你常用平台的对应技能。

###  开发 & 系统（6个）

`agent-browser — 浏览器自动化   cursor-agent — 调度编码AI   git-sync — 自动同步到GitHub   docker-essentials — Docker命令速查   tldr — 命令行速查   skill-vetting — 技能安全审查   `

### 工作流 & 规划（3个）

`brainstorming — 做新东西前先理清思路   writing-plans — 把需求拆成可执行方案   executing-plans — 按方案分步执行   `

## 写在最后

Skills的本质不是"装得多"，是"用得上"。

25个技能听着多，但每一个都是我在实际使用中验证过的。没用的我真的会删。

你的AI助手能帮你做多少事，取决于你给它装了什么技能。

后续会出各应用场景的Skill选择和深度实战，关注不迷路。

## Skills资源汇总

（后台回复"skills"获取直达链接）

-   官方技能库 ClawHub — 5000+技能，搜索安装一站式
    
-   GitHub精选仓库 awesome-openclaw-skills — 社区精选近3000个优质技能
    

安全提醒： 不管从哪里装，都建议先让你的AI扫一遍。安全第一。