export interface Todo {
  id: number;
  name: string;
  description: string;
  priority: number;
  due_date: number;
  date_added: number;
  completed: number;
  date_completed: number;
  project_id: number;
}

export interface Project {
  id: number;
  name: string;
  color: string;
}
