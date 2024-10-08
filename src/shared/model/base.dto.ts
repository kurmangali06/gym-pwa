import type { MuscleGroup } from 'shared/lib/types/app/pages';

export interface BaseEntity {
  id: number
  name: string
}
export interface IMuscleValue {
  exercise: string
  approaches: number
  type: MuscleGroup
}
export interface IApproacher {
  count: string
  weigh: string
}

export interface IAuth {
  email: string
  password: string
}

export interface IValueText {
  value: MuscleGroup
  text: string
}
