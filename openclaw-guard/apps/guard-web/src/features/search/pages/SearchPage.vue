<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import PageCard from '@/features/common/PageCard.vue';
import { formatNumber } from '@/features/common/display';
import { searchManagedFiles, type SearchHit } from '@/services/api/search';
import { useFeedbackStore } from '@/stores/feedback';
import { useUiStore } from '@/stores/ui';
import { isMemoryManagedPath, useWorkspaceStore } from '@/stores/workspace';

type SearchSnapshot = {
  query: string;
  results: SearchHit[];
};

let searchCache: SearchSnapshot | null = null;
let latestSearchRequestId = 0;

const ui = useUiStore();
const router = useRouter();
const feedback = useFeedbackStore();
const workspace = useWorkspaceStore();

const query = ref(workspace.searchQuery);
const loading = ref(false);
const error = ref<string | null>(null);
const searched = ref(false);
const results = ref<SearchHit[]>([]);
const lastCompletedQuery = ref('');

const distinctFileCount = computed(() => new Set(results.value.map((item) => item.path)).size);

watch(query, (value) => {
  workspace.setSearchQuery(value);
});

async function runSearch() {
  const trimmed = query.value.trim();
  const requestId = ++latestSearchRequestId;
  workspace.setSearchQuery(trimmed);
  searched.value = true;
  error.value = null;

  if (!trimmed) {
    results.value = [];
    return;
  }

  loading.value = true;
  try {
    const data = await searchManagedFiles(trimmed, 100);
    if (requestId !== latestSearchRequestId) {
      return;
    }
    results.value = data.results || [];
    lastCompletedQuery.value = trimmed;
    searchCache = {
      query: trimmed,
      results: [...results.value],
    };
  } catch (searchError) {
    if (requestId !== latestSearchRequestId) {
      return;
    }
    error.value = searchError instanceof Error ? searchError.message : String(searchError);
  } finally {
    if (requestId === latestSearchRequestId) {
      loading.value = false;
    }
  }
}

function openResult(item: SearchHit) {
  workspace.requestReveal(item.path);
  feedback.pushToast({
    tone: 'info',
    message: ui.label('已切到文件页并定位结果。', 'Switched to Files and queued the selected result.'),
    durationMs: 2200,
  });
  void router.push('/files');
}

onMounted(() => {
  if (workspace.searchQuery.trim()) {
    const trimmed = workspace.searchQuery.trim();
    if (searchCache?.query === trimmed) {
      searched.value = true;
      results.value = [...searchCache.results];
      lastCompletedQuery.value = trimmed;
      void runSearch();
      return;
    }
    void runSearch();
  }
});
</script>

<template>
  <div class="page-stack">
    <header class="page-header">
      <div>
        <p class="page-header__eyebrow">{{ ui.label('搜索 / Third slice', 'Search / Third slice') }}</p>
        <h2 class="page-header__title">{{ ui.label('工作区搜索', 'Workspace search') }}</h2>
        <p class="page-header__description">
          {{ ui.label('先让搜索直接覆盖 Guard 管理的工作区与核心记忆，并且可以一跳回到文件页继续编辑。', 'Start with search across Guard-managed workspaces and core memory, then jump straight back into Files to continue editing.') }}
        </p>
      </div>
      <button class="page-header__action" type="button" @click="runSearch">
        {{ loading ? ui.label('搜索中…', 'Searching…') : ui.label('Search', 'Search') }}
      </button>
    </header>

    <PageCard :title="ui.label('搜索条件', 'Search query')" eyebrow="Query">
      <form class="search-form" @submit.prevent="runSearch">
        <input
          v-model="query"
          class="settings-input"
          type="text"
          placeholder="SOUL.md / qwen / fallback / cron"
        />
        <button class="inline-link inline-link--primary" type="submit">
          {{ loading ? ui.label('搜索中…', 'Searching…') : ui.label('开始搜索', 'Run search') }}
        </button>
      </form>
    </PageCard>

    <div v-if="error && !results.length" class="page-empty page-empty--error">
      {{ error }}
    </div>
    <div v-else-if="error" class="status-banner status-banner--warning">
      {{ ui.label('已保留上一版搜索结果，但后台刷新失败：', 'The last search results are still on screen, but the background refresh failed: ') }}{{ error }}
    </div>

    <PageCard :title="ui.label('结果概览', 'Result overview')" eyebrow="Summary">
      <div class="stat-grid">
        <article class="stat-card">
          <p class="stat-card__label">{{ ui.label('命中条数', 'Matches') }}</p>
          <strong>{{ formatNumber(results.length) }}</strong>
          <span>{{ ui.label('当前查询返回的匹配行数', 'Matched lines returned for the current query') }}</span>
        </article>
        <article class="stat-card">
          <p class="stat-card__label">{{ ui.label('涉及文件', 'Files') }}</p>
          <strong>{{ formatNumber(distinctFileCount) }}</strong>
          <span>{{ ui.label('至少命中一次的文件数量', 'Files that matched at least once') }}</span>
        </article>
        <article class="stat-card">
          <p class="stat-card__label">{{ ui.label('当前查询', 'Current query') }}</p>
          <strong>{{ query.trim() || '-' }}</strong>
          <span>
            {{
              lastCompletedQuery
                ? ui.label(`当前展示的是“${lastCompletedQuery}”的结果`, `Currently showing results for "${lastCompletedQuery}"`)
                : (query.trim() ? ui.label('结果来自当前搜索词', 'Results are based on the current query') : ui.label('还没有输入搜索词', 'No search query yet'))
            }}
          </span>
        </article>
        <article class="stat-card">
          <p class="stat-card__label">{{ ui.label('打开方式', 'Open flow') }}</p>
          <strong>{{ ui.label('一跳到文件页', 'Jump into Files') }}</strong>
          <span>{{ ui.label('搜索结果会按文件或核心记忆模式自动定位', 'Results automatically open in file or core-memory mode') }}</span>
        </article>
      </div>
    </PageCard>

    <PageCard :title="ui.label('搜索结果', 'Results')" eyebrow="Results">
      <div v-if="loading && !results.length" class="page-empty">
        {{ ui.label('正在查找匹配结果…', 'Searching for matching results…') }}
      </div>
      <template v-else-if="results.length">
        <div v-if="loading" class="status-banner status-banner--info">
          {{ ui.label('正在后台刷新搜索结果…', 'Refreshing search results in the background…') }}
        </div>
        <div class="provider-stack">
        <article v-for="item in results" :key="`${item.path}:${item.line}:${item.preview}`" class="provider-card">
          <header class="provider-card__header">
            <div>
              <strong>{{ item.relativePath || item.path }}</strong>
              <p>{{ `L${item.line}` }}</p>
            </div>
            <div class="pill-row">
              <span class="pill" :class="isMemoryManagedPath(item.path) ? 'pill--success' : 'pill--info'">
                {{ isMemoryManagedPath(item.path) ? ui.label('核心记忆', 'Core memory') : ui.label('文件', 'File') }}
              </span>
            </div>
          </header>
          <p>{{ item.preview }}</p>
          <div class="page-actions">
            <button class="inline-link inline-link--primary" type="button" @click="openResult(item)">
              {{ ui.label('在文件页打开', 'Open in Files') }}
            </button>
          </div>
        </article>
        </div>
      </template>
      <div v-else class="page-empty">
        {{
          searched
            ? ui.label('当前搜索词没有命中任何文件。', 'The current query did not match any files.')
            : ui.label('输入关键词后开始搜索。', 'Enter a query to start searching.')
        }}
      </div>
    </PageCard>
  </div>
</template>
