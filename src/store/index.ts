import { createStore } from 'redux';
import { RootState } from '../react-app-env.d';
import { Action, ActionType } from './types/types';

const initialState: RootState = {
  todos: [],
  user: null,
};

// rootReducer - this function is called after dispatching an action
const rootReducer = (state = initialState, action: Action) => {
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

    default:
      return state;
  }
};

// The `store` should be passed to the <Provider store={store}> in `/src/index.tsx`
const store = createStore(
  rootReducer,
);

export default store;
