import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import currentTodoReducer from './currentTodo/currentTodo';
import filterReducer from './filter/filter';
import todosReducer from './todos/todos';

const rootReducer = combineReducers({
  currentTodo: currentTodoReducer,
  filter: filterReducer,
  todos: todosReducer,
});

// The `store` is passed to the Provider in `/src/index.tsx`
export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk)),
);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
