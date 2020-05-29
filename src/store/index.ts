import { createStore, AnyAction } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import { SortFields } from '../helpers';


const START_LOADING = 'START_LOADING';
const FINISH_LOADING = 'FINISH_LOADING';
const SET_LOADED = 'IS_LOADED';
const SET_TODOS = 'SET_TODOS';
const SET_ERROR = 'SET_ERROR';
const DELETE_TODO = 'DELETE_TODO';
const SET_SORT_FIELD = 'SET_SORT_FIELD';
const SORT_REVERSE = 'SORT_REVERSE';


export const startLoading = () => ({ type: START_LOADING });
export const finishLoading = (message = 'No message') => ({
  type: FINISH_LOADING,
  message,
});
export const setLoaded = () => ({ type: SET_LOADED });
export const setTodos = (todos: Todo[] = []) => ({
  type: SET_TODOS,
  todos,
});
export const setError = (error = '') => ({
  type: SET_ERROR,
  error,
});
export const deleteTodo = (todoId: number) => ({
  type: DELETE_TODO,
  todoId,
});
export const setSortField = (sortField: SortFields) => ({
  type: SET_SORT_FIELD,
  sortField,
});
export const setSortReverse = (isReverse: boolean) => ({
  type: SORT_REVERSE,
  isReverse,
});

export const isLoading = (state: RootState) => state.loading;
export const isLoaded = (state: RootState) => state.loaded;
export const getMessage = (state: RootState) => state.message;
export const getTodos = (state: RootState) => state.todos;
export const getError = (state: RootState) => state.error;
export const getSortType = (state: RootState) => state.sortField;
export const isReverse = (state: RootState) => state.isReverse;

export type RootState = {
  loading: boolean;
  loaded: boolean;
  message: string;
  error: string;
  sortField: SortFields;
  isReverse: boolean;
  todos: Todo[];
};

const initialState: RootState = {
  loading: false,
  loaded: false,
  message: '',
  error: '',
  sortField: SortFields.Id,
  isReverse: false,
  todos: [],
};

const rootReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case START_LOADING:
      return {
        ...state,
        loading: true,
      };

    case FINISH_LOADING:
      return {
        ...state,
        loading: false,
        message: action.message,
      };

    case SET_LOADED:
      return {
        ...state,
        loaded: true,
      };

    case SET_TODOS:
      return {
        ...state,
        todos: [...action.todos],
      };

    case SET_ERROR:
      return {
        ...state,
        error: action.error,
      };

    case DELETE_TODO:
      return {
        ...state,
        todos: state.todos.filter(todo => todo.id !== action.todoId),
      };

    case SET_SORT_FIELD:
      return {
        ...state,
        sortField: action.sortField,
      };

    case SORT_REVERSE:
      return {
        ...state,
        isReverse: action.isReverse,
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
