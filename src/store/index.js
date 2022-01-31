import { applyMiddleware, combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { todosReducer } from './todosReducer';
import { userInfoReducer } from './userInfoReducer';

const rootReducer = combineReducers({
  todosReducer,
  userInfoReducer,
});

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;
