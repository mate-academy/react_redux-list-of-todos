import { createStore } from 'redux';
import { State, Action } from '../react-app-env';
import {
  LOAD_TODOS,
  LOAD_VISIBLE_TODOS,
  LOAD_USER,
} from './actions';

const initialState: State = {
  todos: [],
  visibleTodos: [],
  user: null,
};

const reducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case LOAD_TODOS:
      return {
        ...state,
        todos: [...action.payload],
      };

    case LOAD_VISIBLE_TODOS:
      return {
        ...state,
        visibleTodos: [...action.payload],
      };

    case LOAD_USER:
      return {
        ...state,
        user: action.payload,
      };

    default:
      return state;
  }
};

export const store = createStore(reducer);
