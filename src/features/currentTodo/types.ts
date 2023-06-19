import { Todo } from '../../types/Todo';

export enum CurrentTodoActions {
  SET = 'currentTodo/SET',
  REMOVE = 'currentTodo/REMOVE',
}

export type RemoveTodoAction = { type: CurrentTodoActions.REMOVE; };

export type SetTodoAction = {
  type: CurrentTodoActions.SET;
  payload: Todo;
};

export type State = Todo | null;
export type Action = SetTodoAction | RemoveTodoAction;
