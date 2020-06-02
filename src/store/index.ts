import { createStore, AnyAction } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import {
  START_LOADING,
  HANLDE_SUCCESS,
  HANDLE_ERROR,
  HANDLE_REMOVE,
  HANDLE_SORT,
} from './actionTypes';

// import sortReducer from './sort';
// import loadingReducer from './loading';
// import removReducer from './remove';

export const startLoading = () => ({ type: START_LOADING });
export const handleSuccess = (todos: PreparedTodos) => ({ type: HANLDE_SUCCESS, todos });
export const handleError = () => ({ type: HANDLE_ERROR });
export const handleSort = (sortType: string) => ({ type: HANDLE_SORT, sortType });
export const handleRemove = (taskId: number) => ({ type: HANDLE_REMOVE, taskId });

export type RootState = {
  isLoading: boolean;
  hasError: boolean;
  todos: PreparedTodos[];
  sortType: string;
};

const initialState: RootState = {
  isLoading: false,
  hasError: false,
  todos: [],
  sortType: '',
};

const rootReducer = (state = initialState, action: AnyAction) => {
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

    case HANDLE_REMOVE:
      return {
        ...state,
        todos: state.todos.filter(task => task.id !== action.taskId),
      };

    case HANDLE_SORT:
      return {
        ...state,
        sortType: action.sortType,
      };

    default:
      return state;
  }
};

const store = createStore(
  rootReducer, composeWithDevTools(),
);

export default store;
