import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import { allTodosReducer } from '../features/todos';
import { filterReducer } from '../features/filter';
import { activeTodoReducer } from '../features/activeTodo';
import { userActiveReducer } from '../features/activeUser';

const rootReducer = combineReducers({
  activeTodo: activeTodoReducer,
  acitveUser: userActiveReducer,
  filter: filterReducer,
  todos: allTodosReducer,
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
