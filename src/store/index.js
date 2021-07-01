import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import todosReducer from './todos'
import userIdReducer from './userId'
import titleFilterReducer from './titleFilter';
import todosFilteringReducer from './todosFiltering';
import randomizeReducer from './randomize';
import userReducer from './user';

export const getTodos = (state) => state.todos;
export const getUserId = (state) => state.userId;
export const getTitleFilter = (state) => state.titleFilter;
export const getTodosFiltering = (state) => state.todosFiltering;
export const getRandomOrder = (state) => state.randomOrder;
export const getUser = (state) => state.user;

const initialState = {
  todos: [],
  userId: 0,
  titleFilter: '',
  todosFiltering: 'all',
  randomOrder: false,
  user: null,
};

const reducer = combineReducers({
  todos: todosReducer,
  userId: userIdReducer,
  titleFilter: titleFilterReducer,
  todosFiltering: todosFilteringReducer,
  randomOrder: randomizeReducer,
  user: userReducer,
});

const store = createStore(reducer, initialState, composeWithDevTools(
  applyMiddleware(thunk)
));

export default store;
