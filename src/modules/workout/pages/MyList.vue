<template>
  <VanTabs
    :active="active"
  >
    <VanTab
      v-for="step in countDate"
      :key="step"
      :title="`${step}`"
    >
      <VanCell
        v-for="e in list[step]"
        :key="e.value"
        :title="e.name"
      >
        {{ Object.keys(e).length - 2 }}
      </VanCell>
    </VanTab>
  </VanTabs>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useWorkoutService } from '../model/service/index.service';

// Загрузка данных из сервиса
const { getWorkoutsAll } = useWorkoutService();

const active = ref(0);
const list = ref<Record<string, any[]>>({});
const countDate = ref<string[]>([]);
// Загрузка и обработка данных
getWorkoutsAll().then((res: any[]) => {
  list.value = res.reduce((acc, item) => {
    const date = new Date(item.date);
    const yearMonthDay = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`; // Формат YYYY-MM-DD

    if (!acc[yearMonthDay]) {
      countDate.value.push(yearMonthDay);
      acc[yearMonthDay] = [];
    }

    acc[yearMonthDay].push(item);

    return acc;
  }, {} as Record<string, any[]>);
});
</script>

<style lang="css" scoped>
</style>
