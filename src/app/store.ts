import { combineReducers, createStore } from 'redux';
import filterReducer from '../features/filter';
import currentTodoReducer from '../features/currentTodo';
import todosReducer from '../features/todos';

const rootReducer = combineReducers({
  filter: filterReducer,
  todos: todosReducer,
  currentTodo: currentTodoReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export const store = createStore(rootReducer);
