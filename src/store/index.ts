import {
  createStore,
  combineReducers,
} from 'redux';

import todoReducer, {
  actions as todoActions,

} from './currentTodo';

import loadingReducer, {
  actions as loadingActions,
  selectors as selectorsLoading,
} from './loading';

export const actions = { todoActions, loadingActions };

export const selectors = {
  getLoading: (state: { loading: boolean }) => (
    selectorsLoading.isLoading(state.loading)
  ),
};

const reducer = combineReducers({
  todo: todoReducer,
  loading: loadingReducer,
});

export const store = createStore(reducer);
