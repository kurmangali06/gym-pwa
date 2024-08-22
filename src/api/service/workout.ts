import Dexie from 'dexie';
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

export async function createExercise(body: any) {
  try {
    const serializableData = prepareDataForStorage<any>(body);
    const { data } = await supabase.from('pwagym').upsert(serializableData);
    return data;
  } catch (error) {
    console.error('Error adding object to the store', error);
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

export async function getCurrentWorkout(startDate: string, endDate?: string) {
  try {
    return await db.currentWorkoutTable.where('date')
      .between(startDate, endDate || Dexie.maxKey, true, true)
      .toArray();
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
    const { data } = await supabase.from('pwagym').insert([body]);
    return data;
  } catch (error) {
    console.error('Error POST', error);
    throw error;
  }
}
export async function updateCurrentWorkout(date: Date, body: any) {
  try {
    const serializableData = prepareDataForStorage<any>(body);
    const addedItemId = await db.currentWorkoutTable.update(date, serializableData);
    return addedItemId;
  } catch (error) {
    console.error('Error POST', error);
    throw error;
  }
}
export async function deleteCurrentWorkout(data: Date) {
  try {
    await db.currentWorkoutTable.delete(data);
    return true;
  } catch (error) {
    console.error('Error deleting object from the store', error);
    throw error;
  }
}
