<script setup lang="ts">
import { formatNumber } from '@/features/common/display';
import PageCard from '@/features/common/PageCard.vue';
import PathTreeList from '@/features/recovery/components/PathTreeList.vue';
import type { PathTreeNode } from '@/features/recovery/path-tree';
import type {
  GuidanceItem,
  RecoverySnapshot,
  ScopeSummaryItem,
} from '@/features/recovery/useRecoveryPageState';
import { useUiStore } from '@/stores/ui';

const props = defineProps<{
  gitStatus: RecoverySnapshot['gitStatus'];
  gitIgnorePreview: RecoverySnapshot['gitIgnorePreview'];
  scopeSummaryItems: ScopeSummaryItem[];
  stageableTreeNodes: PathTreeNode[];
  allChangedTreeNodes: PathTreeNode[];
  embeddedRepoGuidance: GuidanceItem[];
  runningAction: string;
}>();

const emit = defineEmits<{
  (event: 'copy-stageable-list'): void;
  (event: 'copy-skipped-repos'): void;
  (event: 'apply-gitignore'): void;
}>();

const ui = useUiStore();
</script>

<template>
  <PageCard :title="ui.label('同步范围建议', 'Sync scope guidance')" eyebrow="Scope">
    <p class="muted-copy">
      {{ ui.label('目标不是把整个 .openclaw 全量塞进 Git，而是把真正值得换机保留的内容和运行副产物分开。', 'The goal is not to push the entire .openclaw into Git, but to separate high-value portable content from runtime by-products.') }}
    </p>
    <div class="stat-grid">
      <article v-for="item in scopeSummaryItems" :key="item.key" class="stat-card">
        <p class="stat-card__label">{{ item.label }}</p>
        <strong>{{ item.value }}</strong>
        <span>{{ item.detail }}</span>
      </article>
    </div>
    <div v-if="gitStatus.skippedEmbeddedRepos.length" class="status-banner status-banner--warning">
      {{ ui.label(`Guard 检测到 ${gitStatus.skippedEmbeddedRepos.length} 个嵌套 Git 仓库。它们不会被纳入外层 .openclaw 的本次提交，请按下方建议单独处理。`, `Guard detected ${gitStatus.skippedEmbeddedRepos.length} embedded Git repositories. They stay outside the current root .openclaw commit and should be handled separately.`) }}
    </div>
  </PageCard>

  <PageCard :title="ui.label('这次会提交哪些内容？', 'What will be included in this commit')" eyebrow="Tree">
    <div class="provider-card__header">
      <p class="muted-copy">
        {{ ui.label('改成目录树展示，既能看清结构，也不会被超长平铺列表拖慢。这里只展示会进入外层保护仓库提交的路径。', 'Rendered as a folder tree so the structure stays visible without a huge flat list. Only the paths entering the root protection commit are shown here.') }}
      </p>
      <button class="inline-link" type="button" @click="emit('copy-stageable-list')">
        {{ ui.label('复制完整清单', 'Copy full list') }}
      </button>
    </div>
    <PathTreeList
      :nodes="stageableTreeNodes"
      :expand-depth="0"
      :empty-label="ui.label('当前没有可直接提交的普通文件。', 'No stageable root-repo files detected.')"
    />
    <details v-if="allChangedTreeNodes.length" class="provider-card">
      <summary class="provider-card__header">
        <strong>{{ ui.label('查看全部变更目录树', 'View all changed paths') }}</strong>
        <span class="pill pill--muted">{{ formatNumber(gitStatus.changedFiles.length) }}</span>
      </summary>
      <div class="list-stack">
        <p class="muted-copy">
          {{ ui.label('这里会包含将被跳过的嵌套仓库路径，方便你对照完整范围做判断。', 'This broader tree includes paths that may be skipped as embedded repositories, so you can compare against the full working scope.') }}
        </p>
        <PathTreeList
          :nodes="allChangedTreeNodes"
          :expand-depth="0"
          :empty-label="ui.label('当前没有本地变更。', 'No local changes.')"
        />
      </div>
    </details>
  </PageCard>

  <PageCard :title="ui.label('已自动跳过的嵌套仓库', 'Skipped embedded repositories')" eyebrow="Embedded">
    <div class="provider-card__header">
      <p class="muted-copy">
        {{ ui.label('这些路径带有自己的 .git，不会被外层保护仓库纳入本次提交。你可以继续独立维护它们，或按需要重新规划边界。', 'These paths contain their own .git directories and stay outside the root protection commit. You can keep them independent or re-plan the boundary as needed.') }}
      </p>
      <button class="inline-link" type="button" @click="emit('copy-skipped-repos')">
        {{ ui.label('复制仓库列表', 'Copy repo list') }}
      </button>
    </div>
    <div v-if="gitStatus.skippedEmbeddedRepos.length" class="list-stack">
      <article v-for="repoPath in gitStatus.skippedEmbeddedRepos" :key="repoPath" class="provider-card">
        <header class="provider-card__header">
          <strong>{{ repoPath }}/</strong>
          <span class="pill pill--warning">{{ ui.label('已自动跳过', 'Skipped') }}</span>
        </header>
        <p>{{ ui.label('这是嵌套 Git 仓库，需要单独处理，或加入外层忽略规则。', 'This is an embedded Git repository and should be handled separately or added to the root ignore rules.') }}</p>
      </article>
    </div>
    <div v-else class="page-empty">
      {{ ui.label('当前没有检测到嵌套 Git 仓库。', 'No embedded Git repositories detected right now.') }}
    </div>
    <div class="settings-grid settings-grid--wide">
      <article v-for="item in embeddedRepoGuidance" :key="item.key" class="provider-card">
        <strong>{{ item.title }}</strong>
        <p>{{ item.detail }}</p>
      </article>
    </div>
  </PageCard>

  <PageCard :title="ui.label('.gitignore 建议', '.gitignore suggestions')" eyebrow="Ignore rules">
    <p class="muted-copy">
      {{ ui.label('当检测到新的嵌套仓库时，可以先看建议块，再一键追加推荐规则。', 'When Guard detects new nested repositories, review the suggestion block first and then append the recommended rules with one action.') }}
    </p>
    <div class="stat-grid">
      <article class="stat-card">
        <p class="stat-card__label">{{ ui.label('嵌套仓库', 'Embedded repos') }}</p>
        <strong>{{ gitIgnorePreview.embeddedRepos.length }}</strong>
        <span>{{ ui.label('需要单独维护的子仓库', 'Child repositories that should be maintained separately') }}</span>
      </article>
      <article class="stat-card">
        <p class="stat-card__label">{{ ui.label('待追加规则', 'Missing rules') }}</p>
        <strong>{{ gitIgnorePreview.missingEntries.length }}</strong>
        <span>{{ gitIgnorePreview.gitignorePath }}</span>
      </article>
    </div>
    <pre v-if="ui.developerMode" class="code-panel">{{ gitIgnorePreview.appendBlock || ui.label('当前没有需要追加的规则。', 'There are no extra rules to append right now.') }}</pre>
    <p v-else class="muted-copy">
      {{ ui.label('推荐规则的原始追加块已经收口到开发者模式中。若你需要逐行检查 appendBlock，请先到 Settings 打开开发者模式。', 'The raw append block for recommended rules now stays behind developer mode. Enable it from Settings if you need to inspect the exact appendBlock line by line.') }}
    </p>
    <div class="page-actions">
      <button class="inline-link" type="button" :disabled="runningAction === 'gitignore'" @click="emit('apply-gitignore')">
        {{ runningAction === 'gitignore' ? ui.label('写入中…', 'Applying…') : ui.label('追加推荐规则', 'Append recommended rules') }}
      </button>
    </div>
  </PageCard>
</template>
