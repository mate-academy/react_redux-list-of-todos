import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { Todo } from '../types/Todo';
import { selectedTodoReducer } from './currentTodo';
import { loadingReducer } from './loading';

type RootState = {
  loading: boolean;
  todo: Todo | null;
};

export const selectors = {
  isLoading: (state: RootState) => state.loading,
  getTodo: (state: RootState) => state.todo,
};

const rootReducer = combineReducers({
  loading: loadingReducer,
  todo: selectedTodoReducer,
});

export const store = createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(thunk),
  ),
);
