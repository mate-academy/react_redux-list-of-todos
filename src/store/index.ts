import { createStore } from 'redux';
import { SELECT_USER, SET_TODOS } from './Actions';

const initionalState: State = {
  todos: [],
  user: null,
};

const reducer = (state = initionalState, action: Action): State => {
  switch (action.type) {
    case SET_TODOS:
      return {
        ...state,
        todos: action.payload,
      };
    case SELECT_USER:
      return {
        ...state,
        user: action.payload,
      };
    default:
      return state;
  }
};

export const store = createStore(reducer);
