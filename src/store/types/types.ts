import { Todo, User } from '../../react-app-env';

export enum ActionType {
  SET_TODOS = 'SET_TODOS',
  ADD_TODO = 'ADD_TODO',
  SET_USER = 'SET_USER',
}

export interface SetTodosAction {
  type: ActionType.SET_TODOS;
  payload: Todo[];
}

export interface AddTodoAction {
  type: ActionType.ADD_TODO;
  payload: Todo;
}

export interface SetUserAction {
  type: ActionType.SET_USER;
  payload: User | null;
}

export type Action = SetTodosAction | AddTodoAction | SetUserAction;
