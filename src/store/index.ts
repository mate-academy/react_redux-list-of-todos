import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import
loadingReducer,
{ selectors as loadingSelectors } from './loadingReducer';
import
currentTodoReducer,
{ selectors as currentTodoSelectors } from './currentTodoReducer';

export const selectors = {
  getLoading(state: { loading: boolean }) {
    return loadingSelectors.getLoading(state.loading);
  },
  getTodo(state: { todoId: number }) {
    return currentTodoSelectors.getTodo(state.todoId);
  },
};

const reducer = combineReducers({
  loading: loadingReducer,
  todoId: currentTodoReducer,
});

export const store = createStore(
  reducer,
  composeWithDevTools(
    applyMiddleware(thunk),
  ),
);
