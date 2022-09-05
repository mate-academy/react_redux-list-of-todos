export interface Todo {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
}

export enum TodoTypes {
  FETCH_TODOS = 'FETCH_TODOS',
  FETCH_TODOS_SUCCESS = 'FETCH_TODOS_SUCCESS',
  FETCH_TODOS_ERROR = 'FETCH_TODOS_ERROR',
}

type FetchTodoAction = {
  type: TodoTypes.FETCH_TODOS,
};

export type TodoSuccessAction = {
  type: TodoTypes.FETCH_TODOS_SUCCESS,
  payload: Todo[],
};

type TodoErrorAction = {
  type: TodoTypes.FETCH_TODOS_ERROR,
  payload: string,
};

export type TodoAction = FetchTodoAction | TodoSuccessAction | TodoErrorAction;
