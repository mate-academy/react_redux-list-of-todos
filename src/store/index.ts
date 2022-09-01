import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { loadingReducer } from './loading';
import { selectionTodoReducer } from './currentTodo';

const rootReducer = combineReducers({
  loadingReducer,
  selectionTodoReducer,
});

type RootState = ReturnType<typeof rootReducer>;

export const selectors = {
  getLoading: (state: RootState) => state.loadingReducer,
  getTodo: (state: RootState) => state.selectionTodoReducer,
};

export const store = createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(thunk),
  ),
);
