import type { IStepsExercise } from 'modules/workout/model/DTO';
import db, { supabase } from '../db/workout';

function prepareDataForStorage<T>(data: T): T {
  return JSON.parse(JSON.stringify(data));
}

export async function getAllWorkout() {
  try {
    const { data } = await supabase.from('pwagym').select();
    return data;
  } catch (error) {
    console.error('Error  GET', error);
    throw error;
  }
}

export async function deleteExercise(id: string) {
  try {
    await db.workoutTable.delete(id);
    return 'sucess';
  } catch (error) {
    console.error('Error deleting object from the store', error);
    throw error;
  }
}

export async function getCurrentWorkout(startDate: string) {
  try {
    const { data } = await supabase.from('pwagym').select('*') // Выберите нужные поля, например 'date', 'name', и т.д.
      .gte('date', startDate); // Даты, начиная с startDate
    return data;
  } catch (error) {
    console.error('Error GET', error);
    throw error;
  }
}
export async function getWorkoutAll() {
  try {
    const { data } = await supabase.from('pwagym').select();
    return data;
  } catch (error) {
    console.error('Error GET', error);
    throw error;
  }
}
export async function createCurrentWorkout(body: IStepsExercise) {
  try {
    const { status } = await supabase.from('pwagym').insert([body]);
    return status;
  } catch (error) {
    console.error('Error POST', error);
    throw error;
  }
}
export async function updateCurrentWorkout(id: number, body: any) {
  try { // Подготовка данных
    const { error, status } = await supabase
      .from('pwagym') // Таблица pwagym
      .update(body) // Обновляем данные
      .eq('id', id); // Фильтрация по id

    if (error)
      throw error;

    return status;
  } catch (error) {
    console.error('Error updating workout', error);
    throw error;
  }
}

export async function deleteCurrentWorkout(id: number) {
  try {
    const { data, error } = await supabase
      .from('pwagym')
      .delete()
      .eq('id', id); // Фильтрация по полю id

    if (error)
      throw error;

    return data;
  } catch (error) {
    console.error('Error deleting object from the store', error);
    throw error;
  }
}
