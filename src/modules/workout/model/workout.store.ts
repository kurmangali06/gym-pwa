import { defineStore } from 'pinia';
import type { MuscleGroup } from 'shared/lib/types/app/pages';

export const useWorkoutStore = defineStore('workout', () => {
  const workoutList = ref<MuscleGroup[]>([]);

  const getWorkoutList = computed(() => workoutList.value);

  function setWorkoutList(val: MuscleGroup[]) {
    workoutList.value = val;
  }
  return {
    getWorkoutList,
    setWorkoutList,
  };
});
