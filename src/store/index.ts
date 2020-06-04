import { createStore, AnyAction } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { BY_TITLE, BY_NAME, BY_STATUS } from './Constants';

const START_LOADING = 'START_LOADING';
const FINISH_LOADING = 'FINISH_LOADING';
const SET_TODOS = 'SET_TODOS';
const HANDLE_ERROR = 'HANDLE_ERROR';

const SORT_BY = 'SORT_BY';
const DELETE_TODO = 'DELETE';

export const startLoading = () => ({ type: START_LOADING });
export const finishLoading = () => ({ type: FINISH_LOADING });
export const setTodos = (todos: PreparedTodo[]) => ({
  type: SET_TODOS,
  todos,
});
export const handleError = (errorMessage: string) => ({
  type: HANDLE_ERROR,
  errorMessage,
});
export const setSortField = (sortField: string) => ({
  type: SORT_BY,
  sortField,
});

export const deleteTodo = (id: number) => ({
  type: DELETE_TODO,
  id,
});

export const getTodos = (state: RootState) => state.todos;
export const getIsLoading = (state: RootState) => state.isLoading;
export const getIsLoaded = (state: RootState) => state.isLoaded;
export const getSortField = (state: RootState) => state.sortField;
export const getError = (state: RootState) => state.errorMessage;

export const getVisibleTodos = (state: RootState) => {
  const visibleTodos = [...state.todos];

  switch (state.sortField) {
    case BY_TITLE:
      visibleTodos.sort((a: PreparedTodo, b: PreparedTodo) => (a.title.localeCompare(b.title)));
      break;

    case BY_NAME:
      visibleTodos
        .sort((a: PreparedTodo, b: PreparedTodo) => (a.user.name.localeCompare(b.user.name)));
      break;

    case BY_STATUS:
      visibleTodos.sort((a: PreparedTodo, b: PreparedTodo) => (+a.completed - +b.completed));
      break;

    default:
      return visibleTodos;
  }

  return visibleTodos;
};

export type RootState = {
  todos: PreparedTodo[];
  sortField: string;
  isLoaded: boolean;
  isLoading: boolean;
  errorMessage: string;
};

const initialState: RootState = {
  todos: [],
  sortField: '',
  isLoaded: false,
  isLoading: false,
  errorMessage: '',
};

const rootReducer = (state = initialState, action: AnyAction): RootState => {
  switch (action.type) {
    case START_LOADING:
      return {
        ...state,
        isLoading: true,
        isLoaded: false,
        errorMessage:'',
      };

    case SET_TODOS:
      return {
        ...state,
        todos: [...action.todos],
      };

    case HANDLE_ERROR:
      return {
        ...state,
        errorMessage: action.errorMessage,
        isLoading: false,
        isLoaded: false,
      };

    case FINISH_LOADING:
      return {
        ...state,
        isLoading: false,
        isLoaded: true,
      };

    case SORT_BY:
      return {
        ...state,
        sortField: action.sortField,
      };

    case DELETE_TODO:
      return {
        ...state,
        todos: [...state.todos].filter(todo => todo.id !== action.id),
      };

    default: return state;
  }
};

const store = createStore(rootReducer, composeWithDevTools());

export default store;
