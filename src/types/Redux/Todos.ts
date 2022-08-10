import { Todo } from '../Todo';

export type SetTodosAction = {
  type: 'todos/set',
  payload: Todo[],
};

export type TodosAction = SetTodosAction;
