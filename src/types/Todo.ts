export interface Todo {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
}

export enum TodoTypes {
  START_LOADING = 'START_LOADING',
  FINISH_LOADING = 'FINISH_LOADING',
  FETCH_TODOS_SUCCESS = 'FETCH_TODOS_SUCCESS',
  FETCH_TODOS_ERROR = 'FETCH_TODOS_ERROR',
  SET_TODO = 'SET_TODO',
}

export type TodoSuccessAction = {
  type: TodoTypes.FETCH_TODOS_SUCCESS;
  payload: Todo[];
};

type TodoErrorAction = {
  type: TodoTypes.FETCH_TODOS_ERROR;
  payload: string;
};

export type CurrentTodoAction = {
  type: TodoTypes.SET_TODO;
  payload: number;
};

export type StartLoading = {
  type: TodoTypes.START_LOADING;
};

export type FinishLoading = {
  type: TodoTypes.FINISH_LOADING;
};

export type TodoAction =
  | TodoSuccessAction
  | TodoErrorAction
  | CurrentTodoAction
  | StartLoading
  | FinishLoading;
