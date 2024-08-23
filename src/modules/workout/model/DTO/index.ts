import type { MuscleGroup } from 'shared/lib/types/app/pages';
import type { Exercise } from '../utils/constants';

export interface ILabelValue {
  value: string
  label: string
}

export interface IApproacher {
  count: number // Количество подходов
  weigh: number // Вес для подходов
}
export interface IStepsExercise {
  type: MuscleGroup // Группа мышц, связанная с упражнением
  date: string // Дата выполнения упражнения
  name: string // Название упражнения
  label: string // Ярлык или метка упражнения
  description: string // Описание упражнения
  id: number
  approachers: IApproacher[]
}

export type ITypeExercise = {
  [key in MuscleGroup]: IStepsExercise[]
};

export type IExerciseList = {
  [key in MuscleGroup]: Exercise[]
};
