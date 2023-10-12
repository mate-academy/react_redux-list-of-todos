import { CurrenTodoActionTypes, TodoActionTypes } from '../enums';

export interface Todo {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
}

export type TodoPayload = {
  todos: Todo[],
  isLoading: boolean,
  isError: boolean,
};

export type TodosAction = {
  type: TodoActionTypes;
  payload: TodoPayload;
};

export type CurrenTodoPayload = {
  todo: Todo | null
};

export type CurrenTodoAction = {
  type: CurrenTodoActionTypes;
  payload: Todo;
};
