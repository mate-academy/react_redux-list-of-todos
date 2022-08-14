import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { Todo } from '../types/Todo';
import loadingReducer, {
  actions as loadingActions,
  selectors as loadingSelectors,
} from './loading';
import todoReduser, {
  actions as selectedTodoActions,
  selectors as selectedTodoSelector,
} from './currentTodo';

export const actions = {
  loadingActions,
  selectedTodoActions,
};

export const selectors = {
  isLoading: (state: { loading: boolean }) => (
    loadingSelectors.isLoading(state.loading)),

  selectedTodo: (state: { todo: Todo }) => (
    selectedTodoSelector.selectedTodo(state.todo)),
};

const rootReducer = combineReducers({
  loading: loadingReducer,
  todo: todoReduser,
});

export const store = createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(thunk),
  ),
);
