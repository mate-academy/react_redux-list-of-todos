import { createStore, AnyAction } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

const SORT_BY_OPTIONS = {
  title: 'title',
  completed: 'completed',
  userName: 'userName',
};

const ORDER = {
  asc: 'asc',
  desc: 'desc',
};

const START_LOADING = 'START_LOADING';
const SET_TODOS = 'SET_TODOS';
const HANDLE_ERROR = 'HANDLE_ERROR';
const FINISH_LOADING = 'FINISH_LOADING';
const DELETE_TODO = 'DELETE_TODO';
const SET_STATUS = 'SET_STATUS';
const SORT_BY = 'SORT_BY';

export const startLoading = () => ({ type: START_LOADING });
export const finishLoading = () => ({ type: FINISH_LOADING });

export const setTodos = (todos: Todo[]) => ({ type: SET_TODOS, todos });
export const handleError = (errorMessage: string) => ({ type: HANDLE_ERROR, errorMessage });
export const deleteTodo = (id: number) => ({ type: DELETE_TODO, id });
export const setStatus = (id: number) => ({ type: SET_STATUS, id });
export const handleSortBy = (field: string) => ({ type: SORT_BY, field });

export const getIsLoading = (state: RootState) => state.getIsLoading;
export const getHasError = (state: RootState) => state.errorMessage;
export const getListOfTodos = (state: RootState) => state.todos;
export const getOrder = (state: RootState) => state.order;
export const getSortBy = (state: RootState) => state.sortBy;

export type RootState = {
  getIsLoading: boolean;
  errorMessage: string;
  sortBy: string;
  order: string;
  todos: Todo[];
};

const initialState: RootState = {
  getIsLoading: false,
  errorMessage: '',
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
        hasError: '',
      };

    case SET_TODOS:
      return {
        ...state,
        todos: action.todos,
        loading: false,
      };

    case HANDLE_ERROR:
      return {
        ...state,
        errorMessage: action.errorMessage,
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
        todos: state.todos.filter(todo => todo.id !== action.id),
      };

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
      };

    case SET_STATUS:
      return {
        ...state,
        todos: state.todos.map(todo => {
          if (todo.id === action.id) {
            return {
              ...todo,
              completed: !todo.completed,
            };
          }

          return todo;
        }),
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
