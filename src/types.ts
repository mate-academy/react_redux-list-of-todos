/// <reference types="react-scripts" />
import { Action as BaseAction } from 'redux';

export type Todo = {
  id: number,
  createdAt: string,
  userId: number,
  title: string,
  completed: boolean,
};

export type User = {
  id: number,
  createdAt: string,
  updatedAt: string,
  name: string,
  username: string,
  email: string,
  phone: string,
  website: string
};

export type State = {
  todos: Todo[],
  selectedUserId: number,
};

interface Action<T, P> extends BaseAction<T> {
  payload: P
}

export enum ActionsTypes {
  AddTodos = 'addTodos',
  AddTodo = 'addTodo',
  SetSelectedUserId = 'selectedUserId',
  FilterTodos = 'filterTodos',
  SearchTitleTodos = 'searchTitleTodos',
}

export type AddTodosAction = Action<ActionsTypes.AddTodos, Todo[]>;
export type AddTodoAction = BaseAction<ActionsTypes.AddTodo>;
export type SetSelectedUserIdAction
  = Action<ActionsTypes.SetSelectedUserId, number>;

export type Actions = AddTodosAction
| AddTodoAction
| SetSelectedUserIdAction;
