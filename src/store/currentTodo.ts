/* eslint-disable max-len */
import { Todo } from '../types/Todo';

type SetTodoAction = {
  type: 'SET_TODO',
  todo: Todo,
};

type DeleteTodoAction = {
  type: 'DELETE_TODO',
};

export type Action = SetTodoAction | DeleteTodoAction;

export const actions = {
  setTodo: (todo: Todo): SetTodoAction => ({
    type: 'SET_TODO',
    todo,
  }),

  deleteTodo: (): DeleteTodoAction => ({
    type: 'DELETE_TODO',
  }),
};

const defaultState = null;

export const currentTodoReducer = (state = defaultState, action: Action): Todo | null => {
  switch (action.type) {
    case 'SET_TODO':
      return action.todo;
    case 'DELETE_TODO':
      return null;
    default:
      return state;
  }
};
