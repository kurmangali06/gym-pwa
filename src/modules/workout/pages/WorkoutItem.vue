<template>
  <VanCell
    v-for="(e, index) in list"
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
import dayjs from 'dayjs';
import type { IStepsExercise, ITypeExercise } from '../model/DTO';
import { useWorkoutService } from '../model/service/index.service';
import { dictionaryMuscleGroup } from '../model/utils/constants';

const route = useRoute();
const currentList = ref<IStepsExercise[]>([]);
const show = ref(false);
const title = ref('');
const { getCurrentWorkout, deleteWorkoutExercise } = useWorkoutService();
const list = ref<ITypeExercise | null>(null);
function getALL() {
  getCurrentWorkout(dayjs(route.params.day as string).toDate()).then((res: any[]) => {
    list.value = res.reduce((acc, item) => {
      if (!acc[item.type])
        acc[item.type] = [];

      acc[item.type].push(item);

      return acc;
    }, {} as ITypeExercise);
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
    show.value = false;
    window.location.reload();
  });
}
</script>
