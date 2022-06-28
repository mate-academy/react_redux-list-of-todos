import { createStore } from 'redux';
import { State } from '../react-app-env';
import { Action, ActionType } from './actions';

const InitialState:State = {
  todos: [],
  user: null,
};

const reducer = (state = InitialState, action: Action) => {
  switch (action.type) {
    case ActionType.SET_TODOS:
      return {
        ...state,
        todos: [...action.payload],
      };
    case ActionType.SET_USER:
      return {
        ...state,
        user: action.payload,
      };

    case ActionType.DELETE_TODO:
      return {
        ...state,
        todos: [...action.payload],
      };
    default:
      return state;
  }
};

export const store = createStore(reducer);
