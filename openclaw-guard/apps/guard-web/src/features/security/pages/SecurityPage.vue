<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { useAsyncResource } from '@/composables/useAsyncResource';
import PageCard from '@/features/common/PageCard.vue';
import PageTabs from '@/features/common/PageTabs.vue';
import {
  applySecurityProfile,
  loadHardeningSteps,
  loadSecurityAudit,
  loadSecurityProfiles,
} from '@/services/api/security';
import { useFeedbackStore } from '@/stores/feedback';
import { useUiStore } from '@/stores/ui';

type SecurityTab = 'audit' | 'profiles' | 'hardening';
type AuditSnapshot = Awaited<ReturnType<typeof loadSecurityAudit>>;
type ProfilesSnapshot = Awaited<ReturnType<typeof loadSecurityProfiles>>;
type HardeningSnapshot = Awaited<ReturnType<typeof loadHardeningSteps>>;

function detectClientPlatform(): 'windows' | 'macos' | 'linux' {
  if (typeof navigator === 'undefined') return 'linux';
  const platform = navigator.platform.toLowerCase();
  if (platform.includes('win')) return 'windows';
  if (platform.includes('mac')) return 'macos';
  return 'linux';
}

const ui = useUiStore();
const feedback = useFeedbackStore();
const activeTab = ref<SecurityTab>('audit');
const hardeningPlatform = ref<'windows' | 'macos' | 'linux'>(detectClientPlatform());
const applyingProfile = ref('');

let auditCache: AuditSnapshot | null = null;
let profilesCache: ProfilesSnapshot | null = null;
const hardeningCache = new Map<string, HardeningSnapshot | null>();

const auditResource = useAsyncResource(() => loadSecurityAudit(), auditCache, { immediate: false });
const profilesResource = useAsyncResource(() => loadSecurityProfiles(), profilesCache, { immediate: false });
const hardeningResource = useAsyncResource(
  () => loadHardeningSteps(hardeningPlatform.value),
  hardeningCache.get(hardeningPlatform.value) || null,
  { immediate: false },
);

const tabItems = computed(() => [
  { id: 'audit', label: ui.label('安全检查', 'Security checks') },
  { id: 'profiles', label: ui.label('权限模式', 'Permission modes') },
  { id: 'hardening', label: ui.label('主机加固', 'Host hardening') },
]);

const groupedAuditResults = computed(() => {
  const groups = new Map<string, Array<{ item: string; status: string; message: string; fix?: string }>>();
  for (const result of auditResource.data?.results || []) {
    if (!groups.has(result.category)) {
      groups.set(result.category, []);
    }
    groups.get(result.category)?.push(result);
  }
  return Array.from(groups.entries());
});

watch(() => auditResource.data, (value) => {
  if (value) auditCache = value;
});

watch(() => profilesResource.data, (value) => {
  if (value) profilesCache = value;
});

watch(() => hardeningResource.data, (value) => {
  if (value) hardeningCache.set(hardeningPlatform.value, value);
});

watch(
  activeTab,
  (value) => {
    if (value === 'audit' && !auditResource.data && !auditResource.loading) {
      void auditResource.execute();
    }
    if (value === 'profiles' && !profilesResource.data && !profilesResource.loading) {
      void profilesResource.execute();
    }
    if (value === 'hardening' && !hardeningResource.data && !hardeningResource.loading) {
      void hardeningResource.execute();
    }
  },
  { immediate: true },
);

watch(hardeningPlatform, () => {
  hardeningResource.data = hardeningCache.get(hardeningPlatform.value) || null;
  if (activeTab.value === 'hardening') {
    void hardeningResource.execute({ silent: !!hardeningResource.data });
  }
});

function getAuditTone(status: string) {
  if (status === 'pass') return 'pill--success';
  if (status === 'warn') return 'pill--warning';
  return 'pill--danger';
}

function getAuditLabel(status: string) {
  if (status === 'pass') return ui.label('通过', 'Pass');
  if (status === 'warn') return ui.label('警告', 'Warning');
  return ui.label('失败', 'Fail');
}

async function refreshCurrentTab() {
  if (activeTab.value === 'audit') {
    await auditResource.execute({ silent: !!auditResource.data });
    return;
  }
  if (activeTab.value === 'profiles') {
    await profilesResource.execute({ silent: !!profilesResource.data });
    return;
  }
  await hardeningResource.execute({ silent: !!hardeningResource.data });
}

async function handleApplyProfile(profileKey: string) {
  applyingProfile.value = profileKey;
  try {
    const result = await applySecurityProfile(profileKey);
    feedback.pushToast({
      tone: result.success ? 'success' : 'error',
      message: result.message,
    });
  } catch (error) {
    feedback.pushToast({
      tone: 'error',
      message: error instanceof Error ? error.message : String(error),
    });
  } finally {
    applyingProfile.value = '';
  }
}

function handleTabChange(value: string) {
  activeTab.value = value as SecurityTab;
}
</script>

<template>
  <div class="page-stack">
    <header class="page-header">
      <div>
        <p class="page-header__eyebrow">{{ ui.label('安全 / Second slice', 'Security / Second slice') }}</p>
        <h2 class="page-header__title">{{ ui.label('安全基线', 'Security baseline') }}</h2>
        <p class="page-header__description">
          {{ ui.label('把长页面拆成页内分栏，只在当前视图读取必要数据，让安全页更像决策面板，而不是说明书。', 'Split the long page into internal tabs and load only the current view so the security page feels like a decision panel instead of a manual.') }}
        </p>
      </div>
      <button class="page-header__action" type="button" @click="refreshCurrentTab">
        {{
          (activeTab === 'audit' && auditResource.refreshing)
            || (activeTab === 'profiles' && profilesResource.refreshing)
            || (activeTab === 'hardening' && hardeningResource.refreshing)
            ? ui.label('刷新中…', 'Refreshing…')
            : ui.label('刷新当前视图', 'Refresh current view')
        }}
      </button>
    </header>

    <PageTabs :items="tabItems" :active-id="activeTab" @change="handleTabChange" />

    <template v-if="activeTab === 'audit'">
      <div v-if="auditResource.loading && !auditResource.data" class="page-empty">
        {{ ui.label('正在读取安全检查结果…', 'Loading security checks…') }}
      </div>
      <div v-else-if="auditResource.error && !auditResource.data" class="page-empty page-empty--error">
        {{ auditResource.error }}
      </div>
      <template v-else-if="auditResource.data">
        <div v-if="auditResource.error" class="status-banner status-banner--warning">
          {{ ui.label('已保留上一版安全检查快照，但后台刷新失败：', 'The last security-check snapshot is still on screen, but the background refresh failed: ') }}{{ auditResource.error }}
        </div>

        <PageCard :title="ui.label('安全检查（Beta）', 'Security checks (Beta)')" eyebrow="Audit">
          <p class="muted-copy">
            {{ ui.label('这里更像建议型检查，而不是正式合规证明。优先处理失败项，其次处理警告项。', 'This area behaves like advisory checks rather than a formal proof of compliance. Handle failures first, then warnings.') }}
          </p>
          <div class="stat-grid">
            <article class="stat-card">
              <p class="stat-card__label">{{ ui.label('通过项', 'Pass') }}</p>
              <strong>{{ auditResource.data.summary.pass }}</strong>
              <span>{{ ui.label('当前无需处理', 'No action needed right now') }}</span>
            </article>
            <article class="stat-card">
              <p class="stat-card__label">{{ ui.label('警告项', 'Warning') }}</p>
              <strong>{{ auditResource.data.summary.warn }}</strong>
              <span>{{ ui.label('建议尽快检查', 'Recommended to review soon') }}</span>
            </article>
            <article class="stat-card">
              <p class="stat-card__label">{{ ui.label('失败项', 'Fail') }}</p>
              <strong>{{ auditResource.data.summary.fail }}</strong>
              <span>{{ ui.label('需要优先处理', 'Highest priority') }}</span>
            </article>
          </div>
        </PageCard>

        <PageCard :title="ui.label('检查详情', 'Detailed findings')" eyebrow="Details">
          <div class="provider-stack">
            <article v-for="[category, items] in groupedAuditResults" :key="category" class="provider-card">
              <header class="provider-card__header">
                <strong>{{ category }}</strong>
                <span class="pill pill--muted">{{ items.length }}</span>
              </header>
              <div class="mini-list">
                <div v-for="item in items" :key="`${category}-${item.item}`" class="mini-list__item mini-list__item--stack">
                  <div class="provider-card__header">
                    <strong>{{ item.item }}</strong>
                    <span class="pill" :class="getAuditTone(item.status)">{{ getAuditLabel(item.status) }}</span>
                  </div>
                  <p>{{ item.message }}</p>
                  <p v-if="item.fix" class="muted-copy">{{ ui.label('建议处理：', 'Suggested fix: ') }}{{ item.fix }}</p>
                </div>
              </div>
            </article>
          </div>
        </PageCard>
      </template>
    </template>

    <template v-else-if="activeTab === 'profiles'">
      <div v-if="profilesResource.loading && !profilesResource.data" class="page-empty">
        {{ ui.label('正在读取权限模式…', 'Loading permission modes…') }}
      </div>
      <div v-else-if="profilesResource.error && !profilesResource.data" class="page-empty page-empty--error">
        {{ profilesResource.error }}
      </div>
      <template v-else-if="profilesResource.data">
        <div v-if="profilesResource.error" class="status-banner status-banner--warning">
          {{ ui.label('已保留上一版权限模式快照，但后台刷新失败：', 'The last permission-mode snapshot is still on screen, but the background refresh failed: ') }}{{ profilesResource.error }}
        </div>

        <PageCard :title="ui.label('权限模式', 'Permission modes')" eyebrow="Profiles">
          <p class="muted-copy">
            {{ ui.label('这些模式当前只会更新 OpenClaw 的工具权限配置，不会自动完成系统账户、ACL、Docker 或整机加固。', 'These modes currently update only the OpenClaw tool-permission config. They do not automatically complete system users, ACLs, Docker, or full host hardening.') }}
          </p>
        </PageCard>

        <div class="provider-stack">
          <PageCard
            v-for="profile in profilesResource.data"
            :key="profile.key"
            :title="profile.name"
            eyebrow="Profile"
          >
            <div class="provider-card__header">
              <p class="muted-copy">{{ profile.description }}</p>
              <span class="pill pill--info">{{ profile.riskLevel || ui.label('未标注风险等级', 'Risk level not declared') }}</span>
            </div>

            <div class="settings-grid settings-grid--wide">
              <div class="settings-field">
                <span>{{ ui.label('建议使用场景', 'Recommended use cases') }}</span>
                <div class="mini-list">
                  <div v-for="item in profile.recommendations || []" :key="item" class="mini-list__item mini-list__item--stack">
                    <p>{{ item }}</p>
                  </div>
                </div>
              </div>
              <div class="settings-field">
                <span>{{ ui.label('允许规则', 'Allow rules') }}</span>
                <template v-if="ui.developerMode">
                  <pre class="code-panel">{{ (profile.tools?.allow || []).join('\n') || '(none)' }}</pre>
                </template>
                <p v-else class="muted-copy">
                  {{ ui.label(`当前包含 ${(profile.tools?.allow || []).length} 条允许规则。需要查看原始规则列表时，请先到 Settings 打开开发者模式。`, `${(profile.tools?.allow || []).length} allow rules are included. Enable developer mode from Settings when you need the raw rule list.`) }}
                </p>
              </div>
              <div class="settings-field">
                <span>{{ ui.label('拒绝规则', 'Deny rules') }}</span>
                <template v-if="ui.developerMode">
                  <pre class="code-panel">{{ (profile.tools?.deny || []).join('\n') || '(none)' }}</pre>
                </template>
                <p v-else class="muted-copy">
                  {{ ui.label(`当前包含 ${(profile.tools?.deny || []).length} 条拒绝规则。需要查看原始规则列表时，请先到 Settings 打开开发者模式。`, `${(profile.tools?.deny || []).length} deny rules are included. Enable developer mode from Settings when you need the raw rule list.`) }}
                </p>
              </div>
            </div>

            <div class="page-actions">
              <button class="inline-link inline-link--primary" type="button" :disabled="applyingProfile === profile.key" @click="handleApplyProfile(profile.key)">
                {{ applyingProfile === profile.key ? ui.label('应用中…', 'Applying…') : ui.label('应用权限模式', 'Apply permission mode') }}
              </button>
            </div>
          </PageCard>
        </div>
      </template>
    </template>

    <template v-else>
      <div v-if="hardeningResource.loading && !hardeningResource.data" class="page-empty">
        {{ ui.label('正在读取主机加固建议…', 'Loading hardening guidance…') }}
      </div>
      <div v-else-if="hardeningResource.error && !hardeningResource.data" class="page-empty page-empty--error">
        {{ hardeningResource.error }}
      </div>
      <template v-else-if="hardeningResource.data">
        <div v-if="hardeningResource.error" class="status-banner status-banner--warning">
          {{ ui.label('已保留上一版主机加固快照，但后台刷新失败：', 'The last hardening snapshot is still on screen, but the background refresh failed: ') }}{{ hardeningResource.error }}
        </div>

        <PageCard :title="ui.label('主机加固指南（Beta）', 'Host hardening guide (Beta)')" eyebrow="Hardening">
          <p class="muted-copy">
            {{ ui.label('基础建议在所有平台上都类似：尽量使用非管理员账户运行，并把工作区边界收紧。Windows 上的独立低权限账户更适合长期后台运行或共享机器场景，不是所有人的默认强制项。', 'The baseline is similar on every platform: prefer non-admin execution and keep the workspace boundary tight. On Windows, a dedicated low-privilege account is better treated as an advanced option for long-running or shared-machine setups, not a blanket default requirement.') }}
          </p>
          <div class="pill-row">
            <button class="pill-button" :class="{ 'pill-button--active': hardeningPlatform === 'windows' }" type="button" @click="hardeningPlatform = 'windows'">Windows</button>
            <button class="pill-button" :class="{ 'pill-button--active': hardeningPlatform === 'macos' }" type="button" @click="hardeningPlatform = 'macos'">macOS</button>
            <button class="pill-button" :class="{ 'pill-button--active': hardeningPlatform === 'linux' }" type="button" @click="hardeningPlatform = 'linux'">Linux</button>
            <a class="inline-link" :href="`/api/harden/script?platform=${hardeningPlatform}`">
              {{ ui.label('下载脚本', 'Download script') }}
            </a>
          </div>
        </PageCard>

        <div class="provider-stack">
          <PageCard
            v-for="step in hardeningResource.data.steps"
            :key="step.id"
            :title="step.title"
            eyebrow="Step"
          >
            <div class="provider-card__header">
              <p class="muted-copy">{{ step.description }}</p>
              <span class="pill" :class="step.optional ? 'pill--muted' : 'pill--warning'">
                {{ step.optional ? ui.label('可选', 'Optional') : ui.label('建议', 'Recommended') }}
              </span>
            </div>
            <template v-if="ui.developerMode">
              <pre class="code-panel">{{ (step.commands || []).join('\n') || ui.label('当前没有附带命令。', 'No commands are attached to this step.') }}</pre>
            </template>
            <p v-else class="muted-copy">
              {{ step.commands?.length
                ? ui.label(`这个步骤附带 ${step.commands.length} 条命令，默认已收纳到开发者模式中。`, `This step includes ${step.commands.length} commands, which now stay behind developer mode by default.`)
                : ui.label('这个步骤当前没有附带命令。', 'No commands are attached to this step right now.') }}
            </p>
          </PageCard>
        </div>
      </template>
    </template>
  </div>
</template>
