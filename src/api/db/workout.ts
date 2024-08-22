import Dexie from 'dexie';
import { createClient } from '@supabase/supabase-js';

const db = new Dexie('workoutTable') as Dexie & {
  workoutTable: Dexie.Table<string, string>
  currentWorkoutTable: Dexie.Table<string, any>
};

db.version(1).stores({
  workoutTable: 'type, exercise, approaches',
  currentWorkoutTable: 'date, type',
});

export default db;

export const supabase = createClient(import.meta.env.VITE_API_KEY, import.meta.env.VITE_AUTH_DOMAIN);
