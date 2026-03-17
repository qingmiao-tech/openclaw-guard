<script setup lang="ts">
defineProps<{
  title: string;
  eyebrow?: string;
}>();
</script>

<template>
  <section class="page-card">
    <header class="page-card__header">
      <div>
        <p v-if="eyebrow" class="page-card__eyebrow">{{ eyebrow }}</p>
        <h2 class="page-card__title">{{ title }}</h2>
      </div>
      <slot name="actions" />
    </header>
    <div class="page-card__body">
      <slot />
    </div>
  </section>
</template>
