import { createStore } from 'redux';
import { Action, State } from '../react-app-env';
import {
  REMOVE_USER, SET_TODOS, SET_USER,
} from './actions';

export const initialState: State = {
  todos: [],
  user: null,
};

const reducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case SET_TODOS:
      return {
        ...state,
        todos: action.payload,
      };

    case SET_USER:
      return {
        ...state,
        user: action.payload,
      };

    case REMOVE_USER:
      return {
        ...state,
        user: null,
      };

    default:
      return state;
  }
};

export const store = createStore(reducer);
