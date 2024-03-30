import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import currentTodoReducer from '../features/currentTodo';
import filterReducer from '../features/filter';
import todosReducer from '../features/todos';

const rootReducer = combineReducers({
  currentTodo: currentTodoReducer,
  filter: filterReducer,
  todos: todosReducer,
});

export const store = createStore(rootReducer, applyMiddleware(thunk));

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
