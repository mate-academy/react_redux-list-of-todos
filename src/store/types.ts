import { Action as BaseAction } from 'redux';

export interface State {
  todos: Todo[],
  selectedUserId: number,
  user: User | null,
}

export interface Action<T, P> extends BaseAction<T> {
  payload: P,
}

export enum ActionsType {
  AddTodos = 'AddTodos',
  AddUser = 'AddUser',
  SetSelectedUserId = 'SetSelectedUserId',
  DeleteTodo = 'DeleteTodo',
}

export type AddTodosAction = Action<ActionsType.AddTodos, Todo[]>;
export type AddUserAction = Action<ActionsType.AddUser, User>;
export type SetSelectedUserIdAction =
Action<ActionsType.SetSelectedUserId, number>;
export type DeleteTodoAction = Action<ActionsType.DeleteTodo, number>;

export type Actions = (
  AddTodosAction
  | AddUserAction
  | SetSelectedUserIdAction
  | DeleteTodoAction
);
