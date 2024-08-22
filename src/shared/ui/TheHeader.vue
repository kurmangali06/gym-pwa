<template>
  <VanNavBar
    left-arrow
    :title="namePage"
    @click-left="router.go(-1)"
  />
</template>

<script setup lang="ts">
import { PageName, dictionaryPage } from 'shared/lib/types/app/pages';

const router = useRouter();
const route = useRoute();

const namePage = computed(() => {
  return route.name as PageName === PageName.BASE_CURRENT_WORKOUT
    ? `${(dictionaryPage as Record<PageName, string>)[route.name as PageName]}: ${route.params.day}`
    : (dictionaryPage as Record<PageName, string>)[route.name as PageName];
});
</script>
