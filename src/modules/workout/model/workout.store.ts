import { defineStore } from 'pinia';
import type { IMuscleValue } from 'shared/model/base.dto';

export const useWorkoutStore = defineStore('workout', () => {
  const workoutList = ref<IMuscleValue[]>([]);

  const getWorkoutList = computed(() => workoutList.value);

  function setWorkoutList(val: IMuscleValue[]) {
    workoutList.value = val;
  }
  return {
    getWorkoutList,
    setWorkoutList,
  };
});
