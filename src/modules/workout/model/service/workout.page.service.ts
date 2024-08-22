import type { MuscleGroup } from 'shared/lib/types/app/pages';
import { PageName } from 'shared/lib/types/app/pages';
import { MuscleList, exercisesByMuscleGroup } from '../utils/constants';
import { useWorkoutStore } from '../workout.store';
import { useExerciseService } from './exercise.service';

export function useWorkoutPageService() {
  const route = useRoute();
  const router = useRouter();
  const list = computed(() => JSON.parse(route.params.types as string));
  const activeName = ref(0);
  const listTag = computed(() => MuscleList.value.filter(e => (list.value).includes(e.value)));
  const workoutStore = useWorkoutStore();
  function watchVideo(url: string) {
    window.open(url, '_blank');
  }
  const { getExerciseAll, createExercise } = useExerciseService();
  function startExercise(val: string, type: MuscleGroup) {
    workoutStore.setWorkoutList(list.value);
    router.push({
      name: PageName.BASE_EXERCISE,
      params: {
        type,
        name: val,
      },
    });
  }
  return {
    listTag,
    list,
    activeName,
    exercisesByMuscleGroup,
    watchVideo,
    startExercise,
    getExerciseAll,
    createExercise,
  };
}
