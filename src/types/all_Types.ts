export type Status = 'all' | 'active' | 'completed';

export interface Todo {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
}

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
}

export interface TodosState {
  todos: Todo[];
  status: Status;
  value: string;
  selectedTodoId: number | null;
}
