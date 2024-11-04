import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

export const todos = sqliteTable('todos', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  description: text('description'),
  priority: integer('priority').notNull(),
  due_date: integer('due_date'),
  date_added: integer('date_added').notNull(),
  completed: integer('completed').notNull(),
  date_completed: integer('date_completed'),
  project_id: integer('project_id')
    .notNull()
    .references(() => projects.id),
});

export const projects = sqliteTable('projects', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  color: text('color').notNull(),
});
