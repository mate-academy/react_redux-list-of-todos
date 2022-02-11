import { createStore } from 'redux';
import { LOAD_TODOS, LOAD_USER, SET_USER_ID } from './actions';

const initialState: State = {
  todos: [],
  user: null,
  userId: 0,
};

const reducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case LOAD_TODOS:
      return {
        ...state,
        todos: [...action.payload],
      };
    case LOAD_USER:
      return {
        ...state,
        user: action.payload,
      };
    case SET_USER_ID:
      return {
        ...state,
        userId: action.payload,
      };
    default:
      return state;
  }
};

export const store = createStore(reducer);
