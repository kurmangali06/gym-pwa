<template>
  <VanGrid :column-num="3">
    <VanGridItem
      v-for="step in countDate"
      :key="step"
      badge="212"
      :text="step"
      :to="{
        name: PageName.BASE_CURRENT_WORKOUT,
        params: {
          day: step,
        },

      }"
    />
  </VanGrid>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { PageName } from 'shared/lib/types/app/pages';
import { useWorkoutService } from '../model/service/index.service';

const { getWorkoutsAll } = useWorkoutService();
const countDate = ref<string[]>([]);

function getALL() {
  getWorkoutsAll().then((res: any[]) => {
    res.reduce((acc, item) => {
      const date = new Date(item.date);
      const yearMonthDay = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`; // Формат YYYY-MM-DD
      if (!acc[yearMonthDay]) {
        acc[yearMonthDay] = {};
        countDate.value.push(yearMonthDay);
      }
      return acc;
    }, {} as Record<string, string>);
  });
}
getALL();
</script>

<style lang="css" scoped>
</style>
