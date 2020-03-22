import { createStore } from 'redux';
import { rootReducer, initialState } from './rootReducer';

export const store = createStore(rootReducer, initialState);
