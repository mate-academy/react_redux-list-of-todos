import { Maybe } from './Maybe';

export interface Todo {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
}

export enum TodosActionTypes {
  TodosFetchStart = 'todos/FETCH_START',
  TodosFetchSuccess = 'todos/FETCH_SUCCESS',
  TodosFetchError = 'todos/FETCH_ERROR',
  TodosFetchFinish = 'todos/FETCH_FINIS',
  TodoSelect = 'todo/SELECT',
  TodoUnselect = 'todo/UNSELECT',
}

export interface TodosFetchStart {
  type: TodosActionTypes.TodosFetchStart,
}

export interface TodosFetchSuccess {
  type: TodosActionTypes.TodosFetchSuccess,
  payload: Todo[],
}

export interface TodosFetchError {
  type: TodosActionTypes.TodosFetchError,
  payload: string,
}

export interface TodosFetchFinish {
  type: TodosActionTypes.TodosFetchFinish,
}

export interface SelectTodo {
  type: TodosActionTypes.TodoSelect,
  payload: Todo,
}

export interface UnselectTodo {
  type: TodosActionTypes.TodoUnselect,
}

export type TodosAction = (
  TodosFetchStart | TodosFetchSuccess | TodosFetchError
  | TodosFetchFinish | SelectTodo | UnselectTodo
);

export interface TodosState {
  todos: Todo[],
  loading: boolean,
  error: Maybe<string>,
  selectedTodo: Maybe<Todo>,
}
