import { createStore, AnyAction } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import { SORT_BY_OPTIONS, ORDER } from '../constants';

const START_LOADING = 'START_LOADING';
const HANDLE_SUCCESS = 'HANDLE_SUCCESS';
const HANDLE_ERROR = 'HANDLE_ERROR';
const FINISH_LOADING = 'FINISH_LOADING';
const DELETE_TODO = 'DELETE_TODO';
const SET_STATUS = 'SET_STATUS';
const SORT_BY = 'SORT_BY';

export const startLoading = () => ({ type: START_LOADING });
export const finishLoading = () => ({ type: FINISH_LOADING });
export const handleSuccess = (todos: Todo[]) => ({ type: HANDLE_SUCCESS, todos });
export const handleError = () => ({ type: HANDLE_ERROR });
export const deleteTodo = (id: number) => ({ type: DELETE_TODO, id });
export const setStatus = (id: number) => ({ type: SET_STATUS, id });
export const sortBy = (field: string) => ({ type: SORT_BY, field })

export const isLoading = (state: RootState) => state.isLoading;
export const hasError = (state: RootState) => state.hasError;
export const listOfTodos = (state: RootState) => state.todos;
export const getOrder = (state: RootState) => state.order;
export const getSortBy = (state: RootState) => state.sortBy;

export type RootState = {
  isLoading: boolean;
  hasError: boolean;
  sortBy: string;
  order: string;
  todos: Todo[];
};

const initialState: RootState = {
  isLoading: false,
  hasError: false,
  sortBy: SORT_BY_OPTIONS.title,
  order: ORDER.asc,
  todos: [],
};

const rootReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case START_LOADING:
      return {
        ...state,
        loading: true,
        hasError: false,
      };

    case HANDLE_SUCCESS:
      return {
        ...state,
        todos: action.todos,
        loading: false,
      };

    case HANDLE_ERROR:
      return {
        ...state,
        hasError: true,
        isLoading: false,
      };

    case FINISH_LOADING:
      return {
        ...state,
        loading: false,
      };

    case DELETE_TODO:
      return {
        ...state,
        todos: state.todos.filter(todo => todo.id !== action.id)
      }

    case SORT_BY:
      if (state.sortBy === action.field) {
        return {
          ...state,
          order: state.order === ORDER.asc ? ORDER.desc : ORDER.asc,
        };
      }

      return {
        ...state,
        order: ORDER.asc,
        sortBy: action.field,
      }

    case SET_STATUS:
      return {
        ...state,
        todos: state.todos.map(todo => {
          if (todo.id === action.id) {
            return {
              ...todo,
              completed: !todo.completed
            }
          }
          return todo
        })
      }

    default:
      return state;
  }
};

const store = createStore(
  rootReducer,
  composeWithDevTools(),
);

export default store;
