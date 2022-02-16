import { createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { LOAD_TODOS, LOAD_USER } from './actions';

const initialState: State = {
  todos: [],
  user: null,
};

const rootReducer = (state = initialState, action: Action) => {
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

    default:
      return state;
  }
};

const store = createStore(
  rootReducer,
  composeWithDevTools(),
);

export default store;
