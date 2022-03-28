export interface TodosState {
  todos: Todo[];
  loading: boolean;
  error: null | string;
  selectedUserId: null | number;
  statusTodos: string;
}

export enum TodosActionTypes {
  FETCH_TODOS = 'FETCH_TODOS',
  FETCH_TODOS_SUCCESS = 'FETCH_TODOS_SUCCESS',
  FETCH_TODOS_ERROR = 'FETCH_TODOS_ERROR',
  SELECT_USER = 'SELECT_USER',
  DESELECT_USER = 'DESELECT_USER',
  SET_STATUS_TODOS = 'SET_STATUS_TODOS',
  TOGGLE_STATUS_TODO = 'TOGGLE_STATUS_TODO',
  TOGGLE_STATUS_TODO_SUCCESS = 'TOGGLE_STATUS_TODO_SUCCESS',
  TOGGLE_STATUS_TODO_ERROR = 'TOGGLE_STATUS_TODO_ERROR',
}

interface FetchTodosAction {
  type: TodosActionTypes.FETCH_TODOS;
}

interface FetchTodosSuccessAction {
  type: TodosActionTypes.FETCH_TODOS_SUCCESS;
  payload: Todo[];
}

interface FetchTodosErrorAction {
  type: TodosActionTypes.FETCH_TODOS_ERROR;
  payload: string;
}

interface SelectUserAction {
  type: TodosActionTypes.SELECT_USER;
  payload: number;
}

interface DeselectUserAction {
  type: TodosActionTypes.DESELECT_USER;
}

interface SetStatusTodosAction {
  type: TodosActionTypes.SET_STATUS_TODOS;
  payload: string;
}

interface ToggleStatusTodoAction {
  type: TodosActionTypes.TOGGLE_STATUS_TODO;
}

interface ToggleStatusTodoSuccessAction {
  type: TodosActionTypes.TOGGLE_STATUS_TODO_SUCCESS;
  payload: Todo;
}

interface ToggleStatusTodoErrorAction {
  type: TodosActionTypes.TOGGLE_STATUS_TODO_ERROR;
  payload: string;
}

export type TodosAction =
  FetchTodosAction
  | FetchTodosSuccessAction
  | FetchTodosErrorAction
  | SelectUserAction
  | DeselectUserAction
  | SetStatusTodosAction
  | ToggleStatusTodoAction
  | ToggleStatusTodoSuccessAction
  | ToggleStatusTodoErrorAction;
