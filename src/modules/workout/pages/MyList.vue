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
        v-for="(e, index) in list[step]"
        :key="index"
        center
        size="large"
        @click="detailInfo(e, dictionaryMuscleGroup[index])"
      >
        <VanTag size="large" type="success">
          {{ dictionaryMuscleGroup[index] }}
        </VanTag>
        <VanSwipe
          :autoplay="1000"
          class="my-swipe"
          indicator-color="white"
        >
          <VanSwipeItem v-for="(item, i) in e" :key="i">
            {{ item.label }}  <VanIcon name="cross" />   {{ checkKey(item) }}
          </VanSwipeItem>
        </VanSwipe>
      </VanCell>
    </VanTab>
  </VanTabs>

  <VanActionSheet v-model:show="show" :title="title">
    <div class="h-[50vh] flex flex-col items-center">
      <div
        v-for="item in currentList"
        :key="item.name"
      >
        <div class="flex justify-between items-center gap-5">
          <VanTag
            class="text-center"
            size="medium"
            type="primary"
          >
            {{ item.label }}
          </VanTag>
          <VanIcon
            color="#1989fa"
            name="delete"
            size="20px"
            @click="deleteExercise(item)"
          />
        </div>

        <div
          v-for="(e, index) in item"
          :key="index"
          class=" flex  justify-center"
        >
          <div v-if="typeof e === 'object' && 'count' in e">
            {{ e.weigh }} <VanIcon name="cross" />{{ e.count }}
          </div>
        </div>
      </div>
    </div>
  </VanActionSheet>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useWorkoutService } from '../model/service/index.service';
import type { IStepsExercise, ITypeExercise } from '../model/DTO';
import { dictionaryMuscleGroup } from '../model/utils/constants';

// Загрузка данных из сервиса
const { getWorkoutsAll, deleteWorkoutExercise } = useWorkoutService();

const active = ref(0);
const list = ref<Record<string, ITypeExercise>>({});
const countDate = ref<string[]>([]);
const currentList = ref<IStepsExercise[]>([]);
const show = ref(false);
const title = ref('');
// Загрузка и обработка данных
function getALL() {
  getWorkoutsAll().then((res: any[]) => {
    list.value = res.reduce((acc, item) => {
      const date = new Date(item.date);
      const yearMonthDay = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`; // Формат YYYY-MM-DD

      // Создание записи для каждой даты, если еще не существует
      if (!acc[yearMonthDay]) {
        acc[yearMonthDay] = {};
        countDate.value.push(yearMonthDay);
      }

      // Создание записи для каждого типа, если еще не существует
      if (!acc[yearMonthDay][item.type])
        acc[yearMonthDay][item.type] = [];

      // Добавление объекта в соответствующий тип и дату
      acc[yearMonthDay][item.type].push(item);

      return acc;
    }, {} as Record<string, Record<string, ITypeExercise>>);
  });
}
getALL();

function checkKey(val: any) {
  const keys = Object.keys(val);
  const filteredKeys = keys.filter(key => key.includes('approacher'));
  return filteredKeys.length;
}
function detailInfo(e: IStepsExercise[], text: string) {
  currentList.value = e;
  title.value = text;
  show.value = true;
}
async function deleteExercise(e: IStepsExercise) {
  await deleteWorkoutExercise(e.date).then((res) => {
    if (res)
      showNotify({ type: 'success', message: 'Запись удалена' });
  }).catch((_err) => {
    showNotify({ type: 'warning', message: _err });
  }).finally(() => {
    getALL();
    show.value = false;
  });
}
</script>

<style lang="css" scoped>
</style>
