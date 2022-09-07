import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import currentTodoReducer from '../features/currentTodo';
import filterReducer from '../features/filter';
import loadingReducer from '../features/loading';
// eslint-disable-next-line import/no-named-as-default
import todosReducer from '../features/todos';

export const getFilter = (state: RootState) => {
  return state.filter;
};

const rootReducer = combineReducers({
  currentTodo: currentTodoReducer,
  filter: filterReducer,
  todos: todosReducer,
  loading: loadingReducer,
});

export const store = createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(thunk),
  ),
);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
