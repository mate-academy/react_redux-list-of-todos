import { Todo } from '../../types/Todo';

export enum TodosActions {
  SET_TODOS = 'todos/SET',
}

export type SetTodosAction = {
  type: TodosActions.SET_TODOS;
  payload: Todo[];
};
