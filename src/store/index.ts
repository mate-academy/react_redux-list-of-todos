import {
  createStore, applyMiddleware, combineReducers,
} from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { Todo } from '../types/Todo';
import { currentTodoReducer } from './currentTodo';
import { loadingReducer } from './loading';

const rootReducer = combineReducers({
  currentTodoReducer,
  loadingReducer,
});

type State = {
  currentTodoReducer: Todo | null,
  loadingReducer: boolean,
};

export const selectors = {
  isLoading: (state: State) => state.loadingReducer,
  getTodo: (state: State) => state.currentTodoReducer,
};

export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk)),
);
