import { createStore, combineReducers } from 'redux';
import { currentTodoReducer } from '../features/currentTodo';
import { todosReducer } from '../features/todos';
import { filterReducer } from '../features/filter';

const rootReducer = combineReducers({
  currentTodo: currentTodoReducer,
  todos: todosReducer,
  filter: filterReducer,
});

export const store = createStore(rootReducer);

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
