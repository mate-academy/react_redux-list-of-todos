import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';
import { rootReducer, RootState } from './reducers';

export const getingTodos = (state: RootState) => state.todos;
export const getingUser = (state: RootState) => state.user;
export const gettingPagination = (state: RootState) => state.pagination;

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunkMiddleware)),
);

export default store;
