import { supabase } from '../db/workout';

export async function getExerciseAll() {
  try {
    const { data } = await supabase.from('exercise').select();
    return data;
  } catch (error) {
    console.error('Error GET', error);
    throw error;
  }
}
export async function createExercise(body: any) {
  try {
    const { status } = await supabase.from('exercise').insert([body]).select();
    return status;
  } catch (error) {
    console.error('Error POST', error);
    throw error;
  }
}
