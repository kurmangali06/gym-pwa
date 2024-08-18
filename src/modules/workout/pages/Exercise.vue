<template>
  <template v-if="!isLoading">
    <VanTag
      class="my-3 ml-3"
      size="large"
      type="success"
    >
      {{ getCurrentExercise?.label }}
    </VanTag>
    <VanSteps
      :active="active"
    >
      <VanStep v-for="step in getCurrentExercise?.sets" :key="step">
        подход {{ step }}
      </VanStep>
    </VanSteps>
    <div class="flex gap-2 my-2">
      <VanButton
        :disabled="active === 0"
        size="normal"
        @click="active = active - 1"
      >
        Пред поход
      </VanButton>
      <VanButton
        v-if="getCurrentExercise?.sets"
        :disabled="active === getCurrentExercise?.sets - 1"
        size="normal"
        @click="active = active + 1"
      >
        Cлед подход
      </VanButton>
      <VanButton
        v-if="getCurrentExercise?.sets === active + 1"
        size="normal"
        type="primary"
        @click="saveExercise"
      >
        Сохранить
      </VanButton>
    </div>
    <VanCellGroup v-if="exercise[`${active}approacher`]" inset>
      <VanField
        v-model="exercise[`${active}approacher`].weigh"
        label="Вес"
        name="weight"
        placeholder="ВЕС"
        :rules="[{ required: true, message: 'weight is required' }]"
        type="number"
      />
      <VanField
        v-model="exercise[`${active}approacher`].count"
        label="Количество"
        name="count"
        placeholder="Количество"
        :rules="[{ required: true, message: 'count is required' }]"
        type="number"
      />
    </VanCellGroup>
  </template>
</template>

<script setup lang="ts">
import { type MuscleGroup, PageName } from 'shared/lib/types/app/pages';
import type { IApproacher } from 'shared/model/base.dto';
import { useGlobalLoading } from 'shared/lib/composables/useLoading';
import { exercisesByMuscleGroup } from '../model/utils/constants';
import { useWorkoutService } from '../model/service/index.service';
import { useWorkoutStore } from '../model/workout.store';

const active = ref(0);
const workoutStore = useWorkoutStore();
const route = useRoute();
const router = useRouter();
const getCurrentExercise = computed(() => exercisesByMuscleGroup[route.params.type as MuscleGroup].find(e => e.value === route.params.name as string));
const exercise = ref<Record<string, IApproacher>>({});
const { isLoading, startLoading, stopLoading } = useGlobalLoading();
const { createCurrentWorkout } = useWorkoutService();

async function saveExercise() {
  const formData = {
    ...exercise.value,
    type: route.params.type,
    date: new Date(),
    name: getCurrentExercise.value?.value,
    label: getCurrentExercise.value?.label,
    description: getCurrentExercise.value?.description,
  };

  const res = await createCurrentWorkout(formData);

  if (res) {
    showNotify({ type: 'success', message: 'Запись добавлена', duration: 20 });
    router.push({
      name: PageName.BASE_WORKOUT,
      params: {
        types: JSON.stringify(workoutStore.getWorkoutList),
      },
    });
  } else {
    showNotify({ type: 'danger', message: 'Что то пошло не так' });
  }
}
onMounted(() => {
  startLoading();
  if (getCurrentExercise.value) {
    for (let i = 0; i < getCurrentExercise.value?.sets; i++) {
      exercise.value[`${i}approacher`] = {
        count: 0,
        weigh: 0,
      };
    }
  }
  stopLoading();
});
</script>
