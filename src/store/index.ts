import { createStore, AnyAction } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { User, Todo } from '../react-app-env';

import {
  LOAD_TODOS,
  LOAD_USER,
  LOAD_ERROR,
  DELETE_TODO,
  SELECT_USER,
} from './actions';

export const selectors = {
  loadUserSelector: (state: RootState) => state.user,
  getUsersIdSelector: (state: RootState) => state.userId,
  loadTodosSelector: (state: RootState) => state.todos,
  loadErrorSelector: (state: RootState) => state.errorLoading,
};

export type RootState = {
  user: User | null,
  userId: number,
  todos: Todo[],
  errorLoading: string,
};

const initialState: RootState = {
  user: null,
  userId: 0,
  todos: [],
  errorLoading: '',
};

const rootReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case LOAD_TODOS:
      return {
        ...state,
        todos: action.todos,
      };
    case LOAD_USER:
      return {
        ...state,
        user: action.user,
      };
    case SELECT_USER:
      return {
        ...state,
        userId: action.userId,
      };
    case DELETE_TODO:
      return {
        ...state,
        todos: state.todos.filter(todo => todo.id !== action.id),
      };
    case LOAD_ERROR:
      return {
        ...state,
        errorLoading: action.message,
      };

    default:
      return state;
  }
};

const store = createStore(
  rootReducer,
  composeWithDevTools(),
);

export default store;
