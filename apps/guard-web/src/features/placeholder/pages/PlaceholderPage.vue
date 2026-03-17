<script setup lang="ts">
import { computed } from 'vue';
import PageCard from '@/features/common/PageCard.vue';
import { useUiStore } from '@/stores/ui';

const props = defineProps<{
  titleZh: string;
  titleEn: string;
  descriptionZh: string;
  descriptionEn: string;
  legacyHash: string;
}>();

const ui = useUiStore();
const title = computed(() => ui.label(props.titleZh, props.titleEn));
const description = computed(() => ui.label(props.descriptionZh, props.descriptionEn));
const legacyLabel = computed(() => ui.label('打开当前正式控制台中的这一页', 'Open this page in the current production console'));
</script>

<template>
  <div class="page-stack">
    <header class="page-header">
      <div>
        <p class="page-header__eyebrow">{{ ui.label('迁移排队中', 'Queued for migration') }}</p>
        <h2 class="page-header__title">{{ title }}</h2>
        <p class="page-header__description">{{ description }}</p>
      </div>
      <a class="page-header__action page-header__action--link" :href="`/${legacyHash}`" target="_blank" rel="noreferrer">
        {{ legacyLabel }}
      </a>
    </header>

    <PageCard :title="ui.label('当前阶段说明', 'Current phase')">
      <p class="muted-copy">
        {{ ui.label('这一页已经纳入新的 Vue + Pinia + Router 骨架，但业务区块还没从旧版原生脚本完全迁过来。保留直接跳转旧控制台，是为了让迁移期间的实际操作不中断。', 'This page is already part of the new Vue + Pinia + Router skeleton, but its business modules have not fully moved over from the native script yet. The legacy shortcut keeps real operations uninterrupted during the migration window.') }}
      </p>
    </PageCard>
  </div>
</template>
