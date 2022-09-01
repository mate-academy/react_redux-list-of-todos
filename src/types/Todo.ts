import { Maybe } from './Maybe';

export interface Todo {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
}

export enum TodosActionTypes {
  todos_FETCH_START = 'todos_FETCH_START',
  todos_FETCH_SUCCESS = 'todos_FETCH_SUCCESS',
  todos_FETCH_ERROR = 'todos_FETCH_ERRO',
  todos_FETCH_FINISH = 'todos_FETCH_FINISH',
  todo_SELECT = 'todo_SELECT',
  todo_UNSELECT = 'todo_UNSELECT',
}

export interface TodosFetchStart {
  type: TodosActionTypes.todos_FETCH_START,
}

export interface TodosFetchSuccess {
  type: TodosActionTypes.todos_FETCH_SUCCESS,
  payload: Todo[],
}

export interface TodosFetchError {
  type: TodosActionTypes.todos_FETCH_ERROR,
  payload: string,
}

export interface TodosFetchFinish {
  type: TodosActionTypes.todos_FETCH_FINISH,
}

export interface SelectTodo {
  type: TodosActionTypes.todo_SELECT,
  payload: Todo,
}

export interface UnselectTodo {
  type: TodosActionTypes.todo_UNSELECT,
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
