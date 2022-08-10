import { Todo } from '../Todo';

export type SetSelectedTodoAction = {
  type: 'todo/set',
  payload: Todo,
};

export type ClearSelectedTodoAction = {
  type: 'todo/clear',
};

export type SelectedTodoAction = (
  SetSelectedTodoAction
  | ClearSelectedTodoAction
);
