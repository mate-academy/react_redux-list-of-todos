import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import currentTodoIdReducer from '../features/currentTodoId';
import currentUserReducer from '../features/currentUser';
import filterReducer from '../features/filter';
import todosReducer from '../features/todos';

const rootReducer = combineReducers({
  currentTodoId: currentTodoIdReducer,
  filter: filterReducer,
  todos: todosReducer,
  currentUser: currentUserReducer,
});

// The `store` is passed to the Provider in `/src/index.tsx`
export const store = createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(thunk),
  ),
);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
