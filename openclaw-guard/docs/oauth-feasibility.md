# OAuth 授权登录可行性分析

> 本文档分析 openclaw-guard 从当前 API Key 认证模式扩展到 OAuth 授权登录的可行性，涵盖各主流 AI Provider 的 OAuth 支持情况、架构改造点、安全建议及实施路线图。

---

## 1. 当前认证机制现状

### 1.1 API Key 认证模式

openclaw-guard 当前**仅支持 API Key 认证方式**。所有 AI Provider 的凭证管理通过以下机制实现：

- **配置文件存储**：API Key 存储在 `~/.openclaw/openclaw.json` 的 `models.providers.<provider>.apiKey` 字段中
- **明文存储**：API Key 以明文 JSON 形式保存在本地文件系统
- **Web UI 管理**：通过 `POST /api/ai/provider` 接口保存 Provider 配置（含 API Key）
- **脱敏展示**：`GET /api/ai/providers` 接口返回时对 API Key 做掩码处理（前4位 + ... + 后4位）

### 1.2 当前配置结构示例

```json
{
  "models": {
    "providers": {
      "anthropic": {
        "baseUrl": "https://api.anthropic.com",
        "apiKey": "sk-ant-xxxxx",
        "apiType": "anthropic-messages",
        "models": [...]
      },
      "openai": {
        "baseUrl": "https://api.openai.com/v1",
        "apiKey": "sk-xxxxx",
        "apiType": "openai-completions",
        "models": [...]
      }
    }
  }
}
```

### 1.3 现有模式的局限性

| 局限 | 说明 |
|------|------|
| 安全性 | API Key 明文存储，泄露风险高 |
| 生命周期管理 | 无自动轮换机制，Key 泄露后需手动更换 |
| 权限粒度 | API Key 通常拥有账户级全部权限，无法细粒度控制 |
| 多用户场景 | 不支持基于用户身份的授权，所有请求共用同一 Key |

---

## 2. 各 AI Provider OAuth 支持情况

### 2.1 Anthropic (Claude)

| 项目 | 状态 |
|------|------|
| OAuth 支持 | ❌ 不支持 |
| 认证方式 | 仅 API Key（`x-api-key` Header） |
| 官方文档 | https://docs.anthropic.com/en/api/getting-started |

**分析**：Anthropic 目前未提供公开的 OAuth 2.0 API。所有 API 访问均通过 API Key 进行身份验证。Anthropic Console 本身使用 OAuth 登录（Google/GitHub SSO），但这仅用于管理控制台，不提供 API 级别的 OAuth 令牌。

**结论**：短期内无法对 Anthropic 实现 OAuth 授权，需继续使用 API Key 模式。

### 2.2 OpenAI (GPT)

| 项目 | 状态 |
|------|------|
| OAuth 支持 | ⚠️ 部分支持 |
| API 访问认证 | API Key（`Authorization: Bearer sk-xxx`） |
| ChatGPT Plugins | 支持 OAuth 2.0（Authorization Code Flow） |
| 官方文档 | https://platform.openai.com/docs/api-reference/authentication |

**分析**：OpenAI 的情况较为复杂：

1. **API 平台访问**：仍以 API Key 为主要认证方式，通过 `Authorization: Bearer` Header 传递
2. **ChatGPT Plugins/Actions**：支持 OAuth 2.0 Authorization Code Flow，但这是为第三方应用接入 ChatGPT 设计的，方向相反（ChatGPT 作为 OAuth Client 访问第三方服务）
3. **Azure OpenAI Service**：支持 Azure AD (Entra ID) OAuth 2.0 认证，可通过 Service Principal 或 Managed Identity 获取访问令牌

**结论**：直接对 OpenAI API 使用 OAuth 不可行。但如果用户使用 Azure OpenAI，可以通过 Azure AD OAuth 实现。

### 2.3 Google (Gemini)

| 项目 | 状态 |
|------|------|
| OAuth 支持 | ✅ 完整支持 |
| 认证方式 | API Key / OAuth 2.0 / Service Account |
| 官方文档 | https://ai.google.dev/gemini-api/docs/oauth |

**分析**：Google Gemini API 提供最完整的 OAuth 支持：

1. **API Key 模式**：简单场景下可直接使用 API Key
2. **OAuth 2.0 用户授权**：支持标准 Authorization Code Flow，用户可通过 Google 账号授权应用访问 Gemini API
3. **Service Account**：适用于服务端场景，通过 JSON 密钥文件获取访问令牌，支持自动刷新
4. **Application Default Credentials (ADC)**：在 Google Cloud 环境中自动获取凭证

**结论**：Google Gemini 是最适合优先实现 OAuth 集成的 Provider。

### 2.4 通用 OAuth 2.0 兼容 Provider

部分 AI 服务通过标准 OAuth 2.0 协议提供 API 访问，openclaw-guard 应设计通用的 OAuth 适配层以支持这类 Provider：

| Provider 类型 | OAuth Flow | 典型场景 |
|--------------|------------|---------|
| Azure OpenAI | Client Credentials / Authorization Code | 企业级部署 |
| AWS Bedrock | STS AssumeRole（类 OAuth） | AWS 生态集成 |
| 自建 AI 网关 | 自定义 OAuth 2.0 | 企业内部 AI 平台 |
| LiteLLM Proxy | 可配置 OAuth | 统一 AI 网关 |

---

## 3. 各 Provider 授权流程参数

### 3.1 Google Gemini (OAuth 2.0 Authorization Code Flow)

| 参数 | 值 |
|------|-----|
| Authorization URL | `https://accounts.google.com/o/oauth2/v2/auth` |
| Token URL | `https://oauth2.googleapis.com/token` |
| Scope | `https://www.googleapis.com/auth/generative-language` |
| Flow 类型 | Authorization Code + PKCE |
| Client ID 获取 | Google Cloud Console → APIs & Services → Credentials |
| Redirect URI | `http://localhost:{guard_port}/oauth/callback/google` |

**授权流程**：

```
用户 → Guard Web UI 点击"Google 授权登录"
  → 浏览器跳转 Google 授权页面（带 PKCE code_challenge）
  → 用户同意授权
  → Google 回调 Guard Server（/oauth/callback/google?code=xxx）
  → Guard Server 用 code + code_verifier 换取 access_token + refresh_token
  → 存储 token 到配置文件（加密）
  → 后续 API 请求使用 access_token
```

### 3.2 Azure OpenAI (OAuth 2.0 Client Credentials Flow)

| 参数 | 值 |
|------|-----|
| Authorization URL | `https://login.microsoftonline.com/{tenant_id}/oauth2/v2.0/authorize` |
| Token URL | `https://login.microsoftonline.com/{tenant_id}/oauth2/v2.0/token` |
| Scope | `https://cognitiveservices.azure.com/.default` |
| Flow 类型 | Client Credentials / Authorization Code |
| Client ID 获取 | Azure Portal → App Registrations |
| Redirect URI | `http://localhost:{guard_port}/oauth/callback/azure` |

**授权流程**：

```
方式一：Client Credentials（服务端）
  Guard Server → POST Token URL（client_id + client_secret）
  → 获取 access_token（有效期通常 1 小时）
  → 自动刷新

方式二：Authorization Code（用户授权）
  用户 → Guard Web UI 点击"Azure 授权登录"
  → 浏览器跳转 Azure AD 登录页面
  → 用户登录并同意授权
  → Azure AD 回调 Guard Server
  → 换取 access_token + refresh_token
```

### 3.3 通用 OAuth 2.0 Provider 配置模板

对于支持标准 OAuth 2.0 的自定义 Provider，openclaw-guard 应支持以下可配置参数：

```json
{
  "models": {
    "providers": {
      "custom-provider": {
        "baseUrl": "https://api.example.com/v1",
        "auth": {
          "type": "oauth2",
          "authorizationUrl": "https://auth.example.com/authorize",
          "tokenUrl": "https://auth.example.com/token",
          "scope": "ai.read ai.write",
          "clientId": "your-client-id",
          "flow": "authorization_code",
          "pkce": true,
          "redirectUri": "http://localhost:{guard_port}/oauth/callback/custom-provider"
        },
        "models": [...]
      }
    }
  }
}
```

### 3.4 Anthropic / OpenAI

由于 Anthropic 和 OpenAI（非 Azure 版本）目前不支持 OAuth 2.0 API 访问，无授权流程参数可提供。这两个 Provider 将继续使用 API Key 认证方式。

---

## 4. 从 API Key 扩展到 OAuth 所需的架构改造点

### 4.1 Token 存储机制

**当前状态**：API Key 以明文存储在 `openclaw.json` 中。

**改造方案**：

```typescript
// 新增 auth 字段到 Provider 配置
interface ProviderAuth {
  type: 'apikey' | 'oauth2';

  // API Key 模式（现有）
  apiKey?: string;

  // OAuth 模式（新增）
  oauth?: {
    accessToken: string;       // 加密存储
    refreshToken?: string;     // 加密存储
    expiresAt?: number;        // Unix 时间戳
    tokenType: string;         // 通常为 "Bearer"
    scope?: string;
    clientId: string;
    // OAuth 端点配置
    authorizationUrl: string;
    tokenUrl: string;
    flow: 'authorization_code' | 'client_credentials';
    pkce?: boolean;
  };
}
```

**加密存储实现**：

```typescript
// 使用 Node.js crypto 模块加密 Token
// 密钥派生自机器唯一标识 + 用户级密码（可选）
import crypto from 'node:crypto';

function encryptToken(token: string, key: Buffer): string {
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv('aes-256-gcm', key, iv);
  const encrypted = Buffer.concat([cipher.update(token, 'utf8'), cipher.final()]);
  const authTag = cipher.getAuthTag();
  return `${iv.toString('hex')}:${authTag.toString('hex')}:${encrypted.toString('hex')}`;
}

function decryptToken(encrypted: string, key: Buffer): string {
  const [ivHex, authTagHex, dataHex] = encrypted.split(':');
  const decipher = crypto.createDecipheriv('aes-256-gcm', key, Buffer.from(ivHex, 'hex'));
  decipher.setAuthTag(Buffer.from(authTagHex, 'hex'));
  return decipher.update(Buffer.from(dataHex, 'hex')) + decipher.final('utf8');
}
```

### 4.2 Token 刷新逻辑

**新增模块**：`openclaw-guard/src/oauth.ts`

```typescript
// Token 刷新核心逻辑
async function refreshAccessToken(provider: string): Promise<string> {
  const config = loadConfig();
  const oauth = getNested(config, ['models', 'providers', provider, 'auth', 'oauth']);

  if (!oauth?.refreshToken) {
    throw new Error(`Provider ${provider} 无 refresh token，需重新授权`);
  }

  const response = await fetch(oauth.tokenUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: decryptToken(oauth.refreshToken, getEncryptionKey()),
      client_id: oauth.clientId,
    }),
  });

  const data = await response.json();

  // 更新存储的 Token
  setNested(config, ['models', 'providers', provider, 'auth', 'oauth', 'accessToken'],
    encryptToken(data.access_token, getEncryptionKey()));
  setNested(config, ['models', 'providers', provider, 'auth', 'oauth', 'expiresAt'],
    Date.now() + data.expires_in * 1000);

  // 如果返回了新的 refresh token（Refresh Token Rotation）
  if (data.refresh_token) {
    setNested(config, ['models', 'providers', provider, 'auth', 'oauth', 'refreshToken'],
      encryptToken(data.refresh_token, getEncryptionKey()));
  }

  saveConfig(config);
  return data.access_token;
}

// 获取有效的 access token（自动刷新）
async function getValidToken(provider: string): Promise<string> {
  const config = loadConfig();
  const oauth = getNested(config, ['models', 'providers', provider, 'auth', 'oauth']);

  if (!oauth) throw new Error(`Provider ${provider} 未配置 OAuth`);

  // 检查 Token 是否即将过期（提前 5 分钟刷新）
  if (oauth.expiresAt && Date.now() > oauth.expiresAt - 5 * 60 * 1000) {
    return await refreshAccessToken(provider);
  }

  return decryptToken(oauth.accessToken, getEncryptionKey());
}
```

### 4.3 OAuth 回调端点

**改造文件**：`openclaw-guard/src/server.ts`

需要在 Guard Server 中新增以下路由：

```typescript
// OAuth 授权发起
// GET /oauth/authorize/:provider
// → 生成 state + PKCE code_verifier
// → 重定向到 Provider 的 Authorization URL

// OAuth 回调处理
// GET /oauth/callback/:provider?code=xxx&state=xxx
// → 验证 state 防止 CSRF
// → 用 code 换取 access_token + refresh_token
// → 加密存储 Token
// → 重定向回 Web UI

// Token 状态查询
// GET /api/oauth/status/:provider
// → 返回 Token 是否有效、过期时间等
```

### 4.4 配置 Schema 变更

当前 Provider 配置需要扩展以支持双模式认证：

```json
{
  "models": {
    "providers": {
      "google-gemini": {
        "baseUrl": "https://generativelanguage.googleapis.com/v1beta",
        "auth": {
          "type": "oauth2",
          "oauth": {
            "accessToken": "<encrypted>",
            "refreshToken": "<encrypted>",
            "expiresAt": 1700000000000,
            "tokenType": "Bearer",
            "scope": "https://www.googleapis.com/auth/generative-language",
            "clientId": "xxx.apps.googleusercontent.com",
            "authorizationUrl": "https://accounts.google.com/o/oauth2/v2/auth",
            "tokenUrl": "https://oauth2.googleapis.com/token",
            "flow": "authorization_code",
            "pkce": true
          }
        },
        "apiType": "gemini",
        "models": [...]
      },
      "anthropic": {
        "baseUrl": "https://api.anthropic.com",
        "auth": {
          "type": "apikey",
          "apiKey": "sk-ant-xxxxx"
        },
        "apiType": "anthropic-messages",
        "models": [...]
      }
    }
  }
}
```

**向后兼容**：现有的 `apiKey` 字段继续支持，作为 `auth.type: 'apikey'` 的简写形式。

### 4.5 Web UI 变更

Guard Web UI 需要新增以下交互：

1. **Provider 配置页面**：增加"认证方式"选择（API Key / OAuth 2.0）
2. **OAuth 授权按钮**：选择 OAuth 后显示"授权登录"按钮，点击后跳转到 Provider 授权页面
3. **Token 状态展示**：显示 OAuth Token 的有效期、刷新状态
4. **重新授权入口**：Token 失效时提供重新授权的入口

---

## 5. 安全建议

### 5.1 Token 存储方案

**推荐方案：AES-256-GCM 加密存储**

- 使用 Node.js 内置 `crypto` 模块，无需引入额外依赖
- 加密密钥派生方案：
  - 基础方案：使用机器唯一标识（hostname + username hash）作为密钥种子
  - 增强方案：用户首次配置 OAuth 时设置主密码，通过 PBKDF2 派生加密密钥
- Token 存储在 `openclaw.json` 中，但以加密形式保存
- 加密格式：`{iv}:{authTag}:{ciphertext}`（均为 hex 编码）

```typescript
// 密钥派生示例
import crypto from 'node:crypto';
import os from 'node:os';

function deriveEncryptionKey(masterPassword?: string): Buffer {
  const seed = masterPassword || `${os.hostname()}:${os.userInfo().username}`;
  return crypto.pbkdf2Sync(seed, 'openclaw-guard-salt', 100000, 32, 'sha256');
}
```

**注意事项**：
- 不要将加密密钥存储在配置文件中
- 考虑使用操作系统级密钥管理（如 macOS Keychain、Windows Credential Manager），但这会引入平台依赖
- 最低限度：确保 `~/.openclaw/` 目录权限为 `700`

### 5.2 Token 刷新机制

**推荐实践：Refresh Token Rotation**

1. **自动刷新**：在 access_token 过期前 5 分钟自动触发刷新
2. **Refresh Token Rotation**：每次使用 refresh_token 获取新 access_token 时，同时获取新的 refresh_token，旧的立即失效
3. **刷新失败处理**：
   - 网络错误：重试 3 次，间隔递增（1s, 3s, 9s）
   - 401/403 错误：refresh_token 已失效，提示用户重新授权
   - 其他错误：记录日志，降级到提示用户手动处理

```typescript
// 刷新策略配置
const REFRESH_CONFIG = {
  refreshBeforeExpiry: 5 * 60 * 1000,  // 提前 5 分钟刷新
  maxRetries: 3,                         // 最大重试次数
  retryBackoff: [1000, 3000, 9000],     // 重试间隔（毫秒）
};
```

4. **并发刷新保护**：使用简单的锁机制防止多个请求同时触发 Token 刷新

### 5.3 PKCE 流程使用建议

**强烈推荐所有 OAuth 授权流程使用 PKCE（Proof Key for Code Exchange）**

openclaw-guard 作为本地运行的桌面/CLI 应用，属于 OAuth 2.0 规范中的"公共客户端"（Public Client），无法安全存储 client_secret。PKCE 是此场景下的标准安全增强方案。

**实现要点**：

```typescript
import crypto from 'node:crypto';

// 1. 生成 code_verifier（43-128 字符的随机字符串）
function generateCodeVerifier(): string {
  return crypto.randomBytes(32)
    .toString('base64url')
    .slice(0, 128);
}

// 2. 计算 code_challenge
function generateCodeChallenge(verifier: string): string {
  return crypto.createHash('sha256')
    .update(verifier)
    .digest('base64url');
}

// 3. 授权请求中包含 code_challenge
// GET /authorize?
//   response_type=code&
//   client_id=xxx&
//   redirect_uri=http://localhost:8088/oauth/callback/google&
//   scope=...&
//   state=random_state&
//   code_challenge=xxx&
//   code_challenge_method=S256

// 4. Token 请求中包含 code_verifier
// POST /token
//   grant_type=authorization_code&
//   code=xxx&
//   redirect_uri=...&
//   client_id=xxx&
//   code_verifier=original_verifier
```

**PKCE 使用建议**：

| 场景 | 是否使用 PKCE | 原因 |
|------|-------------|------|
| Google Gemini OAuth | ✅ 必须 | 公共客户端，Google 支持 PKCE |
| Azure AD OAuth | ✅ 推荐 | Azure AD 完整支持 PKCE |
| 通用 OAuth Provider | ✅ 推荐 | 如果 Provider 支持，始终启用 |
| Client Credentials Flow | ❌ 不适用 | 此 Flow 不涉及用户授权 |

### 5.4 其他安全建议

1. **State 参数**：每次授权请求生成随机 state 值，回调时验证，防止 CSRF 攻击
2. **Redirect URI 严格匹配**：仅接受 `localhost` 回调，避免 Token 泄露到外部
3. **Token 最小权限**：请求 OAuth scope 时仅申请必要的最小权限
4. **日志脱敏**：日志中不记录完整的 Token 值，仅记录前 8 位用于调试
5. **HTTPS 建议**：生产环境中 Guard Server 应启用 HTTPS，防止 Token 在传输中被截获

---

## 6. 实施路线图

### 第一阶段：基础设施准备（预计 1-2 周）

**目标**：搭建 OAuth 基础框架，不影响现有功能。

- [ ] 设计并实现 Token 加密存储模块（`src/crypto.ts`）
- [ ] 扩展配置 Schema，支持 `auth.type` 字段（向后兼容 `apiKey`）
- [ ] 实现 PKCE 工具函数（code_verifier / code_challenge 生成）
- [ ] 在 Guard Server 中注册 OAuth 路由框架（`/oauth/authorize/:provider`、`/oauth/callback/:provider`）
- [ ] 编写单元测试覆盖加密/解密和 PKCE 逻辑

### 第二阶段：Google Gemini OAuth 集成（预计 2-3 周）

**目标**：完成第一个 OAuth Provider 的端到端集成。

- [ ] 实现 Google OAuth 2.0 Authorization Code + PKCE 流程
- [ ] 实现 Token 刷新逻辑（自动刷新 + Refresh Token Rotation）
- [ ] 在 Web UI 中添加 Google OAuth 授权入口
- [ ] 实现 Token 状态查询接口（`GET /api/oauth/status/google`）
- [ ] 端到端测试：授权 → 获取 Token → 调用 Gemini API → Token 刷新

### 第三阶段：Azure OpenAI OAuth 集成（预计 1-2 周）

**目标**：支持企业级 Azure AD 认证。

- [ ] 实现 Azure AD OAuth 2.0 流程（Authorization Code + Client Credentials）
- [ ] 支持 Tenant ID 配置
- [ ] 在 Web UI 中添加 Azure OAuth 授权入口
- [ ] 测试 Azure OpenAI 端到端调用

### 第四阶段：通用 OAuth Provider 支持（预计 2-3 周）

**目标**：支持任意 OAuth 2.0 兼容的 AI Provider。

- [ ] 实现通用 OAuth 配置模板（用户可自定义 Authorization URL、Token URL、Scope 等）
- [ ] 在 Web UI 中提供 OAuth 参数配置表单
- [ ] 实现 OAuth Provider 的增删改查管理
- [ ] 编写集成测试和文档

### 第五阶段：安全加固与优化（预计 1 周）

**目标**：提升安全性和用户体验。

- [ ] 实现操作系统级密钥管理集成（可选，macOS Keychain / Windows Credential Manager）
- [ ] 添加 Token 过期提醒和自动重新授权引导
- [ ] 完善错误处理和用户提示
- [ ] 安全审计和渗透测试
- [ ] 编写用户文档和迁移指南

---

## 附录：技术决策摘要

| 决策项 | 选择 | 理由 |
|--------|------|------|
| 加密算法 | AES-256-GCM | Node.js 内置，认证加密，无需额外依赖 |
| 密钥派生 | PBKDF2 | 标准算法，Node.js 内置支持 |
| OAuth Flow | Authorization Code + PKCE | 公共客户端最佳实践，RFC 7636 |
| Token 存储位置 | `openclaw.json` 内加密字段 | 与现有配置管理统一，简化实现 |
| 首个集成 Provider | Google Gemini | OAuth 支持最完整，文档最丰富 |
| 向后兼容策略 | `apiKey` 字段继续支持 | 不影响现有用户，渐进式迁移 |
