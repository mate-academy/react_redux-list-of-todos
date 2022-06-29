// eslint-disable-next-line import/no-cycle
import { TodosStatus } from '.';
import { Todo, User } from '../react-app-env';

export interface SetTodosAction {
  type: ActionType.SET_TODOS,
  payload: Todo[],
}

export interface AddTodosAction {
  type: ActionType.ADD_TODO,
  payload: Todo,
}

export interface SetUserAction {
  type: ActionType.SET_USER,
  payload: User | null,
}

export interface SetStatusAction {
  type: ActionType.SET_STATUS,
  payload: TodosStatus,
}

export interface SetFilterAction {
  type: ActionType.SET_FILTER,
  payload: string,
}

export type Action = SetTodosAction
| AddTodosAction
| SetUserAction
| SetStatusAction
| SetFilterAction;

export enum ActionType {
  SET_TODOS = 'SET_TODOS',
  ADD_TODO = 'ADD_TODO',
  SET_USER = 'SET_USER',
  SET_STATUS = 'SET_STATUS',
  SET_FILTER = 'SET_FILTER',
}

export const setTodosAction = (payload: Todo[]): Action => ({
  type: ActionType.SET_TODOS,
  payload,
});

export const addTodoAction = (payload: Todo): Action => ({
  type: ActionType.ADD_TODO,
  payload,
});

export const setUserAction = (payload: User | null): Action => ({
  type: ActionType.SET_USER,
  payload,
});

export const setStatusAction = (payload: TodosStatus) : Action => ({
  type: ActionType.SET_STATUS,
  payload,
});

export const setFilterAction = (payload: string) : Action => ({
  type: ActionType.SET_FILTER,
  payload,
});
