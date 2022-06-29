import { createStore } from 'redux';
import { State } from '../react-app-env';
import { ActionType, Action } from './actions';

const initialState: State = {
  todos: [],
  user: null,
};

const reducer = (state = initialState, action: Action) => {
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

    case ActionType.CLEAR_USER:
      return {
        ...state,
        user: null,
      };

    default:
      return state;
  }
};

export const store = createStore(reducer);
