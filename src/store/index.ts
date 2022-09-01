import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import userReducer from './user';
import todosReducer from './todos';

const rootReducer = combineReducers({
  todosInfo: todosReducer,
  userInfo: userReducer,
});

type RootState = ReturnType<typeof rootReducer>;

export const selectors = {
  getUserInfo: (state: RootState) => state.userInfo,
  getTodosInfo: (state: RootState) => state.todosInfo,
};

// The `store` is passed to the Provider in `/src/index.tsx`
export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk)),
);
