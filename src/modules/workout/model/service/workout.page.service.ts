import dayjs from 'dayjs';
import type { DateType, MuscleGroup } from 'shared/lib/types/app/pages';
import { FORMAT_DATE } from 'shared/lib/utils/constants';
import { MuscleList, dayList } from '../utils/constants';
import type { ILabelValue } from '../DTO';
import { useWorkoutService } from './index.service';

export function useWorkoutPageService() {
  const route = useRoute();
  const selectDay = ref(dayjs(route.params.date as string).day());
  const muscleSelect = ref<MuscleGroup[]>([]);
  const currentDay = computed(() => dayjs().day());
  const currentDate = computed(() => dayjs(route.params.date as string).format(FORMAT_DATE));
  const selectList = computed(() => {
    const res: ILabelValue[] = [];
    muscleSelect.value.forEach((e) => {
      const findElement = MuscleList.value.find(t => t.value === e);
      if (findElement)
        res.push(findElement);
    });
    return res;
  });
  function isBeforeDay(day: DateType) {
    return currentDay.value < day;
  }
  const { getWorkout } = useWorkoutService();
  watch(() => muscleSelect.value, (val) => {
    if (val.length)
      getWorkout();
  });

  return {
    selectDay,
    muscleSelect,
    currentDate,
    MuscleList,
    dayList,
    selectList,
    isBeforeDay,
  };
}
