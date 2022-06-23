import { Todo } from '../../../types/Todo';

export enum ActionTypes {
  SET_TODOS = 'SET_TODOS',
  SELECT_USER = 'SELECT_USER',
  DELETE_TODO = 'DELETE_TODO',
}

export interface SetTodosAction {
  type: ActionTypes.SET_TODOS;
  payload: Todo[];
}

export interface SetCurrentUserAction {
  type: ActionTypes.SELECT_USER;
  payload: number | null;
}

export interface DeleteTodoAction {
  type: ActionTypes.DELETE_TODO;
  payload: number;
}

export type AuthAction =
  SetTodosAction |
  SetCurrentUserAction |
  DeleteTodoAction;
