<script setup lang="ts">
import { useRouter } from 'vue-router';
import { formatNumber } from '@/features/common/display';
import PageCard from '@/features/common/PageCard.vue';
import { hasCoreDocs, useRolesPageState } from '@/features/roles/useRolesPageState';
import type { AgentSummary } from '@/services/api/roles';
import { useUiStore } from '@/stores/ui';
import { useWorkspaceStore } from '@/stores/workspace';

const ui = useUiStore();
const router = useRouter();
const workspace = useWorkspaceStore();
const {
  resource,
  agents,
  defaults,
  draft,
  saving,
  deleting,
  defaultCount,
  workspaceReadyCount,
  docReadyCount,
  isCreateMode,
  editorModeLabel,
  beginCreateAgent,
  editAgent,
  resetDraft,
  refresh,
  handleSaveAgent,
  handleDeleteAgent,
  handleSetDefault,
} = useRolesPageState();

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
  return ui.label('实际工作区路径已收拢到开发者模式里，可直接点“打开工作区”继续查看。', 'The exact workspace path stays behind developer mode. Use Open workspace to continue.');
}
</script>

<template>
  <div class="page-stack">
    <header class="page-header">
      <div>
        <p class="page-header__eyebrow">{{ ui.label('角色 / 工作区', 'Roles / Workspace') }}</p>
        <h2 class="page-header__title">{{ ui.label('角色目录', 'Role catalog') }}</h2>
        <p class="page-header__description">
          {{
            ui.label(
              '现在除了只读查看以外，也可以直接在这里新增 Agent、调整默认角色，并维护工作区和模型路由配置。',
              'This page now supports adding agents, switching the default role, and maintaining workspace and model routing config directly from the console.',
            )
          }}
        </p>
      </div>
      <div class="page-actions">
        <button class="inline-link" type="button" data-testid="roles-add-agent" @click="beginCreateAgent">
          {{ ui.label('新增 Agent', 'Add agent') }}
        </button>
        <button class="page-header__action" type="button" @click="refresh">
          {{ resource.refreshing ? ui.label('刷新中…', 'Refreshing…') : ui.label('Refresh', 'Refresh') }}
        </button>
      </div>
    </header>

    <div v-if="resource.loading && !resource.data" class="page-empty">
      {{ ui.label('正在读取角色目录…', 'Loading the role catalog…') }}
    </div>
    <div v-else-if="resource.error && !resource.data" class="page-empty page-empty--error">
      {{ resource.error }}
    </div>
    <template v-else>
      <div v-if="resource.error" class="status-banner status-banner--warning">
        {{ ui.label('上一版角色目录仍然保留在页面上，但后台刷新失败了：', 'The last role catalog is still on screen, but the background refresh failed: ') }}{{ resource.error }}
      </div>

      <PageCard :title="ui.label('团队概览', 'Team overview')" eyebrow="Summary">
        <div class="stat-grid">
          <article class="stat-card">
            <p class="stat-card__label">{{ ui.label('角色总数', 'Roles') }}</p>
            <strong>{{ formatNumber(agents.length) }}</strong>
            <span>{{ ui.label('当前已接入到 Guard 的角色条目', 'Role entries currently discovered by Guard') }}</span>
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

      <PageCard :title="ui.label('Agent 配置', 'Agent configuration')" eyebrow="Editor">
        <div class="provider-card__header">
          <div>
            <strong>{{ editorModeLabel }}</strong>
            <p class="muted-copy">
              {{
                ui.label(
                  `默认工作区：${defaults.workspace}；默认模型：${defaults.modelId || '未设置'}`,
                  `Default workspace: ${defaults.workspace}; default model: ${defaults.modelId || 'not set'}`,
                )
              }}
            </p>
          </div>
          <div class="pill-row">
            <span class="pill" :class="draft.originalId ? 'pill--warning' : 'pill--success'">
              {{ draft.originalId ? ui.label('编辑模式', 'Edit mode') : ui.label('新增模式', 'Create mode') }}
            </span>
            <span class="pill pill--info">
              {{ draft.isDefault ? ui.label('将设为默认', 'Will be default') : ui.label('非默认角色', 'Non-default role') }}
            </span>
          </div>
        </div>

        <div class="settings-grid settings-grid--wide">
          <label class="settings-field">
            <span>{{ ui.label('Agent ID', 'Agent ID') }}</span>
            <input
              v-model="draft.id"
              data-testid="roles-agent-id"
              class="settings-input"
              type="text"
              placeholder="agent-demo"
              spellcheck="false"
            />
          </label>
          <label class="settings-field">
            <span>{{ ui.label('显示名称', 'Display name') }}</span>
            <input
              v-model="draft.name"
              data-testid="roles-agent-name"
              class="settings-input"
              type="text"
              :placeholder="ui.label('留空则跟随 Agent ID', 'Leave blank to follow the agent id')"
              spellcheck="false"
            />
          </label>
          <label class="settings-field settings-field--full">
            <span>{{ ui.label('工作区路径', 'Workspace path') }}</span>
            <input
              v-model="draft.workspace"
              data-testid="roles-agent-workspace"
              class="settings-input"
              type="text"
              spellcheck="false"
            />
          </label>
          <label class="settings-field settings-field--full">
            <span>{{ ui.label('模型路由（可选）', 'Model route (optional)') }}</span>
            <input
              v-model="draft.modelId"
              data-testid="roles-agent-model"
              class="settings-input"
              type="text"
              :placeholder="defaults.modelId || ui.label('留空则使用默认模型', 'Leave blank to use the default model')"
              spellcheck="false"
            />
          </label>
        </div>

        <div class="settings-grid settings-grid--wide">
          <label class="settings-toggle">
            <div class="settings-toggle__copy">
              <strong>{{ ui.label('设为默认角色', 'Set as default role') }}</strong>
              <span>
                {{
                  ui.label(
                    '保存后会清掉其它 Agent 的默认标记，并把当前 Agent 作为主角色。',
                    'Saving clears the default flag on other agents and promotes this one as the primary role.',
                  )
                }}
              </span>
            </div>
            <input v-model="draft.isDefault" data-testid="roles-agent-default" type="checkbox" />
          </label>

          <label class="settings-toggle">
            <div class="settings-toggle__copy">
              <strong>{{ ui.label('缺失时自动创建工作区目录', 'Create workspace folder if missing') }}</strong>
              <span>
                {{
                  ui.label(
                    '只会创建目录本身，不会自动写入 SOUL / USER / AGENTS 等文档。',
                    'This only creates the workspace folder itself when it is missing. Enable the bootstrap option below if you also want starter docs.',
                  )
                }}
              </span>
            </div>
            <input v-model="draft.ensureWorkspace" type="checkbox" />
          </label>

          <label v-if="isCreateMode" class="settings-toggle">
            <div class="settings-toggle__copy">
              <strong>{{ ui.label('初始化核心工作区文档', 'Bootstrap core workspace docs') }}</strong>
              <span>
                {{
                  ui.label(
                    '仅在新建 Agent 时生效，只补齐缺失的 SOUL / USER / AGENTS 文档和 memory/ 目录，不会覆盖已有内容。',
                    'Applies only when creating a new agent. It fills in missing SOUL / USER / AGENTS docs and the memory/ folder without overwriting existing content.',
                  )
                }}
              </span>
            </div>
            <input v-model="draft.bootstrapWorkspaceDocs" data-testid="roles-agent-bootstrap-docs" type="checkbox" />
          </label>
        </div>

        <div class="settings-note">
          {{
            ui.label(
              'Agent 配置会直接写入当前生效的 openclaw.json；如果你在源码工作区或自定义状态目录里运行 Guard，也会写到对应位置。',
              'Agent changes are written into the active openclaw.json for the current Guard runtime, including custom state-dir or workspace-based setups.',
            )
          }}
        </div>

        <div class="page-actions">
          <button
            class="inline-link inline-link--primary"
            data-testid="roles-agent-save"
            type="button"
            :disabled="saving"
            @click="handleSaveAgent"
          >
            {{ saving ? ui.label('保存中…', 'Saving…') : ui.label('保存 Agent', 'Save agent') }}
          </button>
          <button
            class="inline-link"
            data-testid="roles-agent-reset"
            type="button"
            :disabled="saving || deleting"
            @click="resetDraft"
          >
            {{ ui.label('重置草稿', 'Reset draft') }}
          </button>
          <button class="inline-link" type="button" :disabled="saving || deleting" @click="beginCreateAgent">
            {{ ui.label('切换到新增', 'Switch to create') }}
          </button>
          <button
            v-if="draft.canDelete"
            class="inline-link"
            data-testid="roles-agent-delete"
            type="button"
            :disabled="saving || deleting"
            @click="handleDeleteAgent"
          >
            {{ deleting ? ui.label('删除中…', 'Deleting…') : ui.label('删除 Agent', 'Delete agent') }}
          </button>
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
                <span v-if="!agent.isConfigured" class="pill pill--info">{{ ui.label('隐式默认', 'Implicit default') }}</span>
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
                <p v-if="hasCoreDocs(agent)" class="muted-copy">
                  {{ ui.label('关键工作区文档已经基本齐全。', 'The core workspace docs are already in place.') }}
                </p>
              </div>
            </div>

            <div class="page-actions">
              <button class="inline-link inline-link--primary" type="button" @click="openWorkspace(agent)">
                {{ ui.label('打开工作区', 'Open workspace') }}
              </button>
              <button
                v-if="agent.isConfigured"
                class="inline-link"
                data-testid="roles-agent-edit"
                type="button"
                @click="editAgent(agent)"
              >
                {{ ui.label('编辑配置', 'Edit config') }}
              </button>
              <button
                v-if="agent.isConfigured && !agent.isDefault"
                class="inline-link"
                data-testid="roles-agent-set-default"
                type="button"
                @click="handleSetDefault(agent)"
              >
                {{ ui.label('设为默认', 'Make default') }}
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
