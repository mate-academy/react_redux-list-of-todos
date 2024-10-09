export interface Todo {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
}

export interface TodosState {
  todos: Todo[];
  loading: boolean;
  error: string | null;
}
