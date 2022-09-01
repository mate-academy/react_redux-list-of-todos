import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import currentTodoReducer from './currentTodo';
import userReducer from './user';

const rootReducer = combineReducers({
  userInfo: userReducer,
  currentTodo: currentTodoReducer,
});

type RootState = ReturnType<typeof rootReducer>;

export const selectors = {
  getUserInfo: (state: RootState) => state.userInfo,
  getTodo: (state: RootState) => state.currentTodo,
};

// The `store` is passed to the Provider in `/src/index.tsx`
export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk)),
);
