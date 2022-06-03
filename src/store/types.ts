/// <reference types="react-scripts" />
import { Action as BaseAction } from 'redux';

export interface Todo {
  id: number,
  userId: number,
  title: string,
  completed: boolean,
}

export interface User {
  id: number,
  name: string,
  email: string,
  phone: string,
}

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
