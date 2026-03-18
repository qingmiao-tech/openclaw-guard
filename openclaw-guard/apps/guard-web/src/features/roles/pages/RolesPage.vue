<script setup lang="ts">
import { computed, onMounted, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useAsyncResource } from '@/composables/useAsyncResource';
import { formatNumber } from '@/features/common/display';
import PageCard from '@/features/common/PageCard.vue';
import { loadRolesSnapshot, type AgentSummary } from '@/services/api/roles';
import { useUiStore } from '@/stores/ui';
import { useWorkspaceStore } from '@/stores/workspace';

type RolesSnapshot = Awaited<ReturnType<typeof loadRolesSnapshot>>;

let rolesCache: RolesSnapshot | null = null;

const ui = useUiStore();
const router = useRouter();
const workspace = useWorkspaceStore();
const resource = useAsyncResource(() => loadRolesSnapshot(), rolesCache, { immediate: false });

const agents = computed(() => resource.data?.agents || []);
const defaultCount = computed(() => agents.value.filter((agent) => agent.isDefault).length);
const workspaceReadyCount = computed(() => agents.value.filter((agent) => agent.workspaceExists).length);
const docReadyCount = computed(() => agents.value.filter((agent) => hasCoreDocs(agent)).length);

function hasCoreDocs(agent: AgentSummary) {
  return agent.docStatus.soul
    && agent.docStatus.user
    && agent.docStatus.agents
    && agent.docStatus.memory;
}

function openWorkspace(agent: AgentSummary) {
  workspace.setMode('all');
  workspace.setCurrentPath(agent.resolvedWorkspace);
  workspace.setSelectedFilePath('');
  workspace.setSelectedMemoryFilePath('');
  void router.push('/files');
}

function workspaceHeadline(agent: AgentSummary) {
  if (ui.developerMode) {
    return agent.resolvedWorkspace || agent.workspace || agent.id;
  }
  return agent.workspace || agent.id;
}

function workspaceHint(agent: AgentSummary) {
  if (ui.developerMode) {
    return ui.label('当前显示的是实际工作区路径。', 'Showing the resolved workspace path.');
  }
  if (!agent.workspaceExists) {
    return ui.label('Guard 还没有在当前机器上找到这个工作区目录。', 'Guard has not found this workspace directory on the current machine yet.');
  }
  return ui.label('实际工作区路径已收纳到开发者模式，可直接点击“打开工作区”继续查看。', 'The exact workspace path stays behind developer mode. Use Open workspace to continue.');
}

watch(() => resource.data, (value) => {
  if (value) rolesCache = value;
});

onMounted(() => {
  void resource.execute({ silent: !!resource.data });
});
</script>

<template>
  <div class="page-stack">
    <header class="page-header">
      <div>
        <p class="page-header__eyebrow">{{ ui.label('角色 / Third slice', 'Roles / Third slice') }}</p>
        <h2 class="page-header__title">{{ ui.label('角色目录', 'Role catalog') }}</h2>
        <p class="page-header__description">
          {{ ui.label('先把 Agent 目录、默认角色和工作区文档健康度迁进新壳层里，方便后续与文件视图和会话视图打通。', 'Move the agent catalog, default role state, and workspace doc health into the new shell so it can connect naturally with Files and Sessions next.') }}
        </p>
      </div>
      <button class="page-header__action" type="button" @click="resource.execute({ silent: true })">
        {{ resource.refreshing ? ui.label('刷新中…', 'Refreshing…') : ui.label('Refresh', 'Refresh') }}
      </button>
    </header>

    <div v-if="resource.loading && !resource.data" class="page-empty">
      {{ ui.label('正在读取角色目录…', 'Loading the role catalog…') }}
    </div>
    <div v-else-if="resource.error && !resource.data" class="page-empty page-empty--error">
      {{ resource.error }}
    </div>
    <template v-else>
      <div v-if="resource.error" class="status-banner status-banner--warning">
        {{ ui.label('宸蹭繚鐣欎笂涓€鐗堣鑹茬洰褰曪紝浣嗗悗鍙板埛鏂板け璐ワ細', 'The last role catalog is still on screen, but the background refresh failed: ') }}{{ resource.error }}
      </div>
      <PageCard :title="ui.label('团队概览', 'Team overview')" eyebrow="Summary">
        <div class="stat-grid">
          <article class="stat-card">
            <p class="stat-card__label">{{ ui.label('角色总数', 'Roles') }}</p>
            <strong>{{ formatNumber(agents.length) }}</strong>
            <span>{{ ui.label('当前已接入到 Guard 的角色目录', 'Role entries currently discovered by Guard') }}</span>
          </article>
          <article class="stat-card">
            <p class="stat-card__label">{{ ui.label('默认角色', 'Default role') }}</p>
            <strong>{{ formatNumber(defaultCount) }}</strong>
            <span>{{ defaultCount > 0 ? ui.label('至少有一个默认角色', 'At least one default role is configured') : ui.label('还没有默认角色', 'No default role is configured yet') }}</span>
          </article>
          <article class="stat-card">
            <p class="stat-card__label">{{ ui.label('工作区可用', 'Workspaces ready') }}</p>
            <strong>{{ formatNumber(workspaceReadyCount) }}</strong>
            <span>{{ ui.label('对应的工作区目录已经存在', 'The mapped workspace directory already exists') }}</span>
          </article>
          <article class="stat-card">
            <p class="stat-card__label">{{ ui.label('关键文档齐全', 'Core docs ready') }}</p>
            <strong>{{ formatNumber(docReadyCount) }}</strong>
            <span>SOUL / USER / AGENTS / MEMORY</span>
          </article>
        </div>
      </PageCard>

      <PageCard :title="ui.label('角色成员', 'Role entries')" eyebrow="Catalog">
        <div v-if="agents.length" class="provider-stack">
            <article v-for="agent in agents" :key="agent.id" class="provider-card">
              <header class="provider-card__header">
                <div>
                  <strong>{{ agent.name }}</strong>
                  <p>{{ workspaceHeadline(agent) }}</p>
                </div>
                <div class="pill-row">
                  <span v-if="agent.isDefault" class="pill pill--success">{{ ui.label('默认', 'Default') }}</span>
                  <span v-else class="pill pill--muted">{{ agent.id }}</span>
                  <span class="pill" :class="agent.workspaceExists ? 'pill--success' : 'pill--warning'">
                  {{ agent.workspaceExists ? ui.label('工作区就绪', 'Workspace ready') : ui.label('工作区缺失', 'Workspace missing') }}
                </span>
              </div>
            </header>

              <div class="mini-list">
                <div class="mini-list__item mini-list__item--stack">
                  <strong>{{ ui.label('模型路由', 'Model route') }}</strong>
                  <p>{{ agent.modelId || ui.label('沿用默认模型', 'Uses the default model route') }}</p>
                </div>
                <div class="mini-list__item mini-list__item--stack">
                  <strong>{{ ui.label('工作区映射', 'Workspace mapping') }}</strong>
                  <p>{{ workspaceHeadline(agent) }}</p>
                  <p>{{ workspaceHint(agent) }}</p>
                </div>
                <div class="mini-list__item mini-list__item--stack">
                  <strong>{{ ui.label('关键文档', 'Core docs') }}</strong>
                  <div class="pill-row">
                    <span class="pill" :class="agent.docStatus.soul ? 'pill--success' : 'pill--warning'">SOUL</span>
                    <span class="pill" :class="agent.docStatus.user ? 'pill--success' : 'pill--warning'">USER</span>
                  <span class="pill" :class="agent.docStatus.agents ? 'pill--success' : 'pill--warning'">AGENTS</span>
                  <span class="pill" :class="agent.docStatus.memory ? 'pill--success' : 'pill--warning'">MEMORY</span>
                </div>
              </div>
            </div>

            <div class="page-actions">
              <button class="inline-link inline-link--primary" type="button" @click="openWorkspace(agent)">
                {{ ui.label('打开对应工作区', 'Open workspace') }}
              </button>
            </div>
          </article>
        </div>
        <div v-else class="page-empty">
          {{ ui.label('还没有发现可用角色。请先检查 OpenClaw 配置和安装状态。', 'No role entries were discovered yet. Check the OpenClaw configuration and installation state first.') }}
        </div>
      </PageCard>
    </template>
  </div>
</template>
