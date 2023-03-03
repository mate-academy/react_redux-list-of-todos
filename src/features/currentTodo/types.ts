import { Todo } from '../../types/Todo';

export enum TodoActions {
  SET_ITEM = 'currentTodo/SET',
  REMOVE_ITEM = 'currentTodo/REMOVE',
}

export type RemoveTodoAction = {
  type: TodoActions.REMOVE_ITEM;
};

export type SetTodoAction = {
  type: TodoActions.SET_ITEM;
  payload: Todo;
};
