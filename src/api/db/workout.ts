import Dexie from 'dexie';

const db = new Dexie('workoutTable') as Dexie & {
  workoutTable: Dexie.Table<string, string>
  currentWorkoutTable: Dexie.Table<string, any>
};

db.version(1).stores({
  workoutTable: 'type, exercise, approaches',
  currentWorkoutTable: 'date, type',
});

export default db;
