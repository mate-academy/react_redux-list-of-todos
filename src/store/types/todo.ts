export interface TodoState {
  todos: Todo[];
}

export enum TodoActionTypes {
  LOAD_TODOS = 'LOAD_TODOS',
  UPDATE_TODOS = 'UPDATE_TODOS',
  DELETE_TODO = 'DELETE_TODO',
}

export interface LoadTodosAction {
  type: TodoActionTypes.LOAD_TODOS;
  payload: Todo[];
}

export interface UpdateTodosAction {
  type: TodoActionTypes.UPDATE_TODOS,
  payload: Todo[];
}

export interface DeleteTodoAction {
  type: TodoActionTypes.DELETE_TODO;
  payload: number;
}

export type TodoAction =
  LoadTodosAction
  | UpdateTodosAction
  | DeleteTodoAction;
