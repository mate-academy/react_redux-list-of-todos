import { createStore } from 'redux';
import { rootReducer } from './reducers/reducer';

export const store = createStore(rootReducer);
