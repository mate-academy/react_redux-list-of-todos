import { Action as BaseAction } from 'redux';

export interface RootState {
  todos: Todo[];
  selectedUserId: number;
  allUsers: User[];
  loading: boolean;
  message: string;
}

export interface Action<T, P> extends BaseAction<T> {
  payload: P,
}

export enum ActionTypes {
  AddTodos = 'addTodos',
  SelectedUserId = 'selectedTodoId',
  AddAllUsers = 'addAllUsers',
  StartLoading = 'startLoading',
  FinishLoading = 'finishLoading',
}

export type AddTodosAction = Action<ActionTypes.AddTodos, Todo[]>;
export type AddAllUsersAction = Action<ActionTypes.AddAllUsers, User[]>;
export type SelectedUserIdAction = Action<ActionTypes.SelectedUserId, number>;

export type Actions = AddTodosAction | AddAllUsersAction | SelectedUserIdAction;
