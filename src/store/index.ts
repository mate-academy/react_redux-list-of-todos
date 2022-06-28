import { createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { RootState } from '../react-app-env';
import { SetTodosAction, SetUserAction, ActionType } from './actions';

// Initial state
const initialState: RootState = {
  todos: [],
  user: null,
};

// rootReducer - this function is called after dispatching an action
const rootReducer = (
  state = initialState,
  action: SetTodosAction | SetUserAction,
) => {
  switch (action.type) {
    case ActionType.SET_TODOS:
      return {
        ...state,
        todos: [...action.payload],
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
export const store = createStore(
  rootReducer,
  composeWithDevTools(), // allows you to use http://extension.remotedev.io/
);

export default store;
