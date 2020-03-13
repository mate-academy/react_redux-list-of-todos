import { AnyAction } from 'redux';
import { State } from '../constants/types';
import { ActionTypes } from './actionCreators';

export const initialState: State = {
  todos: [],
  isLoading: false,
};
export const rootReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case ActionTypes.SET_TODOS:
      return {
        ...state,
        todos: action.payload,
      };
    case ActionTypes.SET_LOADING:
      return {
        ...state,
        isLoading: action.payload,
      };
    case ActionTypes.SET_DELETE:
      return {
        ...state,
        todos: [...state.todos].filter(item => item.id !== action.payload),
      };
    case ActionTypes.SORT_BY_TITLE:
      return {
        ...state,
        todos: [...state.todos]
          .sort((a, b) => a.title.localeCompare(b.title)),
      };
    case ActionTypes.SORT_BY_STATUS:
      return {
        ...state,
        todos: [...state.todos]
          .sort((a, b) => Number(a.completed) - Number(b.completed)),
      };
    case ActionTypes.SORT_BY_NAME:
      return {
        ...state,
        todos: [...state.todos]
          .sort((a, b) => a.user.name.localeCompare(b.user.name)),
      };
    case ActionTypes.SORT_BY_ID:
      return {
        ...state,
        todos: [...state.todos].sort((a, b) => a.id - b.id),
      };
    default:
      return state;
  }
};
