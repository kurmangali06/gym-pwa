<template>
  <nav class="flex justify-around items-center">
    <div
      v-for="menu in menuList"
      :key="menu.link.name"
      :class="currentRouter === menu.link.name ? 'text-blue-500' : 'text-black'"
    >
      <RouterLink :to="menu.link">
        <ATooltip placement="topLeft" :title="menu.title">
          <component :is="menu.icon" style="font-size: 20px; padding: 10px;" />
        </ATooltip>
      </RouterLink>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { PageName } from 'shared/lib/types/app/pages';
import { useRoute } from 'vue-router';
import {
  CustomerServiceOutlined,
  HomeOutlined,
  OrderedListOutlined,
} from '@ant-design/icons-vue';

const route = useRoute();

const currentRouter = computed(() => route.name as string);

const menuList = ref([
  {
    title: 'главная',
    link: {
      name: PageName.BASE_HOME,
    },
    icon: HomeOutlined,
  },
  {
    title: 'Мои записи',
    link: {
      name: PageName.BASE_LIST,
    },
    icon: OrderedListOutlined,
  },
  {
    title: 'тренировка',
    link: {
      name: PageName.BASE_SELECT,
    },
    icon: CustomerServiceOutlined,
  },
],
);
</script>
