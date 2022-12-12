// import { composeWithDevTools } from 'redux-devtools-extension';
import { createStore, combineReducers } from 'redux';
// import { createStore, applyMiddleware, combineReducers } from 'redux';
// import thunk from 'redux-thunk';

import currentTodoReducer from '../features/currentTodo';
import filterReducer from '../features/filter';
import todosReducer from '../features/todos';

const rootReducer = combineReducers({
  currentTodo: currentTodoReducer,
  filter: filterReducer,
  todos: todosReducer,
});

// The `store` is passed to the Provider in `/src/index.tsx`
export const store = createStore(
  rootReducer,
  // composeWithDevTools(
  //   applyMiddleware(thunk),
  // ),
);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
