<script setup lang="ts">
import PageCard from '@/features/common/PageCard.vue';
import { formatOAuthPhaseLabel } from '@/features/recovery/recovery-helpers';
import type {
  ConnectDraft,
  GitProviderOption,
  OAuthDraft,
  OAuthState,
  RecoverySnapshot,
  TokenDraft,
} from '@/features/recovery/useRecoveryPageState';
import { useUiStore } from '@/stores/ui';

const props = defineProps<{
  overview: RecoverySnapshot['overview'];
  gitStatus: RecoverySnapshot['gitStatus'];
  gitProviderOptions: GitProviderOption[];
  connectDraft: ConnectDraft;
  tokenDraft: TokenDraft;
  oauthDraft: OAuthDraft;
  authSummary: string;
  oauthTone: string;
  oauthAuthorizeUrl: string;
  oauthState: OAuthState;
  runningAction: string;
}>();

const emit = defineEmits<{
  (event: 'connect-remote'): void;
  (event: 'check-private'): void;
  (event: 'token-auth'): void;
  (event: 'oauth-start'): void;
  (event: 'copy-auth-url'): void;
}>();

const ui = useUiStore();
</script>

<template>
  <PageCard :title="ui.label('高级 Git 工具', 'Advanced Git tools')" eyebrow="Advanced">
    <p class="muted-copy">
      {{ ui.label('远端连接、认证、同步检查、保护点提交、推送和 .gitignore 建议都已经收口到这里。日常的保护与恢复流程，现在可以直接留在当前控制台里完成。', 'Remote connection, authentication, sync checks, checkpoints, push actions, and .gitignore suggestions now live here. The normal protection and recovery workflow can stay in this console.') }}
    </p>
    <div class="pill-row">
      <span class="pill" :class="overview.remoteReady ? 'pill--success' : 'pill--warning'">
        {{ overview.remoteReady ? ui.label('云端保护已就绪', 'Cloud protection ready') : ui.label('云端保护尚未就绪', 'Cloud protection not ready') }}
      </span>
      <span class="pill" :class="gitStatus.authConfigured ? 'pill--success' : 'pill--muted'">
        {{ gitStatus.authConfigured ? ui.label('认证已配置', 'Authentication configured') : ui.label('认证未配置', 'Authentication not configured') }}
      </span>
    </div>
    <p class="muted-copy">
      {{ ui.label('大部分保护流程都可以直接在这里完成，只有极少数底层排障才需要切回 CLI。', 'Most protection flows can stay here; only a small set of low-level troubleshooting cases should still need the CLI.') }}
    </p>
  </PageCard>

  <PageCard :title="ui.label('远端连接', 'Remote connection')" eyebrow="Remote">
    <p class="muted-copy">
      {{ ui.label('先把保护主线接到 GitHub 或 Gitee 的私有仓库上。Guard 会优先沿这条线保存恢复点和云端备份。', 'Connect the protection line to a private GitHub or Gitee repository first. Guard uses this path for recovery points and cloud protection.') }}
    </p>
    <div class="settings-grid settings-grid--wide">
      <label class="settings-field">
        <span>{{ ui.label('Provider', 'Provider') }}</span>
        <select v-model="connectDraft.provider" class="settings-input">
          <option v-for="option in gitProviderOptions" :key="option.value" :value="option.value">
            {{ ui.label(option.zh, option.en) }}
          </option>
        </select>
      </label>
      <label class="settings-field">
        <span>{{ ui.label('远端名称', 'Remote name') }}</span>
        <input v-model="connectDraft.remoteName" class="settings-input" type="text" />
      </label>
      <label class="settings-field settings-field--full">
        <span>{{ ui.label('远端仓库地址', 'Remote URL') }}</span>
        <small>{{ ui.label('当前只支持 GitHub / Gitee，后续私有仓检查也会沿用这里的地址。', 'Only GitHub / Gitee are supported right now, and the private-repo verification uses this same remote.') }}</small>
        <input
          v-model="connectDraft.remoteUrl"
          data-testid="recovery-remote-url"
          class="settings-input"
          type="text"
          placeholder="https://github.com/owner/private-repo.git"
        />
      </label>
    </div>
    <div class="page-actions">
      <button
        data-testid="recovery-connect-remote"
        class="inline-link inline-link--primary"
        type="button"
        :disabled="runningAction === 'connect'"
        @click="emit('connect-remote')"
      >
        {{ runningAction === 'connect' ? ui.label('绑定中…', 'Connecting…') : ui.label('绑定远端仓库', 'Connect remote') }}
      </button>
      <button class="inline-link" type="button" :disabled="runningAction === 'private'" @click="emit('check-private')">
        {{ runningAction === 'private' ? ui.label('检查中…', 'Checking…') : ui.label('检查私有仓库', 'Check private remote') }}
      </button>
      <a
        v-if="gitStatus.remoteWebUrl"
        class="inline-link"
        :href="gitStatus.remoteWebUrl"
        target="_blank"
        rel="noreferrer"
      >
        {{ ui.label('打开远端仓库', 'Open remote') }}
      </a>
    </div>
  </PageCard>

  <PageCard :title="ui.label('远端认证', 'Remote authentication')" eyebrow="Auth">
    <div class="provider-card__header">
      <p class="muted-copy">{{ authSummary }}</p>
      <div class="pill-row">
        <span class="pill" :class="gitStatus.authConfigured ? 'pill--success' : 'pill--muted'">
          {{ gitStatus.authMode || ui.label('未配置', 'Not configured') }}
        </span>
        <span class="pill" :class="oauthTone">
          {{ formatOAuthPhaseLabel(ui, oauthState?.phase) }}
        </span>
      </div>
    </div>

    <div class="settings-grid settings-grid--wide">
      <label class="settings-field">
        <span>{{ ui.label('Token Provider', 'Token provider') }}</span>
        <select v-model="tokenDraft.provider" class="settings-input">
          <option v-for="option in gitProviderOptions" :key="`token-${option.value}`" :value="option.value">
            {{ ui.label(option.zh, option.en) }}
          </option>
        </select>
      </label>
      <label class="settings-field">
        <span>{{ ui.label('账号（可选）', 'Username (optional)') }}</span>
        <input v-model="tokenDraft.username" class="settings-input" type="text" />
      </label>
      <label class="settings-field settings-field--full">
        <span>{{ ui.label('HTTPS Token', 'HTTPS token') }}</span>
        <small>{{ ui.label('如果你想直接用 HTTPS 完成提交和推送，就在这里保存 Token。', 'Save a token here if you want Guard to commit and push with HTTPS credentials.') }}</small>
        <input v-model="tokenDraft.token" class="settings-input" type="password" autocomplete="off" />
      </label>
    </div>
    <p class="muted-copy">
      {{ ui.label('已保存的 Token 不会在这里回显；如果后续要轮换，请重新粘贴新的 Token。', 'Saved tokens are never echoed here. Paste a new one again when you need to rotate credentials.') }}
    </p>
    <div class="page-actions">
      <button class="inline-link inline-link--primary" type="button" :disabled="runningAction === 'token'" @click="emit('token-auth')">
        {{ runningAction === 'token' ? ui.label('保存中…', 'Saving…') : ui.label('保存 Token 认证', 'Save token auth') }}
      </button>
    </div>

    <div class="settings-grid settings-grid--wide">
      <label class="settings-field">
        <span>{{ ui.label('OAuth Provider', 'OAuth provider') }}</span>
        <select v-model="oauthDraft.provider" class="settings-input">
          <option v-for="option in gitProviderOptions" :key="`oauth-${option.value}`" :value="option.value">
            {{ ui.label(option.zh, option.en) }}
          </option>
        </select>
      </label>
      <label class="settings-field">
        <span>{{ ui.label('回调端口', 'Redirect port') }}</span>
        <input v-model="oauthDraft.redirectPort" class="settings-input" type="number" min="1" max="65535" />
      </label>
      <label class="settings-field settings-field--full">
        <span>{{ ui.label('Scope', 'Scope') }}</span>
        <input v-model="oauthDraft.scope" class="settings-input" type="text" />
      </label>
      <label class="settings-field">
        <span>{{ ui.label('Client ID', 'Client ID') }}</span>
        <input v-model="oauthDraft.clientId" class="settings-input" type="text" />
      </label>
      <label class="settings-field">
        <span>{{ ui.label('Client Secret', 'Client Secret') }}</span>
        <input v-model="oauthDraft.clientSecret" class="settings-input" type="password" autocomplete="off" />
      </label>
    </div>
    <div class="page-actions">
      <button class="inline-link" type="button" :disabled="runningAction === 'oauth'" @click="emit('oauth-start')">
        {{ runningAction === 'oauth' ? ui.label('启动中…', 'Starting…') : ui.label('启动 OAuth', 'Start OAuth') }}
      </button>
      <button class="inline-link" type="button" :disabled="!oauthAuthorizeUrl" @click="emit('copy-auth-url')">
        {{ ui.label('复制授权地址', 'Copy auth URL') }}
      </button>
    </div>
    <p class="muted-copy">
      {{
        oauthState?.phase === 'success'
          ? (oauthState.message || ui.label('OAuth 已完成，可以继续私有仓检查或一键同步。', 'OAuth completed. Continue with private-check or sync.'))
          : oauthState?.phase === 'error'
            ? (oauthState.error || oauthState.message || ui.label('OAuth 失败，请检查网络、Client ID、Client Secret 和回调设置。', 'OAuth failed. Check the network, Client ID, Client Secret, and callback settings.'))
            : ui.label('如果你更偏好浏览器授权，可以在这里填写 Client ID / Client Secret。', 'Configure Client ID / Client Secret here if you prefer browser OAuth.')
      }}
    </p>
    <p v-if="oauthAuthorizeUrl" class="muted-copy">
      {{ ui.label('授权地址：', 'Authorize URL: ') }}
      <a :href="oauthAuthorizeUrl" target="_blank" rel="noreferrer">{{ oauthAuthorizeUrl }}</a>
    </p>
    <pre v-if="ui.developerMode" class="code-panel">{{ JSON.stringify(oauthState || {}, null, 2) }}</pre>
  </PageCard>
</template>
