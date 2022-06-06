import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { reducer } from './reducer';

const rootReducer = combineReducers({
  reducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export const store = configureStore({
  reducer: rootReducer,
});
