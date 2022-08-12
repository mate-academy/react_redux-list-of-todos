import { createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { Action, ActionType } from './action';

const initialState: State = {
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
    case ActionType.DELETE_TODO:
      return {
        ...state,
        todos: state.todos.filter(todo => todo.id !== action.payload),
      };

    case ActionType.SET_USER:
      return {
        ...state,
        user: action.payload,
      };
    case ActionType.DELETE_USER:
      return {
        ...state,
        user: null,
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
