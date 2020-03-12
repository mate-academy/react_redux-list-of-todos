import { AnyAction, createStore } from 'redux';
import {
  SET_DELETE,
  SET_LOADING,
  SET_TODOS,
  SORT_BY_ID,
  SORT_BY_NAME,
  SORT_BY_STATUS,
  SORT_BY_TITLE,
  State,
  TodoWithUser,
} from './constants/types';

const initialState: State = {
  todos: [],
  isLoading: false,
};

export const setTodos = (value: TodoWithUser[]) => ({
  type: SET_TODOS, value,
});
export const setLoading = (value: boolean) => ({
  type: SET_LOADING, value,
});
export const deleteTodo = (id: number) => ({
  type: SET_DELETE, id,
});
export const sortByTitle = () => ({
  type: SORT_BY_TITLE,
});
export const sortByName = () => ({
  type: SORT_BY_NAME,
});
export const sortById = () => ({
  type: SORT_BY_ID,
});
export const sortByStatus = () => ({
  type: SORT_BY_STATUS,
});

export const getLoading = (state: State) => state.isLoading;
export const getTodos = (state: State) => state.todos;

const reduser = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case SET_TODOS:
      return {
        ...state,
        todos: action.value,
      };
    case SET_LOADING:
      return {
        ...state,
        isLoading: action.value,
      };
    case SET_DELETE:
      return {
        ...state,
        todos: [...state.todos].filter(item => item.id !== action.id),
      };
    case SORT_BY_TITLE:
      return {
        ...state,
        todos: [...state.todos].sort((a, b) => a.title.localeCompare(b.title)),
      };
    case SORT_BY_STATUS:
      return {
        ...state,
        todos: [...state.todos].sort((a, b) => Number(a.completed) - Number(b.completed)),
      };
    case SORT_BY_NAME:
      return {
        ...state,
        todos: [...state.todos].sort((a, b) => a.user.name.localeCompare(b.user.name)),
      };
    case SORT_BY_ID:
      return {
        ...state,
        todos: [...state.todos].sort((a, b) => a.id - b.id),
      };
    default:
      return state;
  }
};

export const store = createStore(
  reduser,
  initialState,
);
