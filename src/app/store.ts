import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import currentTodoReducer from '../features/currentTodo';
import filterReducer from '../features/filterTodos';
import queryReducer from '../features/queryTodos';

export const rootReducer = combineReducers({
  currentTodo: currentTodoReducer,
  filterR: filterReducer,
  queryR: queryReducer,
});

export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk)),
);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
