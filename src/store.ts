import { createStore, Reducer, AnyAction } from 'redux';
import {
  REMOVE_TODO,
  SET_TODOS,
  SORT_BY_NAME,
  SORT_BY_TITLE,
  SORT_BY_STATUS,
} from './constants';

const initialState: State = {
  todos: [],
};

const reducer: Reducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case SET_TODOS:
      return {
        todos: action.value,
      };
    case REMOVE_TODO:
      return {
        todos: state.todos.filter((todo: { id: number }) => todo.id !== action.value),
      };
    case SORT_BY_NAME:
      return {
        todos: [...state.todos]
          .sort((a, b) => a.user.name.localeCompare(b.user.name)),
      };
    case SORT_BY_TITLE:
      return {
        todos: [...state.todos]
          .sort((a, b) => a.title.localeCompare(b.title)),
      };
    case SORT_BY_STATUS:
      return {
        todos: [...state.todos]
          .sort((a, b) => Number(b.completed) - Number(a.completed)),
      };
    default:
      return state;
  }
};

export const store = createStore(reducer);
