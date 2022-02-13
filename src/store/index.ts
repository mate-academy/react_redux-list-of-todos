import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk from 'redux-thunk';
import { todoReducer } from './reducers/todoReducer';
import { userReducer } from './reducers/userReducer';

const rootState = combineReducers({
  user: userReducer,
  todo: todoReducer,
});

export const store = createStore(rootState, applyMiddleware(thunk));
export type RootState = ReturnType<typeof rootState>;
