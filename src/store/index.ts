import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { filterReduser } from './filter';
import { todosReducer } from './todos';
import { userReducer } from './user';

const reducer = combineReducers({
  todos: todosReducer,
  user: userReducer,
  filter: filterReduser,
});

const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(thunk)),
);

export default store;
