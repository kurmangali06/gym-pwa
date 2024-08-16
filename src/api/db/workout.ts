import Dexie from 'dexie';

const db = new Dexie('workoutTable') as Dexie & {
  workoutTable: Dexie.Table<string, string>
};

db.version(1).stores({
  workoutTable: 'type, exercise, approaches',
});
export default db;
