import {
  HANDLE_ERROR, HANDLE_SUCCESS, START_LOADING, HANDLE_DELETE,
} from './consts';

export const initialState = {
  preparedTodos: [],
  isLoading: false,
  hasError: false,
  isDelete: false,
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case START_LOADING:
      return {
        ...state,
        isLoading: true,
        hasError: false,
      };
    case HANDLE_SUCCESS:
      return {
        ...state,
        preparedTodos: action.preparedTodos,
        isLoading: false,
      };
    case HANDLE_ERROR:
      return {
        ...state,
        isLoading: false,
        hasError: true,
      };
    case HANDLE_DELETE:
      return {
        ...state,
        preparedTodos: state.preparedTodos
          .filter(todo => todo.id !== action.itemId),
      };
    default:
      return state;
  }
};
