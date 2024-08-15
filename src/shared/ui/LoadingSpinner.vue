<template>
  <div v-if="isVisible" class="fixed top-0 left-0 w-full h-full z-50 flex items-center justify-center bg-gray-900 bg-opacity-50">
    <span class="text-white text-lg animate-pulse">
      Loading
      <span
        v-for="n in 3"
        :key="n"
        class="animate-ping mr-2"
      >.</span>
    </span>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  isVisible: boolean
}>();
</script>
