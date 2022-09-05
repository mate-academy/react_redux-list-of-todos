import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import
loadingReducer,
{ selectors as loadingSelectors } from './loadingReducer';
import
currentTodoReducer,
{ selectors as currentTodoSelectors } from './currentTodoReducer';
import
TodosReducer,
{ selectors as todosSelectors } from './TodosReducer';
import { Todo } from '../types/Todo';

export const selectors = {
  getLoading(state: { loading: boolean }) {
    return loadingSelectors.getLoading(state.loading);
  },

  setTodo(state: { todoId: number }) {
    return currentTodoSelectors.setTodo(state.todoId);
  },

  getTodo(state: { todo: Todo[] }) {
    return todosSelectors.getTodo(state.todo);
  },
};

const reducer = combineReducers({
  loading: loadingReducer,
  todoId: currentTodoReducer,
  todo: TodosReducer,
});

export const store = createStore(reducer, composeWithDevTools(
  applyMiddleware(thunk),
));

export type RootState = ReturnType<typeof reducer>;
