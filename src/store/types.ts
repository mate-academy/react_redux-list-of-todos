import { Action as BaseAction } from 'redux';

export interface State {
  removeTodoById: number;
  todos: Todo[],
  selectUserById: number;
  user: User | null;
}

export interface Action<T, P> extends BaseAction<T> {
  payload: P,
}

export enum ActionType {
  AddTodos = 'AddTodos',
  SelectUserById = 'SelectUserById',
  LoadUserById = 'LoadUserById',
  RemoveTodoById = ' RemoveTodoById',
}

export type AddTodosAction = Action<ActionType.AddTodos, Todo[]>;
export type SelectUserIdAction = Action<ActionType.SelectUserById, number>;
export type LoadUserByIdAction = Action<ActionType.LoadUserById, User>;
export type RemoveTodoById = Action<ActionType.RemoveTodoById, number>;

export type Actions = AddTodosAction
| SelectUserIdAction
| LoadUserByIdAction
| RemoveTodoById;
