import { createStore } from 'redux';
import { initialState, reduser } from './reduser';

export const store = createStore(
  reduser,
  initialState,
);
