import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import userReducer from '../features/user/userSlice';
import todosReducer from '../features/todos/todosSlice';

const rootReducer = combineReducers({
  todos: todosReducer,
  user: userReducer,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDipatch = AppStore['dispatch'];
