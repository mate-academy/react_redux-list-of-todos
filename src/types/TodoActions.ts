import { Todo } from './Todo';

export type SetAction = {
  type: 'todos/SET';
  payload: Todo[];
};

export type Actions = SetAction;
