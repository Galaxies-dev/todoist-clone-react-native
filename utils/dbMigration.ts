import { SQLiteDatabase } from 'expo-sqlite';

export const migrateDbIfNeeded = async (db: SQLiteDatabase) => {
  console.log(db.databasePath);

  const DATABASE_VERSION = 1;
  const result = await db.getFirstAsync<{ user_version: number }>('PRAGMA user_version');

  let currentDbVersion = result?.user_version || 0;

  if (currentDbVersion >= DATABASE_VERSION) {
    return;
  }
  if (currentDbVersion === 0) {
    await db.execAsync(`
  PRAGMA journal_mode = 'wal';
  DROP TABLE IF EXISTS todos;
  DROP TABLE IF EXISTS projects;

  CREATE TABLE todos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    description TEXT,
    priority INTEGER NOT NULL,
    due_date INTEGER,
    date_added INTEGER NOT NULL,
    completed INTEGER NOT NULL,
    date_completed INTEGER,
    project_id INTEGER NOT NULL,
    FOREIGN KEY (project_id) REFERENCES projects(id)
  );

  CREATE TABLE projects ( 
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    color TEXT NOT NULL
  );
  `);

    await addDummyData(db);
    currentDbVersion = 1;
  }
  // if (currentDbVersion === 1) {
  //   Add more migrations
  // }
  await db.execAsync(`PRAGMA user_version = ${DATABASE_VERSION}`);
};

const addDummyData = async (db: SQLiteDatabase) => {
  await db.execAsync(`
  INSERT INTO projects (name, color) VALUES ('Inbox', '#000000');
  INSERT INTO todos (name, description, priority, due_date, date_added, completed, date_completed, project_id) VALUES ('Check out Galaxies.dev for epic React Native courses', 'And learn how to build your own apps', 1, 1714761600, 1714761600, 0, 0, 1);
  `);
};
