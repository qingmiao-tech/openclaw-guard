<script setup lang="ts">
import { computed } from 'vue';
import { storeToRefs } from 'pinia';
import { useFeedbackStore } from '@/stores/feedback';

const feedback = useFeedbackStore();
const { confirmRequest } = storeToRefs(feedback);
const visible = computed(() => !!confirmRequest.value);
</script>

<template>
  <div v-if="visible" class="confirm-backdrop" @click.self="feedback.resolveConfirm(false)">
    <section class="confirm-dialog" :class="{ 'confirm-dialog--danger': confirmRequest?.tone === 'danger' }">
      <header class="confirm-dialog__header">
        <p class="page-card__eyebrow">Confirm</p>
        <h2 class="page-card__title">{{ confirmRequest?.title }}</h2>
      </header>
      <p class="confirm-dialog__body">{{ confirmRequest?.message }}</p>
      <footer class="confirm-dialog__footer">
        <button class="inline-link" type="button" @click="feedback.resolveConfirm(false)">
          {{ confirmRequest?.cancelLabel }}
        </button>
        <button
          class="inline-link"
          :class="{ 'inline-link--danger': confirmRequest?.tone === 'danger' }"
          type="button"
          @click="feedback.resolveConfirm(true)"
        >
          {{ confirmRequest?.confirmLabel }}
        </button>
      </footer>
    </section>
  </div>
</template>
