import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import userReducer from './user';
import todosReducer from './todos';
import filterReducer from './filter';

const rootReducer = combineReducers({
  todosInfo: todosReducer,
  userInfo: userReducer,
  filter: filterReducer,
});

type RootState = ReturnType<typeof rootReducer>;

export const selectors = {
  getUserInfo: (state: RootState) => state.userInfo,
  getTodosInfo: (state: RootState) => state.todosInfo,
  getFilter: (state: RootState) => state.filter,
};

export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk)),
);
