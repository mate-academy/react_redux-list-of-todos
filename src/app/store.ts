import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import { allTodosReducer } from '../features/allTodo';
import { filterReducer } from '../features/filter';
import { todosReducer } from '../features/activeTodo';

const rootReducer = combineReducers({
  activeTodo: todosReducer,
  filter: filterReducer,
  allTodos: allTodosReducer,
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
