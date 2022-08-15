import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { selectedTodoReducer } from './currentTodo';
import { loadingReducer } from './loading';

type RootState = ReturnType<typeof rootReducer>;

export const selectors = {
  getloadingStatus: (state: RootState) => state.loading,
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
