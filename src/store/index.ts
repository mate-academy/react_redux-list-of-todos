import { createStore, AnyAction } from 'redux';
import { ADD_TODO, SET_TODOS, SET_USER } from './actions';
import { RootState } from '../react-app-env.d';

const initialState: RootState = {
  todos: [],
  user: null,
};

// rootReducer - this function is called after dispatching an action
const rootReducer = (state = initialState, action: AnyAction) => {
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
const store = createStore(
  rootReducer,
);

export default store;
