import { createStore } from 'redux';
import { State } from '../react-app-env';
import { Action, ActionType } from './actions';

const initialState: State = {
  todos: [],
  user: null,
};

const reducer = (state = initialState, action: Action): State => {
  switch (action.type) {
    case ActionType.SET_TODOS:
      return {
        ...state,
        todos: [...action.payload],
      };

    case ActionType.ADD_TODO:
      return {
        ...state,
        todos: [...state.todos, action.payload],
      };

    case ActionType.SET_USER:
      return {
        ...state,
        user: action.payload,
      };

    default:
      return state;
  }
};

export const store = createStore(reducer);
