import { AnyAction } from 'redux';
import { State } from '../constants/types';
import {
  SET_DELETE,
  SET_LOADING,
  SET_TODOS,
  SORT_BY_ID,
  SORT_BY_NAME,
  SORT_BY_STATUS,
  SORT_BY_TITLE,
} from './constants';

export const initialState: State = {
  todos: [],
  isLoading: false,
};
export const reduser = (state = initialState, action: AnyAction) => {
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
        todos: [...state.todos].filter(item => item.id !== action.value),
      };
    case SORT_BY_TITLE:
      return {
        ...state,
        todos: [...state.todos]
          .sort((a, b) => a.title.localeCompare(b.title)),
      };
    case SORT_BY_STATUS:
      return {
        ...state,
        todos: [...state.todos]
          .sort((a, b) => Number(a.completed) - Number(b.completed)),
      };
    case SORT_BY_NAME:
      return {
        ...state,
        todos: [...state.todos]
          .sort((a, b) => a.user.name.localeCompare(b.user.name)),
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
