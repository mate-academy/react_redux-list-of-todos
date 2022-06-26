import { createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { RootState, Action } from '../react-app-env';
import {
  SET_TODOS,
  ADD_TODO,
  SET_USER,
} from './actions';

// Initial state
const initialState: RootState = {
  loading: false,
  message: '',
  todos: [],
  user: null,
};

// rootReducer - this function is called after dispatching an action
const rootReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case SET_TODOS:
      return {
        ...state,
        todos: [...action.payload],
      };

    case ADD_TODO:
      return {
        ...state,
        todos: [...state.todos, action.payload],
      };

    case SET_USER:
      return {
        ...state,
        user: action.payload,
      };

    default:
      return state;
  }
};

// The `store` should be passed to the <Provider store={store}> in `/src/index.tsx`
export const store = createStore(
  rootReducer,
  composeWithDevTools(), // allows you to use http://extension.remotedev.io/
);

export default store;
