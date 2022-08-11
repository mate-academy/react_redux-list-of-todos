import {
  legacy_createStore as createStore,
  combineReducers,
  applyMiddleware,
} from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { Todo } from '../types/Todo';
import { selectedTodoReducer } from './currentTodo';
import { LoadingReducer } from './loading';

type RootState = {
  todo: Todo | null;
  loading: boolean;
};

const rootReducer = combineReducers({
  loading: LoadingReducer,
  todo: selectedTodoReducer,
});

export const selectors = {
  isLoading: (state: RootState) => state.loading,
  getTodo: (state: RootState) => state.todo,
};

export const store = createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(thunk),
  ),
);
