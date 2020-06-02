import { AnyAction } from 'redux';
import { HANLDE_SUCCESS, HANDLE_ERROR, START_LOADING } from './actionTypes';

type LoadingState = {
  isLoading: boolean;
  hasError: boolean;
  todos: PreparedTodos[];
};

const initialState: LoadingState = {
  isLoading: false,
  hasError: false,
  todos: [],
};

const reducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case START_LOADING:
      return {
        ...state,
        isLoading: true,
        hasError: false,
      };
    case HANLDE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        hasError: false,
        todos: action.todos,
      };
    case HANDLE_ERROR:
      return {
        ...state,
        isLoading: false,
        hasError: true,
      };
    default:
      return state;
  }
};

export default reducer;
