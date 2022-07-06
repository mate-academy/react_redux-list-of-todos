import { createStore } from 'redux';
import { ActionTypes } from './actions';

const initialState: State = {
  todos: [],
  user: null,
};

const reducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case ActionTypes.SET_TODOS:
      return {
        ...state,
        todos: [...action.payload],
      };
    case ActionTypes.SET_USER:
      return {
        ...state,
        user: action.payload,
      };
    default:
      return state;
  }
};

export const store = createStore(reducer);
