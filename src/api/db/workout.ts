import Dexie from 'dexie';

const db = new Dexie('workoutTable') as Dexie & {
  workoutTable: Dexie.Table<string, string>
  currentWorkout: Dexie.Table<string, Object | string>
};

db.version(1).stores({
  workoutTable: 'type, exercise, approaches',
  currentWorkout: 'date, type',
});

export default db;
