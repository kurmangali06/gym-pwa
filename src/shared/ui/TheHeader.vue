<template>
  <VanNavBar
    left-arrow
    :title="namePage"
    @click-left="router.go(-1)"
  />
</template>

<script setup lang="ts">
const router = useRouter();
const route = useRoute();

const namePage = computed(() => route.name as string);
</script>
