import { Todo } from '../types/Todo';

type SetTodo = {
  type: 'SET_TODO',
  payload: Todo;
};

type UnsetTodo = {
  type: 'UNSET_TODO',
};

type Action = SetTodo | UnsetTodo;

export const actions = {
  setTodo: (todo: Todo): SetTodo => ({
    type: 'SET_TODO',
    payload: todo,
  }),

  unsetTodo: (): UnsetTodo => ({
    type: 'UNSET_TODO',
  }),
};

const initialState = {
  todo: null,
};

export const todoReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case 'SET_TODO':
      return action.payload;

    case 'UNSET_TODO':
      return null;

    default:
      return state;
  }
};
