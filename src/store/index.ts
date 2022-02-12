import { createStore } from 'redux';
import { LOAD_TODOS, LOAD_USER, SET_STATUS } from './actions';

const initialState: State = {
  todos: [],
  user: null,
  status: 'all',
  query: '',
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

    case SET_STATUS:
      return {
        ...state,
        status: action.payload,
      };

    default:
      return state;
  }
};

export const store = createStore(reducer);
