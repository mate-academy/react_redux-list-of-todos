export interface Todo {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
}

export enum TodosActionTypes {
  FETCH_TODOS = 'FETCH_TODOS',
  FETCH_TODOS_SUCCESS = 'FETCH_TODOS_SUCCESS',
  FETCH_TODOS_ERROR = 'FETCH_TODOS_ERROR',
  SET_TODO = 'SET_TODO',

}

export interface TodosState {
  todos: Todo[],
  loading: boolean,
  error: null | string,
  todo: null | Todo,
}

interface FetchTodosAction {
  type: TodosActionTypes.FETCH_TODOS,

}
interface FetchTodosSuccessAction {
  type: TodosActionTypes.FETCH_TODOS_SUCCESS,
  payload: Todo[],

}
interface FetchTodosErrorAction {
  type: TodosActionTypes.FETCH_TODOS_ERROR,
  payload: string,

}

interface SetTodo {
  type: TodosActionTypes.SET_TODO,
  payload: Todo,

}

export type TodosAction =
  FetchTodosAction
  | FetchTodosErrorAction
  | FetchTodosSuccessAction
  | SetTodo;
