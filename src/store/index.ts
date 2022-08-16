import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { loadingReducer } from './loading';
import { todoReducer } from './currentTodo';
import { Todo } from '../types/Todo';

const rootReducer = combineReducers({
  loadingReducer,
  todoReducer,
});

type State = {
  loadingReducer: boolean,
  todoReducer: Todo | null,
};

export const selectors = ({
  loading: (state: State) => state.loadingReducer,
  todo: (state: State) => state.todoReducer,
});

export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk)),
);
