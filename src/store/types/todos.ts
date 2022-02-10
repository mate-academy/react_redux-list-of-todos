export interface Todo {
  id: number;
  userId: number;
  completed: boolean;
  title: string;
}

export interface TodoState {
  todos: Todo[];
  loading: boolean;
  error: null | string;
  selectedUserId: number | null;
  searchQuery: string;
  todoStatus: string;
}

export enum TodosActionTypes {
  FETCH_TODOS = 'FETCH_TODOS',
  FETCH_TODOS_SUCCESS = 'FETCH_TODOS_SUCCESS',
  FETCH_TODOS_ERROR = 'FETCH_TODOS_ERROR',
  SELECT_USER_ID = 'SELECT_USER_ID',
  SET_SEARCH_QUERY = 'SET_SEARCH_QUERY',
  SET_TODOS_STATUS = 'SET_TODOS_STATUS',
}

export interface FetchTodosAction {
  type: TodosActionTypes.FETCH_TODOS
}

export interface FetchTodosSuccessAction {
  type: TodosActionTypes.FETCH_TODOS_SUCCESS;
  payload: Todo[];
}

export interface FetchTodosErrorAction {
  type: TodosActionTypes.FETCH_TODOS_ERROR;
  payload: string;
}

export interface SelectUserIdAction {
  type: TodosActionTypes.SELECT_USER_ID;
  payload: number | null;
}

export interface SetSearchQueryAction {
  type: TodosActionTypes.SET_SEARCH_QUERY;
  payload: string;
}

export interface SetTodosStatusAction {
  type: TodosActionTypes.SET_TODOS_STATUS;
  payload: string;
}

export type TodosAction =
  FetchTodosAction
  | FetchTodosSuccessAction
  | FetchTodosErrorAction
  | SelectUserIdAction
  | SetSearchQueryAction
  | SetTodosStatusAction;
