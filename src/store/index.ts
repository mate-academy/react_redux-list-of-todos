import { createStore } from 'redux';
import { Action, State } from '../react-app-env';
import {
  ADD_TODO, CLEAR_USER, SET_TODOS, SET_USER,
} from './actions';

const initialState: State = {
  todos: [],
  user: null,
};

const reducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case SET_TODOS:
      return {
        ...state,
        todos: [...action.payload],
      };

    case ADD_TODO:
      return {
        ...state,
        todos: [...state.todos, action.payload],
      };

    case SET_USER:
      return {
        ...state,
        user: action.payload,
      };

    case CLEAR_USER:
      return {
        ...state,
        user: null,
      };

    default:
      return state;
  }
};

export const store = createStore(reducer);
