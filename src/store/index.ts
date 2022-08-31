import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import loadingReducer from './loading';
import currentTodoReducer from './currentTodo';

export type RootState = ReturnType<typeof rootReducer>;
const rootReducer = combineReducers({
  loading: loadingReducer,
  currentTodo: currentTodoReducer,
});

export const selectors = {
  isLoading: (state: RootState) => state.loading,
  getTodo: (state: RootState) => state.currentTodo,
};

// The `store` is passed to the Provider in `/src/index.tsx`
export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk)),
);
