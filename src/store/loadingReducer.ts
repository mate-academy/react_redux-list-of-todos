import {
  LoadingAction,
  LoadingReducerActionTypes,
} from '../types/LoadingReducerActionTypes';

export const actions = {
  // eslint-disable-next-line max-len
  startLoading: () => ({ type: LoadingReducerActionTypes.START_LOADING }),
  // eslint-disable-next-line max-len
  finishLoading: () => ({ type: LoadingReducerActionTypes.FINISH_LOADING }),
};

export const selectors = {
  getLoading: (loading: boolean) => loading,
};

const initialState = false;

const loadingReducer = (
  state = initialState,
  action: LoadingAction,
): boolean => {
  switch (action.type) {
    case LoadingReducerActionTypes.START_LOADING:
      return true;

    case LoadingReducerActionTypes.FINISH_LOADING:
      return false;

    default:
      return state;
  }
};

export default loadingReducer;
