<script setup lang="ts">
type PageTab = {
  id: string;
  label: string;
  hint?: string;
};

defineProps<{
  items: PageTab[];
  activeId: string;
}>();

const emit = defineEmits<{
  (event: 'change', value: string): void;
}>();
</script>

<template>
  <div class="page-tabs" role="tablist">
    <button
      v-for="item in items"
      :key="item.id"
      class="page-tabs__button"
      :class="{ 'page-tabs__button--active': item.id === activeId }"
      :data-tab-id="item.id"
      type="button"
      role="tab"
      :aria-selected="item.id === activeId"
      @click="emit('change', item.id)"
    >
      <span>{{ item.label }}</span>
      <small v-if="item.hint">{{ item.hint }}</small>
    </button>
  </div>
</template>
