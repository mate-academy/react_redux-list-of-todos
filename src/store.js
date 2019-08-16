import { createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import reducer from './reducers/reducer';

const configureStore = preloadedState => (
  createStore(
    reducer,
    preloadedState,
    composeWithDevTools(),
  )
);

const store = configureStore({});

export default store;
