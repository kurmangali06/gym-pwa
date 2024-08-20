<template>
  <VanTabbar v-model="currentRouter">
    <VanTabbarItem
      v-for="item in menuList"
      :key="item.title"
      :icon="item.icon"
      :to="item.link"
    >
      {{ item.title }}
    </VanTabbarItem>
  </VanTabbar>
</template>

<script setup lang="ts">
import { PageName } from 'shared/lib/types/app/pages';
import { useRoute } from 'vue-router';

const route = useRoute();
const currentRouter = computed(() => route.name as string);
const menuList = ref([
  {
    title: 'главная',
    link: {
      name: PageName.BASE_HOME,
    },
    icon: 'wap-home-o',
  },
  {
    title: 'Мои записи',
    link: {
      name: PageName.BASE_LIST,
    },
    icon: 'orders-o',
  },
  {
    title: 'тренировка',
    link: {
      name: PageName.BASE_SELECT,
    },
    icon: 'edit',
  },
],
);
</script>
