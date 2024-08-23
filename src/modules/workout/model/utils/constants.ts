import { DateType, MixGroup, MuscleGroup } from 'shared/lib/types/app/pages';

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
    text: 'Плечи',
  },
  {
    value: MuscleGroup.Biceps,
    text: 'Бицепс',
  },
  {
    value: MuscleGroup.Triceps,
    text: 'Трицепс',
  },
  {
    value: MuscleGroup.Chest,
    text: 'Грудь',
  },
  {
    value: MuscleGroup.Press,
    text: 'Пресс',
  },
  {
    value: MuscleGroup.Back,
    text: 'Спина',
  },
  {
    value: MuscleGroup.Logs,
    text: 'Ноги',
  },
]);

export const dictionaryMuscleGroup = {
  [MuscleGroup.Shoulders]: 'Плечи',
  [MuscleGroup.Biceps]: 'Бицепс',
  [MuscleGroup.Triceps]: 'Трицепс',
  [MuscleGroup.Chest]: 'Грудь',
  [MuscleGroup.Press]: 'Пресс',
  [MuscleGroup.Back]: 'Спина',
  [MuscleGroup.Logs]: 'Ноги',
};
export const MuscleListVant = ref([
  {
    id: MixGroup.ShouldersLogs,
    text: 'Плечи / Ноги',
    children: [
      {
        id: MuscleGroup.Shoulders,
        text: 'Плечи',
      },
      {
        id: MuscleGroup.Logs,
        text: 'Ноги',
      },
    ],
  },
  {
    id: MixGroup.BicepsBack,
    text: 'Бицепс /Спина',
    children: [
      {
        id: MuscleGroup.Biceps,
        text: 'Бицепс',
      },
      {
        id: MuscleGroup.Back,
        text: 'Спина',
      },
    ],
  },
  {
    id: MixGroup.TricepsChest,
    text: 'Трицепс /Грудь',
    children: [
      {
        id: MuscleGroup.Chest,
        text: 'Грудь',
      },
      {
        id: MuscleGroup.Triceps,
        text: 'Трицепс',
      },
    ],
  },
]);

export const columns = [
  {
    title: 'Упражнение',
    key: 'exercise',
    width: '40%',
  },
  {
    title: 'Подходы',
    key: 'approaches',
    width: '40%',
  },
  {
    title: 'Действия',
    key: 'operation',
    width: '20%',
  },

];

export interface Exercise {
  value: string
  label: string
  sets: number
  description: string
  videoUrl: string
  imageUrl: string
  type: MuscleGroup
  id: number
}
