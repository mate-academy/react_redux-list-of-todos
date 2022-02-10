import { applyMiddleware, combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { todosReducer } from './reducers/todosReducer';
import { userReducer } from './reducers/userReducer';

export const rootReducer = combineReducers({
  todos: todosReducer,
  user: userReducer,
});

export type RootSate = ReturnType<typeof rootReducer>;

export const store = createStore(rootReducer,
  composeWithDevTools(applyMiddleware(thunk)));
