export interface Todo {
  id: number;
  name: string;
  description?: string | null;
  priority: number;
  due_date?: number | null;
  date_added: number;
  completed: number;
  date_completed?: number | null;
  project_id: number;
  project_name?: string;
  project_color?: string;
}

export interface Project {
  id: number;
  name: string;
  color: string;
}
