import { createStore } from 'redux';

import { reducer, initialState } from './reducer';

const store = createStore(reducer, initialState);

export default store;
