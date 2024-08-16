import db from '../db/workout';

function prepareDataForStorage<T>(data: T): T {
  return JSON.parse(JSON.stringify(data));
}

export async function getAllWorkout() {
  try {
    return await db.workoutTable.toArray();
  } catch (error) {
    console.error('Error  GET', error);
    throw error;
  }
}

export async function createExercise(body: any) {
  try {
    const serializableData = prepareDataForStorage<any>(body);
    const addedItemId = await db.workoutTable.add(serializableData);
    return addedItemId;
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
