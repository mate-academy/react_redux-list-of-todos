import { Todo } from './Todo';
// we use string literal as a type to avoid mistype in future
export type RemoveTodoAction = { type: 'currentTodo/REMOVE' };

// payload is a typical name for an action data
export type SetTodoAction = {
  type: 'currentTodo/SET';
  payload: Todo;
};

export type State = Todo | null;
export type Action = SetTodoAction | RemoveTodoAction;
