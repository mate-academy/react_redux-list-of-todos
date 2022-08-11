import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { currentTodoReducer } from './currentTodo';
import { loadingReducer } from './loading';

export const RootReducer = combineReducers({
  isLoaded: loadingReducer,
  userLoading: currentTodoReducer,
});

export const store = createStore(
  RootReducer,
  composeWithDevTools(
    applyMiddleware(thunk),
  ),
);

export type RootState = ReturnType<typeof RootReducer>;
