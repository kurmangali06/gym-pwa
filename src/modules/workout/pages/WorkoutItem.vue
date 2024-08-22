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
        <div class="flex justify-center items-center gap-5">
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
          <VanIcon
            color="#1989fa"
            name="records-o"
            size="20px"
            @click="editExercise(item)"
          />
        </div>

        <div
          v-for="(e, index) in item.approachers"
          :key="index"
          class=" flex  justify-center"
        >
          <VanField
            v-model="e.weigh"
            label="Вес"
            name="weight"
            placeholder="ВЕС"
            :rules="[{ required: true, message: 'weight is required' }]"
            type="number"
          />
          <VanField
            v-model="e.count"
            label="Количество"
            name="count"
            placeholder="Количество"
            :rules="[{ required: true, message: 'count is required' }]"
            type="number"
          />
        </div>
      </div>
    </div>
  </VanActionSheet>
</template>

<script setup lang="ts">
import { PageName } from 'shared/lib/types/app/pages';
import type { IStepsExercise, ITypeExercise } from '../model/DTO';
import { useWorkoutService } from '../model/service/index.service';
import { dictionaryMuscleGroup } from '../model/utils/constants';

const route = useRoute();
const router = useRouter();
const currentList = ref<IStepsExercise[]>([]);
const show = ref(false);
const title = ref('');
const { getCurrentWorkout, deleteWorkoutExercise, updateWorkout } = useWorkoutService();
const list = ref<ITypeExercise | null>(null);
function getALL() {
  getCurrentWorkout(route.params.day as string).then((res: any[] | null) => {
    if (!res)
      return;

    if (!res.length) {
      router.push({
        name: PageName.BASE_SELECT,
      });
    }
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
  await deleteWorkoutExercise(e.id).then((res) => {
    if (res === 204)
      showNotify({ type: 'success', message: 'Запись удалена' });
  }).catch((_err) => {
    showNotify({ type: 'warning', message: _err });
  }).finally(async () => {
    show.value = false;
    await getALL();
  });
}
async function editExercise(e: IStepsExercise) {
  const res = await updateWorkout(e.id, e);
  if (res === 204)
    await getALL();
  show.value = false;
}
</script>
