import { Todo } from '../types/Todo';

type SetCurrentTodoAction = {
  type: 'currentTodo/SET',
  payload: Todo,
};

type ResetCurrentTodoAction = {
  type: 'currentTodo/RESET'
  payload: null,
};

export type CurrentTodoAction = SetCurrentTodoAction | ResetCurrentTodoAction;

export const currentTodoReducer = (
  currentTodo: Todo | null = null,
  action: CurrentTodoAction,
): Todo | null => {
  switch (action.type) {
    case 'currentTodo/SET':
      return action.payload;

    case 'currentTodo/RESET':
      return action.payload;

    default:
      return currentTodo;
  }
};

export const actions = {
  setTodo: (currentTodo: Todo): CurrentTodoAction => ({
    type: 'currentTodo/SET',
    payload: currentTodo,
  }),

  resetTodo: (): CurrentTodoAction => ({
    type: 'currentTodo/RESET',
    payload: null,
  }),
};
