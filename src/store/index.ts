import { createStore, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import { LoadingReducer } from './LoadingReducer';
import { TodosReducer } from './TodosReducer';

const rootReducer = combineReducers({
  TodosReducer,
  LoadingReducer,
});

export const store = createStore(
  rootReducer,
  composeWithDevTools(),
);
