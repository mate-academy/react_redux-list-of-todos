import { Action as BaseAction } from 'redux';

export interface RootState {
  todos: Todo[];
  loading: boolean;
  message: string;
}

export interface Action<T, P> extends BaseAction<T> {
  payload: P,
}

export enum ActionTypes {
  AddTodos = 'addTodos',
  StartLoading = 'startLoading',
  FinishLoading = 'finishLoading',
}

type AddTodosAction = Action<ActionTypes.AddTodos, Todo[]>;

export type Actions = AddTodosAction;
