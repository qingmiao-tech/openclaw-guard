<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useFeedbackStore } from '@/stores/feedback';

const feedback = useFeedbackStore();
const { toasts } = storeToRefs(feedback);
</script>

<template>
  <div class="toast-viewport" aria-live="polite" aria-atomic="true">
    <article
      v-for="toast in toasts"
      :key="toast.id"
      class="toast-card"
      :class="`toast-card--${toast.tone}`"
    >
      <div class="toast-card__content">
        <strong v-if="toast.title">{{ toast.title }}</strong>
        <p>{{ toast.message }}</p>
      </div>
      <button class="toast-card__close" type="button" @click="feedback.dismissToast(toast.id)">
        ×
      </button>
    </article>
  </div>
</template>
