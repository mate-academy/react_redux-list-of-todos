import {
  applyMiddleware,
  createStore,
  combineReducers,
} from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import todoReducer, {
  actions as todoActions,

} from './currentTodo';

import loadingReducer, {
  actions as loadingActions,
  selectorsLoading,
} from './loading';

export const actions = { todoActions, loadingActions };

export const selectors = {
  selectorsLoading,
};

const reducer = combineReducers({
  todoReducer,
  loadingReducer,
});

export const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(thunk)),
);
