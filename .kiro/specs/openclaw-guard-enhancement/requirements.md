# 需求文档：OpenClaw Guard 综合功能增强

## 简介

本文档定义了 openclaw-guard 项目的综合功能增强需求，涵盖五个核心领域：服务器错误处理与稳定性、端口配置灵活化、AI 模型配置增强、配置文件保护机制、以及 OAuth 授权登录可行性分析与文档。目标是提升 openclaw-guard 的健壮性、灵活性和可用性。

## 术语表

- **Guard_Server**: openclaw-guard 的 HTTP Web 管理服务器（server.ts 中的 `startServer` 函数创建的 `http.Server` 实例）
- **CLI_Entry**: openclaw-guard 的命令行入口程序（index.ts 中的 commander 程序）
- **Config_Manager**: 配置管理模块（config.ts），负责读写 `~/.openclaw/openclaw.json` 和 env 文件
- **Model_Manager**: AI 模型/Provider 配置管理模块（models.ts），管理多个 AI 提供商和模型配置
- **Service_Manager**: Gateway 服务管理模块（service-mgr.ts），管理 OpenClaw Gateway 的启动/停止/重启
- **Provider**: AI 模型提供商（如 Anthropic、OpenAI、DeepSeek 等），包含 baseUrl、apiType、apiKey 和模型列表
- **OpenClaw_Config**: 存储在 `~/.openclaw/openclaw.json` 中的 OpenClaw 主配置文件
- **Gateway_Port**: OpenClaw Gateway 服务监听的端口（当前硬编码为 18789）
- **Web_Port**: Guard_Server Web 管理界面监听的端口
- **OAuth_Flow**: 基于 OAuth 2.0 协议的第三方授权登录流程

## 需求

### 需求 1：服务器错误处理与进程稳定性

**用户故事：** 作为运维人员，我希望 Guard_Server 在遇到错误时不会自动关闭，以便服务能持续运行而不需要人工干预。

#### 验收标准

1. WHEN Guard_Server 的 HTTP server 实例触发 `error` 事件, THE Guard_Server SHALL 记录错误信息到控制台并继续运行，而非终止进程
2. WHEN 进程发生 `uncaughtException` 事件, THE Guard_Server SHALL 记录异常详情（包含错误堆栈）到控制台并继续运行
3. WHEN 进程发生 `unhandledRejection` 事件, THE Guard_Server SHALL 记录 rejection 详情到控制台并继续运行
4. WHEN 任意 API 路由处理函数抛出异常, THE Guard_Server SHALL 捕获该异常、返回 HTTP 500 状态码和 JSON 格式的错误信息、并继续处理后续请求
5. WHEN Guard_Server 因致命错误（如端口绑定失败）无法启动, THE Guard_Server SHALL 输出明确的错误原因到控制台并以非零退出码终止进程

### 需求 2：Web 管理界面端口配置

**用户故事：** 作为运维人员，我希望 Web 管理界面的默认端口改为 8088 并支持端口被占用时自动递增，以避免与其他服务的端口冲突。

#### 验收标准

1. THE CLI_Entry 的 `web` 命令 SHALL 使用 8088 作为默认 Web_Port 值
2. WHEN 用户通过 `--port` 参数指定端口号, THE CLI_Entry SHALL 使用用户指定的端口号作为 Web_Port
3. WHEN Guard_Server 尝试监听的 Web_Port 已被占用（触发 `EADDRINUSE` 错误）, THE Guard_Server SHALL 自动尝试监听 Web_Port + 1 端口
4. WHILE Guard_Server 执行端口自动递增, THE Guard_Server SHALL 在连续尝试 10 个端口均被占用后停止尝试，并输出错误信息到控制台
5. WHEN Guard_Server 通过端口自动递增成功监听到可用端口, THE Guard_Server SHALL 在控制台输出实际使用的端口号

### 需求 3：AI 模型配置灵活性增强

**用户故事：** 作为开发者，我希望能更灵活地配置 AI 模型提供商，包括添加自定义 Provider 模板和自定义 API 类型，以便接入更多 AI 服务。

#### 验收标准

1. THE Model_Manager SHALL 支持通过 API 接口（`POST /api/ai/provider`）添加完全自定义的 Provider，包含自定义 id、name、baseUrl、apiType 和模型列表
2. WHEN 用户通过 API 保存自定义 Provider 时未提供 apiType, THE Model_Manager SHALL 默认使用 `openai-completions` 作为 apiType
3. THE Model_Manager SHALL 在 `GET /api/ai/providers` 响应中同时返回预设 Provider 列表和用户已保存的自定义 Provider 列表
4. WHEN 用户保存 Provider 配置时提供了空字符串作为 apiKey, THE Model_Manager SHALL 保留该 Provider 已有的 apiKey 值而非覆盖为空
5. THE Model_Manager SHALL 支持为每个模型单独配置 contextWindow 和 maxTokens 参数，而非仅使用全局默认值

### 需求 4：配置文件保护机制

**用户故事：** 作为用户，我希望 Guard 在保存配置时不会清空我原有的 OpenClaw 配置，以防止配置丢失。

#### 验收标准

1. WHEN Config_Manager 执行 `saveConfig` 操作, THE Config_Manager SHALL 先加载当前 OpenClaw_Config 的完整内容，再将新配置深度合并到现有配置中，最后写入文件
2. WHEN Config_Manager 通过 `POST /api/config` 接口接收到配置数据, THE Guard_Server SHALL 将接收到的配置与现有配置进行深度合并，而非全量覆盖
3. WHEN Config_Manager 写入配置文件前, THE Config_Manager SHALL 创建当前配置文件的备份（文件名附加时间戳后缀），保留最近 5 个备份
4. IF Config_Manager 在写入配置文件过程中发生 I/O 错误, THEN THE Config_Manager SHALL 保留原有配置文件不变，并返回包含错误详情的失败结果
5. WHEN Model_Manager 的 `saveProvider` 函数保存 Provider 配置, THE Model_Manager SHALL 仅修改目标 Provider 相关的配置节点，保持 OpenClaw_Config 中其他所有配置节点不变

### 需求 5：Gateway 端口配置化

**用户故事：** 作为运维人员，我希望 Gateway 服务的端口可以通过配置文件指定，而非硬编码，以便在不同环境中灵活部署。

#### 验收标准

1. THE Service_Manager SHALL 从 OpenClaw_Config 中读取 `gateway.port` 配置项作为 Gateway_Port，而非使用硬编码值
2. WHEN OpenClaw_Config 中未配置 `gateway.port`, THE Service_Manager SHALL 使用 18789 作为默认 Gateway_Port
3. WHEN Service_Manager 返回服务状态信息, THE Service_Manager SHALL 在状态信息中包含当前使用的 Gateway_Port 值

### 需求 6：OAuth 授权登录可行性分析与文档

**用户故事：** 作为开发者，我希望了解如何通过 OAuth 授权登录方式接入 Cloud Code、GPT 等 AI 服务账号，以及当前框架是否支持此方式。

#### 验收标准

1. THE Guard_Server SHALL 在项目文档中提供一份 OAuth 授权登录可行性分析文档，内容涵盖：当前框架的认证机制现状、各主流 AI Provider 的 OAuth 支持情况、实现 OAuth 授权登录所需的架构变更、以及推荐的实施路线图
2. THE 可行性分析文档 SHALL 包含以下 AI Provider 的 OAuth 分析：Anthropic（Claude）、OpenAI（GPT）、Google（Gemini）、以及通用 OAuth 2.0 兼容 Provider
3. THE 可行性分析文档 SHALL 明确说明当前框架仅支持 API Key 认证方式，并列出从 API Key 模式扩展到 OAuth 模式所需的具体技术改造点
4. THE 可行性分析文档 SHALL 为每个支持 OAuth 的 Provider 提供授权流程示意（包含 Authorization URL、Token URL、Scope 等关键参数）
5. THE 可行性分析文档 SHALL 包含安全性建议，涵盖 Token 存储方案、Token 刷新机制、以及 PKCE 流程的使用建议
