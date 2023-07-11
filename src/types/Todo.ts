export interface Todo {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
}

export type FetchAction = {
  type: 'todos/FETCH_TODOS';
  payload: Todo[];
};

export type Actions = FetchAction;
