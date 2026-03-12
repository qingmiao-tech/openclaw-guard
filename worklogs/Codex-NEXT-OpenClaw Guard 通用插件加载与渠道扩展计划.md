# OpenClaw Guard 下一版迭代计划

日期: 2026-03-12
作者: Codex

## 背景

当前开源版 `openclaw-guard` 已将消息入口统一收敛到“渠道”页，`Feishu / Lark` 作为官方渠道保留，不再在产品层暴露“自定义飞书”或独立“飞书”顶级页面。

这样做的原因是：

- 开源版必须优先保证通用性，不能假定每个用户都装有内部增强插件
- 当前“增强飞书”本质上是特定环境下的扩展实现，不适合作为公开产品结构的一部分
- 如果现在把“自定义飞书”写死进主 UI，会导致文档、截图、排障和用户认知全部偏向内部部署模式

因此，下一版不再做“飞书特例增强”，而是规划一套通用的“插件加载 + 渠道扩展”机制。

## 目标

1. 让 `openclaw-guard` 在不修改主仓 UI 代码的前提下，按插件清单动态加载扩展能力
2. 允许插件对“渠道”页贡献附加信息、扩展字段、状态卡片和操作按钮
3. 保持默认开源版在没有任何插件时依然可用、可测、可发布
4. 为未来的“增强飞书”“企业微信扩展”“自定义消息入口”提供统一接入面

## 非目标

- 本轮不做动态执行任意第三方不受信脚本
- 本轮不做插件市场、远程下载、在线启停
- 本轮不做前端沙箱运行时
- 本轮不把当前内部增强飞书实现直接原样搬进公共仓

## 设计原则

### 1. 官方能力优先，插件能力附加

- 主仓始终只承诺官方支持的渠道能力
- 插件只是在官方渠道或工作台上附加额外能力
- 如果插件不存在，UI 退化为标准官方形态，不出现空入口、假按钮或误导文案

### 2. 声明式扩展，避免硬编码

- 插件通过 manifest 描述自己扩展什么，而不是在主仓里到处写 `if plugin === feishu-enhanced`
- 主仓只认统一合同，例如：
  - 扩展哪个 tab
  - 扩展哪个 channel
  - 提供哪些状态卡片
  - 提供哪些配置字段
  - 提供哪些操作按钮

### 3. 默认安全关闭

- 没有显式启用的插件不加载
- 插件解析失败时只影响插件区域，不拖垮整个工作台
- UI 必须能清楚区分“官方能力”和“扩展能力”

## 建议架构

## 一、插件 manifest

建议为每个插件引入一个 manifest 文件，例如：

```json
{
  "id": "feishu-enhanced",
  "name": "Feishu Enhanced",
  "version": "0.1.0",
  "kind": "channel-extension",
  "targets": {
    "channel": "feishu"
  },
  "ui": {
    "cards": true,
    "actions": true,
    "fields": true
  },
  "backend": {
    "statusEndpoint": "/api/plugins/feishu-enhanced/status",
    "configEndpoint": "/api/plugins/feishu-enhanced/config",
    "actionEndpoint": "/api/plugins/feishu-enhanced/action"
  }
}
```

主仓只需要解析 manifest，不需要预先知道插件内部细节。

## 二、后端插件注册中心

建议新增一个轻量插件注册模块，例如：

- `src/plugins/registry.ts`
- `src/plugins/types.ts`
- `src/plugins/loaders.ts`

核心职责：

- 扫描插件目录
- 校验 manifest
- 生成插件列表
- 提供“按渠道查询扩展”的能力
- 在服务端为插件状态、插件配置和插件动作提供统一代理入口

建议的插件目录优先级：

1. 用户级目录，例如 `~/.openclaw/guard/plugins`
2. 项目级目录，例如 `.guard-runtime/plugins`
3. 未来如有需要，再支持 `OPENCLAW_GUARD_PLUGIN_DIR`

## 三、渠道页扩展插槽

建议“渠道”页为每个官方渠道预留三个插槽：

1. `summaryCards`
作用:
- 在官方摘要卡下方附加插件提供的状态卡

2. `extraFields`
作用:
- 在标准表单后附加插件字段

3. `actions`
作用:
- 在保存/重载/清空之外附加插件动作

示例：

- 官方 `Feishu / Lark`
  - 标准字段：`appId`、`appSecret`、`domain`、`connectionMode`
  - 扩展插件：
    - 提供“回调健康状态”
    - 提供“扩展文档范围”
    - 提供“重新注册 webhook”按钮

这样即使没有插件，官方 Feishu 也保持完整可用。

## 四、统一扩展 API

建议主仓只暴露统一扩展 API，不为每个插件写专属路径。

建议合同：

- `GET /api/plugins`
- `GET /api/plugins/:pluginId/status`
- `GET /api/plugins/:pluginId/config`
- `POST /api/plugins/:pluginId/config`
- `POST /api/plugins/:pluginId/actions/:actionId`

如果插件扩展了某个渠道，也可以由渠道页先请求：

- `GET /api/channels/:channelId/extensions`

返回格式统一为：

```json
{
  "channelId": "feishu",
  "extensions": [
    {
      "pluginId": "feishu-enhanced",
      "label": "Enhanced",
      "cards": [],
      "fields": [],
      "actions": []
    }
  ]
}
```

## 五、前端展示策略

建议在 UI 中采用如下规则：

- 官方能力永远不依赖插件
- 有插件时，在渠道详情中出现“扩展能力”区块
- 文案上明确标记 `扩展`，而不是 `官方`
- 不再新增顶级 tab，除非未来出现跨渠道、跨模块的大型扩展

也就是说，下一版仍然优先坚持：

- “飞书是一个官方渠道”
- “飞书增强是一个挂在 Feishu 详情下的扩展块”

而不是再次回到“独立飞书页”的模式。

## 实施阶段

## Phase 1: 插件清单与注册中心

交付物：

- 插件 manifest 类型定义
- 插件目录扫描
- 插件注册中心
- `GET /api/plugins`
- 基础单元测试

验收标准：

- 没有插件时返回空列表
- manifest 非法时不会导致 Guard Web 崩溃
- 插件加载失败时日志可见

## Phase 2: 渠道页扩展插槽

交付物：

- `GET /api/channels/:id/extensions`
- 渠道页 `summaryCards / extraFields / actions` 三类插槽
- UI 标签：`扩展`

验收标准：

- Feishu 官方配置单独工作
- 装了扩展插件后才出现附加卡片和动作
- 卸载插件后 UI 自动恢复为标准官方视图

## Phase 3: 示例插件

交付物：

- 一个真正独立的 `feishu-enhanced` 示例插件仓库或示例目录
- 插件说明文档
- 插件安装方式

验收标准：

- 不修改主仓 UI 代码即可挂载
- 插件只影响 Feishu 渠道详情，不影响其它渠道

## Phase 4: 发布与文档

交付物：

- README 插件章节
- `docs/plugin-manifest.md`
- `docs/channel-extension-guide.md`
- 样例插件模板

验收标准：

- 外部开发者可以按文档创建最小插件
- 主仓开源版在无插件状态下仍能完整运行

## 测试计划

1. 无插件环境
- “渠道”页仍可正常打开
- Feishu / Telegram / Slack 等官方渠道正常工作
- 不出现空白“扩展区”

2. 单插件环境
- 插件 manifest 被正确识别
- 指定渠道显示扩展卡片与按钮
- 保存配置和触发动作可正常回调插件 API

3. 插件异常环境
- manifest 缺字段
- 状态接口超时
- 动作接口报错

预期：

- 插件区域显示错误状态
- 主页面不白屏
- 其它渠道功能不受影响

4. 发布包验证
- 默认 npm 包不内置私有插件
- 插件能力文档存在，但不让用户误解为默认已启用

## 与当前版本的衔接

当前版本已完成：

- 取消独立“飞书”顶级页面
- 把官方 `Feishu / Lark` 收回“渠道”页统一管理
- 不再在产品层暴露“自定义飞书”概念

下一版开始后：

- 可以在“渠道 -> Feishu”详情里新增“扩展能力”区块
- 但只有在检测到通用插件 manifest 后才渲染

## 风险与注意事项

1. 不要让插件能力反向污染官方合同
- `ChannelInfo`、`MachineInitResult`、`WebBackgroundReport` 这类主合同要保持简洁
- 插件数据应走扩展合同，不要把专属字段不断塞进主对象

2. 不要把内部插件路径写死到公共仓
- 插件目录应可配置
- 默认不开启任何私有插件

3. 不要再次把插件做成顶级导航
- 除非未来有非常明确的跨模块扩展平台需求
- 否则扩展能力应优先挂在现有页面的局部区域

## 建议结论

推荐路线：

- 当前 `0.9.x` 保持“官方渠道统一到渠道页”的简洁结构
- 下一版 `1.0` 前后再引入“通用插件加载 + 渠道扩展插槽”
- 你的增强飞书届时作为“示例插件 / 私有插件”接入，而不是主仓硬编码能力

这样既能保证开源版通用，又能为后续高级扩展留下干净的演进路径。
