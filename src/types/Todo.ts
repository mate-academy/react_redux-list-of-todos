export interface Todo {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
}

export interface TodoState {
  todos: Todo[],
  chosenTodo: Todo | null,
  errorMesage: string | null
}
