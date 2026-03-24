<script setup lang="ts">
import { computed, onMounted, watch } from 'vue';
import { useAsyncResource } from '@/composables/useAsyncResource';
import PageCard from '@/features/common/PageCard.vue';
import { loadOpenClawSnapshot } from '@/services/api/dashboard';
import { useUiStore } from '@/stores/ui';

type OpenClawSnapshot = Awaited<ReturnType<typeof loadOpenClawSnapshot>>;

let openClawCache: OpenClawSnapshot | null = null;

const ui = useUiStore();
const resource = useAsyncResource(() => loadOpenClawSnapshot(), openClawCache, { immediate: false });

const status = computed<Record<string, unknown>>(() => (
  resource.data?.status && typeof resource.data.status === 'object'
    ? resource.data.status as Record<string, unknown>
    : {}
));

const targets = computed<Record<string, unknown>>(() => (
  resource.data?.targets && typeof resource.data.targets === 'object'
    ? resource.data.targets as Record<string, unknown>
    : {}
));

const installed = computed(() => status.value.installed === true);
const installedLabel = computed(() => (
  installed.value
    ? ui.label('已安装', 'Installed')
    : ui.label('未安装', 'Not installed')
));

const versionLabel = computed(() => String(status.value.version || '-'));
const sourceLabel = computed(() => String(status.value.detectedSource || '-'));
const updaterLabel = computed(() => String(status.value.effectiveUpdater || targets.value.effectiveUpdater || '-'));
const packageManagerLabel = computed(() => String(status.value.packageManager || '-'));
const installCommand = computed(() => String(status.value.installCommand || '-'));
const installReady = computed(() => status.value.installReady === true);
const installBlockers = computed(() => (
  Array.isArray(status.value.installBlockers)
    ? status.value.installBlockers.map((item) => String(item)).filter(Boolean)
    : []
));
const platformNotes = computed(() => (
  Array.isArray(status.value.platformNotes)
    ? status.value.platformNotes.map((item) => String(item)).filter(Boolean)
    : []
));
const channels = computed(() => (
  Array.isArray(targets.value.channels)
    ? targets.value.channels.map((item) => String(item)).filter(Boolean)
    : []
));
const distTags = computed(() => (
  targets.value.distTags && typeof targets.value.distTags === 'object'
    ? Object.entries(targets.value.distTags as Record<string, unknown>)
      .map(([key, value]) => `${key}: ${String(value)}`)
    : []
));

function prettyPrint(value: unknown) {
  return JSON.stringify(value, null, 2);
}

watch(() => resource.data, (value) => {
  if (value) openClawCache = value;
});

onMounted(() => {
  void resource.execute({ silent: !!resource.data });
});
</script>

<template>
  <div class="page-stack">
    <header class="page-header">
      <div>
        <p class="page-header__eyebrow">{{ ui.label('OpenClaw / 生命周期', 'OpenClaw / Lifecycle') }}</p>
        <h2 class="page-header__title">{{ ui.label('OpenClaw 运行与安装状态', 'OpenClaw runtime and install state') }}</h2>
        <p class="page-header__description">
          {{
            ui.label(
              '集中查看当前 OpenClaw 是否已安装、来自哪里、后续应使用什么更新策略，以及本机还能走哪些安全安装路径。',
              'Review whether OpenClaw is installed, where it was detected from, which updater is active, and which safe install paths are still available on this machine.',
            )
          }}
        </p>
      </div>
      <button class="page-header__action" type="button" @click="resource.execute({ silent: true })">
        {{ resource.refreshing ? ui.label('刷新中…', 'Refreshing…') : ui.label('刷新', 'Refresh') }}
      </button>
    </header>

    <div v-if="resource.loading && !resource.data" class="page-empty">
      {{ ui.label('正在读取 OpenClaw 状态…', 'Loading OpenClaw status…') }}
    </div>

    <div v-else-if="resource.error && !resource.data" class="page-empty page-empty--error">
      {{ resource.error }}
    </div>

    <template v-else-if="resource.data">
      <div v-if="resource.error" class="status-banner status-banner--warning">
        {{ ui.label('上一版 OpenClaw 快照仍然保留，但后台刷新失败：', 'The last OpenClaw snapshot is still on screen, but the background refresh failed: ') }}{{ resource.error }}
      </div>

      <PageCard :title="ui.label('当前状态', 'Current status')" eyebrow="Status">
        <div class="stat-grid">
          <article class="stat-card">
            <p class="stat-card__label">OpenClaw</p>
            <strong>{{ installedLabel }}</strong>
            <span>{{ versionLabel }}</span>
          </article>
          <article class="stat-card">
            <p class="stat-card__label">{{ ui.label('检测来源', 'Detected source') }}</p>
            <strong>{{ sourceLabel }}</strong>
            <span>{{ String(status.installKind || '-') }}</span>
          </article>
          <article class="stat-card">
            <p class="stat-card__label">{{ ui.label('更新策略', 'Updater') }}</p>
            <strong>{{ updaterLabel }}</strong>
            <span>{{ packageManagerLabel }}</span>
          </article>
          <article class="stat-card">
            <p class="stat-card__label">{{ ui.label('安装就绪', 'Install ready') }}</p>
            <strong>{{ installReady ? ui.label('可执行', 'Ready') : ui.label('有阻塞', 'Blocked') }}</strong>
            <span>{{ String(status.latestVersion || '-') }}</span>
          </article>
        </div>
      </PageCard>

      <PageCard :title="ui.label('安装与更新提示', 'Install and update guidance')" eyebrow="Guide">
        <div
          class="status-banner"
          :class="installReady ? 'status-banner--success' : 'status-banner--warning'"
        >
          <div>
            <strong>{{ ui.label('推荐命令', 'Recommended command') }}</strong>
            <p class="muted-copy">{{ installCommand }}</p>
          </div>
        </div>

        <div v-if="installBlockers.length" class="list-stack">
          <article v-for="item in installBlockers" :key="item" class="risk-row">
            <strong>{{ ui.label('当前阻塞', 'Current blocker') }}</strong>
            <span>{{ item }}</span>
          </article>
        </div>
        <p v-else class="muted-copy">
          {{ ui.label('当前没有额外安装阻塞，可以继续按推荐命令或控制台工作流处理。', 'No extra install blockers were reported. You can continue with the recommended command or the console workflow.') }}
        </p>
      </PageCard>

      <PageCard :title="ui.label('目标目录与渠道', 'Target catalog and channels')" eyebrow="Catalog">
        <div class="list-stack">
          <article class="action-row">
            <div>
              <h3>{{ ui.label('可用渠道', 'Available channels') }}</h3>
              <p>{{ channels.length ? channels.join(' / ') : '-' }}</p>
            </div>
          </article>
          <article class="action-row">
            <div>
              <h3>{{ ui.label('Dist Tags', 'Dist tags') }}</h3>
              <p>{{ distTags.length ? distTags.join(' · ') : '-' }}</p>
            </div>
          </article>
          <article v-if="platformNotes.length" class="action-row">
            <div>
              <h3>{{ ui.label('平台提示', 'Platform notes') }}</h3>
              <p>{{ platformNotes.join(' ') }}</p>
            </div>
          </article>
        </div>
      </PageCard>

      <PageCard
        v-if="ui.developerMode"
        :title="ui.label('OpenClaw 原始状态', 'Raw OpenClaw status')"
        eyebrow="Developer"
      >
        <pre class="code-panel">{{ prettyPrint(resource.data.status) }}</pre>
      </PageCard>

      <PageCard
        v-if="ui.developerMode"
        :title="ui.label('OpenClaw 目标清单', 'Raw OpenClaw target catalog')"
        eyebrow="Developer"
      >
        <pre class="code-panel">{{ prettyPrint(resource.data.targets) }}</pre>
      </PageCard>
    </template>
  </div>
</template>
