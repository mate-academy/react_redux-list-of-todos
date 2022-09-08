import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import currentTodoReducer from '../features/currentTodo';
import filterReducer from '../features/filter';
import todosReducer from '../features/todos';
import { Todo } from '../types/Todo';

const rootReducer = combineReducers({
  currentTodo: currentTodoReducer,
  filter: filterReducer,
  todos: todosReducer,
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

const todosSelector = (state: RootState): Todo[] => state.todos;

const todosBySearchQuery = (query: string) => (state: RootState) => {
  return state.todos.filter((t: Todo) => t.title.toLowerCase()
    .includes(query.toLowerCase()));
};

export const TODOS_SELECTOR = {
  todos: todosSelector,
  todosBySearchQuery,
};
