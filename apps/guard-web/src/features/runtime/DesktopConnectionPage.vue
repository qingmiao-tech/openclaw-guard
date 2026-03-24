<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { useRuntimeStore } from '@/stores/runtime';
import { useUiStore } from '@/stores/ui';

type StartupGuide = {
  platform: string;
  commands: string[];
};

const ui = useUiStore();
const runtime = useRuntimeStore();

const draftApiBaseUrl = ref(runtime.apiBaseUrl);
const formError = ref('');
const showGuide = ref(false);

const lastCheckedLabel = computed(() => {
  if (!runtime.lastCheckedAt) {
    return ui.label('尚未检测', 'Not checked yet');
  }
  return new Date(runtime.lastCheckedAt).toLocaleString();
});

const startupGuides = computed<StartupGuide[]>(() => [
  {
    platform: 'Windows PowerShell',
    commands: [
      'openclaw-guard web --port 18088',
      'openclaw-guard web-background start --port 18088',
    ],
  },
  {
    platform: 'macOS / Linux',
    commands: [
      'openclaw-guard web --port 18088',
      'openclaw-guard web-background start --port 18088',
    ],
  },
]);

watch(
  () => runtime.apiBaseUrl,
  (value) => {
    draftApiBaseUrl.value = value;
  },
);

async function retry() {
  formError.value = '';
  await runtime.probeConnection();
}

async function saveAndRetry() {
  formError.value = '';
  try {
    runtime.setApiBaseUrl(draftApiBaseUrl.value);
    await runtime.probeConnection();
  } catch (error) {
    formError.value = error instanceof Error ? error.message : String(error);
  }
}

function resetToDefault() {
  formError.value = '';
  runtime.resetApiBaseUrl();
  draftApiBaseUrl.value = runtime.defaultApiBaseUrl;
}

async function openDocs() {
  formError.value = '';
  try {
    await runtime.openSupportDocs();
  } catch (error) {
    formError.value = error instanceof Error ? error.message : String(error);
  }
}
</script>

<template>
  <div class="login-screen">
    <section class="login-card desktop-connection-card">
      <div class="login-card__copy">
        <p class="page-card__eyebrow">{{ ui.label('桌面预览 / Desktop', 'Desktop preview / Thin shell') }}</p>
        <h1 class="page-card__title">{{ ui.label('连接本地 Guard', 'Connect to a local Guard instance') }}</h1>
        <p class="muted-copy">
          {{
            ui.label(
              '桌面壳本身不会代你启动后端，它只连接一个已经运行中的 Guard Web / Guard API。先确认本机 Guard 已启动，再回到这里重新检测。',
              'The desktop shell does not start Guard for you. It only connects to an already running Guard Web / Guard API on this machine.',
            )
          }}
        </p>
      </div>

      <div class="login-command">
        <span>{{ ui.label('当前目标地址', 'Current target address') }}</span>
        <code>{{ runtime.apiBaseUrl }}</code>
      </div>

      <label class="field-stack">
        <span>{{ ui.label('连接设置', 'Connection settings') }}</span>
        <input
          v-model="draftApiBaseUrl"
          class="input-field"
          type="text"
          spellcheck="false"
          :placeholder="runtime.defaultApiBaseUrl"
        />
      </label>

      <div class="page-inline-status">
        <span class="pill" :class="runtime.connected ? 'pill--success' : 'pill--warning'">
          {{
            runtime.connected
              ? ui.label('Guard 可连接', 'Guard reachable')
              : ui.label('暂时无法连接', 'Guard unavailable')
          }}
        </span>
        <span class="pill pill--info">
          {{ ui.label('最近检测', 'Last checked') }}: {{ lastCheckedLabel }}
        </span>
      </div>

      <p v-if="runtime.connectionError || formError" class="login-error">
        {{ formError || runtime.connectionError }}
      </p>

      <div class="page-actions">
        <button class="inline-link inline-link--primary" type="button" :disabled="runtime.checking" @click="retry">
          {{
            runtime.checking
              ? ui.label('检测中…', 'Checking…')
              : ui.label('重新检测', 'Retry connection')
          }}
        </button>
        <button class="inline-link" type="button" :disabled="runtime.checking" @click="saveAndRetry">
          {{ ui.label('保存并重试', 'Save and retry') }}
        </button>
        <button class="inline-link" type="button" :disabled="runtime.checking" @click="resetToDefault">
          {{ ui.label('恢复默认地址', 'Reset to default') }}
        </button>
        <button class="inline-link" type="button" @click="showGuide = !showGuide">
          {{ showGuide ? ui.label('收起启动说明', 'Hide startup guide') : ui.label('查看启动说明', 'Open startup guide') }}
        </button>
      </div>

      <div v-if="showGuide" class="list-stack">
        <div class="status-banner status-banner--warning">
          <div>
            <strong>{{ ui.label('先启动 Guard，再回到桌面壳', 'Start Guard first, then come back here') }}</strong>
            <p class="muted-copy">
              {{
                ui.label(
                  '下面给的是最常用的本地启动命令。默认端口是 18088；如果你改过端口，这里的地址也要一起改。',
                  'These are the most common local startup commands. The default port is 18088, so change both places if you use another port.',
                )
              }}
            </p>
          </div>
        </div>

        <article v-for="guide in startupGuides" :key="guide.platform" class="page-card">
          <header class="page-card__header">
            <div>
              <p class="page-card__eyebrow">Startup</p>
              <h2 class="page-card__title">{{ guide.platform }}</h2>
            </div>
          </header>
          <div class="page-card__body">
            <div v-for="command in guide.commands" :key="command" class="login-command">
              <span>{{ ui.label('推荐命令', 'Suggested command') }}</span>
              <code>{{ command }}</code>
            </div>
          </div>
        </article>

        <div class="settings-note">
          <strong>{{ ui.label('文档站', 'Documentation') }}</strong>
          <span>
            {{
              ui.label(
                '如果你需要完整的首次启动步骤、密码回看、更新和恢复说明，可以直接打开官方文档站。',
                'Open the official documentation if you need the full first-run, password recovery, update, or restore guide.',
              )
            }}
            <button class="inline-link" type="button" @click="openDocs">
              {{ ui.label('查看文档', 'Open docs') }}
            </button>
          </span>
        </div>
      </div>
    </section>
  </div>
</template>
