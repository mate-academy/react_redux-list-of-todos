import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import { Todo } from '../types/Todo';
import { loadingReducer } from './loading';
import { selectionTodoReducer } from './currentTodo';

type RootState = {
  loading: boolean;
  todo: Todo | null;
};

const rootReducer = combineReducers({
  loadingReducer,
  selectionTodoReducer,
});

export const selectors = {
  getLoading: (state: RootState) => state.loading,
  getTodo: (state: RootState) => state.todo,
};

export const store = createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(thunk),
  ),
);
