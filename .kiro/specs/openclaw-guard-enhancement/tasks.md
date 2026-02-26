# 实施计划：OpenClaw Guard 综合功能增强

## 概述

基于需求文档和设计文档，将 openclaw-guard 的 6 项增强需求拆分为增量式编码任务。每个任务构建在前一个任务之上，最终完成所有功能的集成。实现语言为 TypeScript，测试框架为 Vitest + fast-check。

## 任务

- [x] 1. 安装 fast-check 并准备测试基础设施
  - 在 `openclaw-guard/` 目录下安装 `fast-check` 作为 devDependency
  - 创建 `openclaw-guard/src/__tests__/` 目录
  - 确认 `vitest.config.ts` 已包含 `src/**/*.test.ts` 的 include 配置
  - _需求: 全局测试基础设施_

- [x] 2. 实现配置文件保护机制（config.ts）
  - [x] 2.1 实现 `deepMerge` 深度合并函数
    - 在 `openclaw-guard/src/config.ts` 中新增 `deepMerge(target, source)` 导出函数
    - 递归合并嵌套对象，数组和原始值直接覆盖
    - _需求: 4.1, 4.2_
  - [ ]* 2.2 编写 deepMerge 属性测试
    - **Property 7: 配置深度合并保留已有字段**
    - **验证: 需求 4.1, 4.2**
  - [x] 2.3 实现 `createBackup` 备份管理函数
    - 在 `openclaw-guard/src/config.ts` 中新增 `createBackup()` 导出函数
    - 备份文件命名格式: `openclaw.json.bak.{timestamp}`
    - 自动清理旧备份，保留最近 5 个
    - _需求: 4.3_
  - [ ]* 2.4 编写备份数量上限属性测试
    - **Property 8: 备份文件数量上限**
    - **验证: 需求 4.3**
  - [x] 2.5 改造 `saveConfig` 函数，集成深度合并与备份
    - 修改 `openclaw-guard/src/config.ts` 中的 `saveConfig`
    - 保存前先调用 `createBackup()`，再加载现有配置并 `deepMerge`，最后写入
    - I/O 错误时保留原文件不变，返回错误结果
    - _需求: 4.1, 4.2, 4.4_
  - [ ]* 2.6 编写 I/O 错误保护属性测试
    - **Property 9: I/O 错误时配置文件不变**
    - **验证: 需求 4.4**

- [x] 3. 检查点 - 配置保护机制验证
  - 确保所有测试通过，如有问题请向用户确认。

- [x] 4. 实现服务器错误处理与进程稳定性（server.ts）
  - [x] 4.1 添加进程级错误处理
    - 在 `openclaw-guard/src/server.ts` 的 `startServer` 函数中注册 `process.on('uncaughtException')` 和 `process.on('unhandledRejection')` 处理器
    - 记录错误堆栈到控制台，不终止进程
    - _需求: 1.2, 1.3_
  - [x] 4.2 添加路由级 try-catch 错误包装
    - 将 `http.createServer` 回调中的请求处理逻辑包装在 try-catch 中
    - 捕获异常后返回 HTTP 500 + JSON 格式错误信息 `{ error: '服务器内部错误', message: '<详情>' }`
    - _需求: 1.4_
  - [ ]* 4.3 编写路由异常属性测试
    - **Property 1: 路由异常统一返回 500 JSON**
    - **验证: 需求 1.4**
  - [x] 4.4 添加 server error 事件处理
    - 在 `server.on('error')` 中区分 `EADDRINUSE` 和其他错误
    - 非端口冲突的错误记录日志并继续运行
    - 致命启动错误（如端口绑定失败且无法递增）输出明确原因并 `process.exit(1)`
    - _需求: 1.1, 1.5_
  - [ ]* 4.5 编写服务器错误处理单元测试
    - 验证 `uncaughtException` 和 `unhandledRejection` handler 已注册
    - 验证致命错误时调用 `process.exit(1)`
    - _需求: 1.1, 1.2, 1.3, 1.5_

- [x] 5. 实现 Web 端口配置与自动递增（server.ts + index.ts）
  - [x] 5.1 改造 `startServer` 支持端口自动递增
    - 重构 `openclaw-guard/src/server.ts` 中的 `startServer` 函数
    - 当 `EADDRINUSE` 时自动尝试 port+1，最多连续尝试 10 个端口
    - 成功监听后在控制台输出实际使用的端口号
    - 连续 10 个端口均被占用后输出错误信息并 `process.exit(1)`
    - _需求: 2.3, 2.4, 2.5_
  - [x] 5.2 修改 CLI `web` 命令默认端口为 8088
    - 修改 `openclaw-guard/src/index.ts` 中 `web` 命令的 `--port` 默认值从 `'3000'` 改为 `'8088'`
    - _需求: 2.1, 2.2_
  - [ ]* 5.3 编写端口相关属性测试
    - **Property 2: 用户指定端口被尊重**
    - **Property 3: 端口占用自动递增**
    - **验证: 需求 2.2, 2.3, 2.4**

- [x] 6. 检查点 - 服务器稳定性与端口配置验证
  - 确保所有测试通过，如有问题请向用户确认。

- [x] 7. 增强 AI 模型配置灵活性（models.ts + server.ts）
  - [x] 7.1 增强 `saveProvider` 支持自定义 Provider 和默认 apiType
    - 修改 `openclaw-guard/src/models.ts` 中的 `saveProvider` 函数
    - 支持自定义 `id`、`name`、`baseUrl`、`apiType` 和模型列表
    - 未提供 `apiType` 时默认使用 `openai-completions`
    - 确保空字符串 `apiKey` 不覆盖已有值（当前逻辑已部分实现，需确认完整性）
    - 确保每个模型的 `contextWindow` 和 `maxTokens` 使用用户指定值而非全局默认覆盖
    - _需求: 3.1, 3.2, 3.4, 3.5_
  - [ ]* 7.2 编写自定义 Provider round-trip 属性测试
    - **Property 4: 自定义 Provider 保存/加载 round-trip**
    - **验证: 需求 3.1, 3.5**
  - [ ]* 7.3 编写缺省 apiType 默认值属性测试
    - **Property 5: 缺省 apiType 默认值**
    - **验证: 需求 3.2**
  - [ ]* 7.4 编写空 apiKey 保留属性测试
    - **Property 6: 空 apiKey 不覆盖已有值**
    - **验证: 需求 3.4**
  - [x] 7.5 修改 `GET /api/ai/providers` 路由返回预设 + 自定义 Provider
    - 修改 `openclaw-guard/src/server.ts` 中 `/api/ai/providers` 路由
    - 返回 `{ presets: AI_PROVIDERS, custom: [...] }` 结构
    - _需求: 3.3_
  - [x] 7.6 确保 `saveProvider` 不影响其他配置节点
    - 验证 `saveProvider` 通过 `deepMerge` 保存配置时仅修改目标 Provider 节点
    - _需求: 4.5_
  - [ ]* 7.7 编写 saveProvider 隔离性属性测试
    - **Property 10: saveProvider 不影响其他配置节点**
    - **验证: 需求 4.5**

- [x] 8. 检查点 - AI 模型配置验证
  - 确保所有测试通过，如有问题请向用户确认。

- [x] 9. 实现 Gateway 端口配置化（service-mgr.ts）
  - [x] 9.1 从配置文件读取 Gateway 端口
    - 修改 `openclaw-guard/src/service-mgr.ts`
    - 新增 `getGatewayPort()` 函数，从 `loadConfig()` 读取 `gateway.port`
    - 未配置时默认使用 18789
    - 将 `SERVICE_PORT` 常量替换为 `getGatewayPort()` 调用
    - 在 `getServiceStatus()` 返回值中包含实际端口
    - _需求: 5.1, 5.2, 5.3_
  - [ ]* 9.2 编写 Gateway 端口配置属性测试
    - **Property 11: Gateway 端口从配置读取并反映在状态中**
    - **验证: 需求 5.1, 5.2, 5.3**

- [x] 10. 创建 OAuth 授权登录可行性分析文档
  - 在 `openclaw-guard/docs/oauth-feasibility.md` 创建可行性分析文档
  - 包含以下章节：
    - 当前认证机制现状（API Key 模式）
    - 各 AI Provider OAuth 支持情况（Anthropic、OpenAI、Google、通用 OAuth 2.0）
    - 每个 Provider 的授权流程参数（Authorization URL、Token URL、Scope）
    - 从 API Key 扩展到 OAuth 所需的架构改造点
    - 安全建议（Token 存储、刷新机制、PKCE）
    - 实施路线图
  - _需求: 6.1, 6.2, 6.3, 6.4, 6.5_

- [x] 11. 最终检查点 - 全部功能验证
  - 确保所有测试通过，如有问题请向用户确认。

## 备注

- 标记 `*` 的任务为可选任务，可跳过以加速 MVP 交付
- 每个任务引用了具体的需求编号，确保可追溯性
- 属性测试使用 fast-check 库，验证设计文档中定义的正确性属性
- 检查点任务用于增量验证，确保每个阶段的功能正确
