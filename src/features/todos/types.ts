import { Todo } from '../../types/Todo';

export enum TodosActions {
  ADD = 'todos/ADD',
  LOADED = 'todos/LOADED',
  ERROR = 'todos/ERROR',
}

export type AddAction = {
  type: TodosActions.ADD;
  payload: Todo[];
};

export type LoadedAction = {
  type: TodosActions.LOADED;
  payload: boolean;
};

export type ErrorAction = {
  type: TodosActions.ERROR;
  payload: boolean;
};

export type Action = AddAction | LoadedAction | ErrorAction;

export type State = {
  todos: Todo[];
  isLoaded: boolean;
  isError: boolean;
};
