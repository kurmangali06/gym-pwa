import { DateType, MuscleGroup } from 'shared/lib/types/app/pages';

export const dayList = ref([
  {
    value: DateType.Monday,
    label: 'Понедельник',
  },
  {
    value: DateType.Tuesday,
    label: 'Вторник',
  },
  {
    value: DateType.Wednesday,
    label: 'Среда',
  },
  {
    value: DateType.Thursday,
    label: 'Четверг',
  },
  {
    value: DateType.Friday,
    label: 'Пятница',
  },
  {
    value: DateType.Saturday,
    label: 'Суббота',
  },
  {
    value: DateType.Sunday,
    label: 'Воскресенье',
  },
]);

export const MuscleList = ref([
  {
    value: MuscleGroup.Shoulders,
    label: 'Плечи',
  },
  {
    value: MuscleGroup.Biceps,
    label: 'Бицепс',
  },
  {
    value: MuscleGroup.Triceps,
    label: 'Трицепс',
  },
  {
    value: MuscleGroup.Chest,
    label: 'Грудь',
  },
  {
    value: MuscleGroup.Press,
    label: 'Пресс',
  },
  {
    value: MuscleGroup.Back,
    label: 'Спина',
  },
  {
    value: MuscleGroup.Logs,
    label: 'Ноги',
  },
]);

export const columns = [
  {
    title: 'Упражнение',
    dataIndex: 'exercise',
    width: '40%',
  },
  {
    title: 'Подходы',
    dataIndex: 'approaches',
    width: '40%',
  },
  {
    title: 'Действия',
    dataIndex: 'operation',
    width: '20%',
  },

];
