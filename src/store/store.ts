import { createStore, AnyAction } from 'redux';
import {
  IS_LOADED,
  SET_TODOS,
  SORT_BY_TITLE,
  SORT_BY_STATUS,
  SORT_BY_USERNAME,
  DELETE_TODO,
} from './ActionTypes';


export const setLoaded = (done: boolean) => ({ type: IS_LOADED, payload: done });
export const deleteTodo = (id: number) => ({ type: DELETE_TODO, payload: id });

const initialState: State = {
  isLoading: false,
  todos: [],
};

const reducer = (state: State = initialState, action: AnyAction) => {
  switch (action.type) {
    case IS_LOADED: {
      return {
        ...state,
        isLoading: action.payload,
      };
    }

    case SET_TODOS:
      return {
        ...state,
        todos: action.payload,
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

    case SORT_BY_USERNAME:
      return {
        ...state,
        todos: [...state.todos].sort((a, b) => a.user.name.localeCompare(b.user.name)),
      };

    case DELETE_TODO:
      return {
        ...state,
        todos: [...state.todos].filter(todo => todo.id !== action.payload),
      };

    default:
      return state;
  }
};

export const store = createStore(reducer);
