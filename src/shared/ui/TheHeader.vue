<template>
  <VanNavBar
    left-arrow
    :title="namePage"
    @click-left="router.go(-1)"
  />
</template>

<script setup lang="ts">
import type { PageName } from 'shared/lib/types/app/pages';
import { dictionaryPage } from 'shared/lib/types/app/pages';

const router = useRouter();
const route = useRoute();

const namePage = computed(() => dictionaryPage[route.name as PageName]);
</script>
