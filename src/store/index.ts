import { createStore } from 'redux';
import { State } from '../react-app-env';
import {
  Action,
  ActionType,
} from './actions';

export const initialState: State = {
  todos: [],
  user: null,
};

const reducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case ActionType.SET_TODOS:
      return {
        ...state,
        todos: action.payload,
      };

    case ActionType.SET_USER:
      return {
        ...state,
        user: action.payload,
      };

    case ActionType.REMOVE_USER:
      return {
        ...state,
        user: null,
      };

    default:
      return state;
  }
};

export const store = createStore(reducer);
