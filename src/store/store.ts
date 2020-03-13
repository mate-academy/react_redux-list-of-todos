import { createStore } from 'redux';
import { initialState, rootReducer } from './rootReducer';

export const store = createStore(
  rootReducer,
  initialState,
);
