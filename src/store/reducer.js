/* eslint-disable import/prefer-default-export */
import { ACTION_TYPES } from './actions';

const initialState = {
  isLoad: false,
  todos: [],
  isLoading: false,
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_TYPES.START_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case ACTION_TYPES.TODOS_LIST_LOADED:
      return {
        ...state,
        todos: action.payload.sort(
          (prev, next) => (prev.title > next.title ? 1 : -1)
        ),
      };

    case ACTION_TYPES.TODO_DELETE:
      return {
        ...state,
        todos: [...state.todos].filter(todo => todo.id !== action.payload),
      };

    case ACTION_TYPES.HANDLE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isLoad: true,
      };
    default:
      return state;
  }
};
