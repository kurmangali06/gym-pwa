import { supabase } from '../db/workout';

export async function getExerciseAll(list: string[]) {
  try {
    const { data, error } = await supabase
      .from('exercise')
      .select('*') // Выберите нужные поля, например 'date', 'name', и т.д.
      .in('type', list); // Используем метод .in для фильтрации по списку значений

    if (error)
      throw error; // Бросаем ошибку, если она возникла

    return data;
  } catch (error) {
    console.error('Error GET', error);
    throw error; // Бросаем ошибку для обработки в других частях кода
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

export async function deleteExercise(id: number) {
  try {
    const { data, error } = await supabase
      .from('exercise')
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

export async function updateExercise(id: number, body: any) {
  try { // Подготовка данных
    const { error, status } = await supabase
      .from('exercise') // Таблица pwagym
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
