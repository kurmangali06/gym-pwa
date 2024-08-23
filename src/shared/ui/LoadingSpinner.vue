<template>
  <div v-if="isVisible" class="fixed top-0 left-0 w-full h-full z-50 flex items-center justify-center bg-gray-900 bg-opacity-50">
    <VanLoading size="24px" type="spinner" />
  </div>
</template>

<script setup lang="ts">
defineProps<{
  isVisible: boolean
}>();
</script>
