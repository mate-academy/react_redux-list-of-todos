import { Todo, User } from '../react-app-env';

export enum ActionType {
  SET_TODOS = 'SET_TODOS',
  ADD_TODO = 'ADD_TODO',
  SET_USER = 'SET_USER',
}

interface SetTodos {
  type: ActionType.SET_TODOS,
  payload: Todo[],
}

interface AddTodo {
  type: ActionType.ADD_TODO,
  payload: Todo,
}

interface SetUser {
  type: ActionType.SET_USER,
  payload: User,
}

export type Action = SetTodos | AddTodo | SetUser;

export const setTodosAction = (payload: Todo[]): Action => ({
  type: ActionType.SET_TODOS,
  payload,
});

export const addTodoAction = (payload: Todo): Action => ({
  type: ActionType.ADD_TODO,
  payload,
});

export const setUserAction = (payload: User): Action => ({
  type: ActionType.SET_USER,
  payload,
});
