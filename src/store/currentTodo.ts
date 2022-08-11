import { Todo } from '../types/Todo';

type SetSelectedTodo = {
  type: 'SELECT_TODO',
  payload: Todo | null,
};

type UnsetSelectedTodo = {
  type: 'UNSELECT_TODO',
  payload: null,
};

type Action = (
  SetSelectedTodo
  | UnsetSelectedTodo
);

export const selectedTodoReducer = (state = null, action: Action) => {
  switch (action.type) {
    case 'SELECT_TODO':
      return action.payload;

    case 'UNSELECT_TODO':
      return action.payload;

    default:
      return state;
  }
};

export const actions = {
  setSelectedTodo: (payload: Todo | null): SetSelectedTodo => ({
    type: 'SELECT_TODO',
    payload,
  }),

  unsetSelectedTodo: (payload: null): UnsetSelectedTodo => ({
    type: 'UNSELECT_TODO',
    payload,
  }),
};
