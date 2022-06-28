import { createStore, AnyAction } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { Todo, User } from '../react-app-env';
import {
  DELETE_TODO,
  LOADING_TODOS,
  SHOW_USER,
} from './actions';

// Initial state
export type RootState = {
  todos: Todo[];
  user: User | null;
};

const initialState: RootState = {
  todos: [],
  user: null,
};

// rootReducer - this function is called after dispatching an action
const rootReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case LOADING_TODOS:
      return { ...state, todos: [...state.todos, ...action.payload] };

    case SHOW_USER:
      return {
        ...state,
        user: action.payload,
      };

    case DELETE_TODO:
      return {
        ...state,
        todos: [...state.todos].filter(todo => todo.id !== action.payload),
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
