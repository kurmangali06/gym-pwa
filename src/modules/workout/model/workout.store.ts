import { defineStore } from 'pinia';
import type { MuscleGroup } from 'shared/lib/types/app/pages';
import type { Exercise } from './utils/constants';

export const useWorkoutStore = defineStore('workout', () => {
  const workoutList = ref<MuscleGroup[]>([]);
  const MuscleList = ref<Exercise[]>([]);
  const getWorkoutList = computed(() => workoutList.value);
  const getMuscleList = computed(() => MuscleList.value);
  function setWorkoutList(val: MuscleGroup[]) {
    workoutList.value = val;
  }
  function setMuscleList(val: Exercise[]) {
    MuscleList.value = val;
  }
  return {
    MuscleList,
    getWorkoutList,
    setWorkoutList,
    setMuscleList,
    getMuscleList,
  };
});
