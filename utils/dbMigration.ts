import { SQLiteDatabase } from 'expo-sqlite';

export const migrateDbIfNeeded = async (db: SQLiteDatabase) => {
  console.log(db.databasePath);

  const DATABASE_VERSION = 1;
  const result = await db.getFirstAsync<{ user_version: number }>('PRAGMA user_version');

  let currentDbVersion = result?.user_version || 0;

  // if (currentDbVersion >= DATABASE_VERSION) {
  //   return;
  // }
  // if (currentDbVersion === 0) {
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
  // }
  // if (currentDbVersion === 1) {
  //   Add more migrations
  // }

  await db.execAsync(`PRAGMA user_version = ${DATABASE_VERSION}`);
};

const addDummyData = async (db: SQLiteDatabase) => {
  await db.execAsync(`
  INSERT INTO projects (name, color) VALUES ('Inbox', '#000000');
  INSERT INTO projects (name, color) VALUES ('Work', '#0a009c');
  INSERT INTO todos (name, description, priority, due_date, date_added, completed, date_completed, project_id) VALUES ('Check out Galaxies.dev for epic React Native courses', 'And learn how to build your own apps', 1, 1714761600, 1714761600, 0, 0, 1);
  INSERT INTO todos (name, description, priority, due_date, date_added, completed, date_completed, project_id) VALUES ('Buy groceries for the week', 'Get fresh vegetables, fruits and other essentials', 2, 1714761600, 1714761600, 0, 0, 1);
  INSERT INTO todos (name, description, priority, due_date, date_added, completed, date_completed, project_id) VALUES ('Schedule dentist appointment', 'Call Dr. Smith''s office for annual checkup', 1, 1714761600, 1714761600, 0, 0, 1);
  INSERT INTO todos (name, description, priority, due_date, date_added, completed, date_completed, project_id) VALUES ('Review project proposal', 'Go through the draft and add comments before team meeting', 3, 1714761600, 1714761600, 0, 0, 1);
  INSERT INTO todos (name, description, priority, due_date, date_added, completed, date_completed, project_id) VALUES ('Prepare quarterly report', 'Compile Q1 metrics and create executive summary', 2, 1714934400, 1714761600, 0, 0, 2);
  INSERT INTO todos (name, description, priority, due_date, date_added, completed, date_completed, project_id) VALUES ('Team performance reviews', 'Complete evaluations for direct reports', 3, 1715020800, 1714761600, 0, 0, 2);
  INSERT INTO todos (name, description, priority, due_date, date_added, completed, date_completed, project_id) VALUES ('Client presentation', 'Prepare slides for new product demo', 1, 1715107200, 1714761600, 0, 0, 2);
  INSERT INTO todos (name, description, priority, due_date, date_added, completed, date_completed, project_id) VALUES ('Update project timeline', 'Review milestones and adjust deadlines', 2, 1715193600, 1714761600, 0, 0, 2);
  INSERT INTO todos (name, description, priority, due_date, date_added, completed, date_completed, project_id) VALUES ('Schedule team building', 'Plan Q2 team outing activities', 3, 1715280000, 1714761600, 0, 0, 2);
  INSERT INTO todos (name, description, priority, due_date, date_added, completed, date_completed, project_id) VALUES ('Fix bug in production', 'Investigate and resolve customer reported issue', 1, 1715366400, 1714761600, 0, 0, 2);
  INSERT INTO todos (name, description, priority, due_date, date_added, completed, date_completed, project_id) VALUES ('Code review', 'Review pull requests from junior developers', 2, 1715452800, 1714761600, 0, 0, 2);
  INSERT INTO todos (name, description, priority, due_date, date_added, completed, date_completed, project_id) VALUES ('Plan summer vacation', 'Book flights and accommodation', 2, 1715539200, 1714761600, 0, 0, 1);
  INSERT INTO todos (name, description, priority, due_date, date_added, completed, date_completed, project_id) VALUES ('Car maintenance', 'Schedule annual service check', 3, 1715625600, 1714761600, 0, 0, 1);
  INSERT INTO todos (name, description, priority, due_date, date_added, completed, date_completed, project_id) VALUES ('Pay utility bills', 'Electricity and water bills due', 1, 1715712000, 1714761600, 0, 0, 1);
  `);
};
