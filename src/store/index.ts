// import thunk from 'redux-thunk';
import { createStore, AnyAction } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { RootState } from '../react-app-env';
import {
  ADD_USER_ID, LOAD_TODOS, LOAD_USER, LOAD_USER_ERROR,
} from './actions';

const initialState: RootState = {
  todos: [],
  user: null,
  error: false,
  selectedUserId: 0,
};

const rootReducer = (state = initialState, action: AnyAction) => {
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

    case LOAD_USER_ERROR:
      return {
        ...state,
        user: null,
        error: action.payload,
      };

    case ADD_USER_ID:
      return {
        ...state,
        selectedUserId: action.payload,
      };

    default:
      return state;
  }
};

// The `store` should be passed to the <Provider store={store}> in `/src/index.tsx`
const store = createStore(
  rootReducer,
  composeWithDevTools(), // allows you to use http://extension.remotedev.io/
);

export default store;
