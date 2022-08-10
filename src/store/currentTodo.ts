import { Todo } from '../types/Todo';

type SetCurrentTodoAction = {
  type: 'currentTodo/select',
  payload: Todo,
};

type ResetCurrentTodoAction = {
  type: 'currentTodo/reset'
  payload: null,
};

export type CurrentTodoAction = SetCurrentTodoAction | ResetCurrentTodoAction;

export const currentTodoReducer = (
  currentTodo: Todo | null = null,
  action: CurrentTodoAction,
): Todo | null => {
  switch (action.type) {
    case 'currentTodo/select':
      return action.payload;

    case 'currentTodo/reset':
      return action.payload;

    default:
      return currentTodo;
  }
};

export const actions = {
  setTodo: (currentTodo: Todo): CurrentTodoAction => ({
    type: 'currentTodo/select',
    payload: currentTodo,
  }),

  resetTodo: (): CurrentTodoAction => ({
    type: 'currentTodo/reset',
    payload: null,
  }),
};
