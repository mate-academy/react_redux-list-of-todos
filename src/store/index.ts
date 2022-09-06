import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import loadingReducer from './loading';
import currentTodoReducer from './currentTodo';
import { Todo } from '../Types/Todo';
import todosReducer from './todos';
import filterReducer from './filter';

const rootReducer = combineReducers({
  isTodosLoading: loadingReducer,
  currentTodo: currentTodoReducer,
  todosList: todosReducer,
  filterTodos: filterReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

// Selectors receive RootState from the `useSelector` hook and return required data
export const selectors = {
  isLoading: (state: RootState): boolean => state.isTodosLoading,
  selectedTodo: (state: RootState): Todo => state.currentTodo,
  todosList: (state: RootState): Todo[] => state.todosList,
  filterTodos: (state: RootState) => state.filterTodos,
};

// The `store` is passed to the Provider in `/src/index.tsx`
export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk)),
);
