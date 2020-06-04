import { createStore, AnyAction } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import {
  SET_TODOS,
  REMOVE_TODO,
  SET_LOADED,
  SET_LOADING,
  SET_SORT_TYPE,
  SET_REVERSE_LIST,
} from './constants';

const initialState: RootState = {
  todos: [],
  isLoading: false,
  isLoaded: false,
  sortType: '',
  isReverse: false,
};

export const setTodos = (todos: Todo[]) => ({ type: SET_TODOS, todos });
export const deleteTodo = (id: number) => ({ type: REMOVE_TODO, id });
export const setIsLoading = () => ({ type: SET_LOADING });
export const setIsLoaded = () => ({ type: SET_LOADED });
export const setSortType = (sortType: string) => ({ type: SET_SORT_TYPE, sortType });
export const reverseTodos = (status: boolean) => ({ type: SET_REVERSE_LIST, status });

export const getloading = (state: RootState) => state.isLoading;
export const getloaded = (state: RootState) => state.isLoaded;
export const getTodos = (state: RootState) => state.todos;
export const getSortType = (state: RootState) => state.sortType;
export const getReverseStatus = (state: RootState) => state.isReverse;

const rootReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case SET_LOADING:
      return { ...state, isLoading: true };

    case SET_LOADED:
      return { ...state, isLoaded: true };

    case SET_TODOS:
      return { ...state, todos: action.todos };

    case SET_SORT_TYPE:
      return { ...state, sortType: action.sortType };

    case SET_REVERSE_LIST:
      return { ...state, isReverse: action.status };

    case REMOVE_TODO:
      return { ...state, todos: state.todos.filter(todo => todo.id !== action.id) };

    default:
      return state;
  }
};


const store = createStore(
  rootReducer,
  composeWithDevTools(),
);

export default store;
