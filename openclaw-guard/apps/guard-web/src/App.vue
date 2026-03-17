<script setup lang="ts">
import ConfirmDialog from '@/features/common/ConfirmDialog.vue';
import ToastViewport from '@/features/common/ToastViewport.vue';
import GuardShell from '@/features/shell/GuardShell.vue';
</script>

<template>
  <GuardShell />
  <ToastViewport />
  <ConfirmDialog />
</template>
