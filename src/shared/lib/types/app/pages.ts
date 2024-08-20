export enum PageName {
  BASE_LAYOUT = 'Default',
  BASE_HOME = 'Home',
  BASE_LIST = 'List',
  BASE_WORKOUT = 'Workout',
  BASE_SELECT = 'Select',
  BASE_EXERCISE = 'Exercise',
  BASE_CURRENT_WORKOUT = 'CurrentWorkout',
}
export const dictionaryPage = {
  [PageName.BASE_HOME]: 'Главная',
  [PageName.BASE_LIST]: 'Список тренировок',
  [PageName.BASE_SELECT]: 'Список Сплитов',
  [PageName.BASE_EXERCISE]: 'Упражнения',
  [PageName.BASE_WORKOUT]: 'Список Упражнения',
  [PageName.BASE_LAYOUT]: 'Default',
  [PageName.BASE_CURRENT_WORKOUT]: 'Тренировка',

};
export enum DateType {
  Monday = 1,
  Tuesday = 2,
  Wednesday = 3,
  Thursday = 4,
  Friday = 5,
  Saturday = 6,
  Sunday = 7,
}
export enum MuscleGroup {
  Shoulders = 'shoulders',
  Biceps = 'biceps',
  Triceps = 'triceps',
  Chest = 'chest',
  Press = 'press',
  Back = 'back',
  Logs = 'logs',
}

export enum MixGroup {
  ShouldersLogs = 'ShouldersLogs',
  BicepsBack = 'BicepsBack',
  TricepsChest = 'TricepsChest',
}
