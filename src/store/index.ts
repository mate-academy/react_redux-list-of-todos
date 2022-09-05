import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { loadingReducer } from './loading';
import { selectionTodoReducer } from './currentTodo';
import { todosReducer } from './todos';

const rootReducer = combineReducers({
  loadingReducer,
  selectionTodoReducer,
  todosReducer,
});

type RootState = ReturnType<typeof rootReducer>;

export const selectors = {
  getLoading: (state: RootState) => state.loadingReducer,
  getTodo: (state: RootState) => state.selectionTodoReducer,
  getTodos: (state: RootState) => state.todosReducer,
};

export const store = createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(thunk),
  ),
);
