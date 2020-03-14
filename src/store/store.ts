import { createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { initialState, rootReducer } from './rootReducer';

export const store = createStore(rootReducer, initialState, composeWithDevTools());
