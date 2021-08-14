import { AnyAction } from 'redux';
import { RootState } from '../types';

// Action types
const SET_LOADING = 'SET_LOADING';

// Action creators
export const setLoading = (loading: boolean) => ({ type: SET_LOADING, value: loading });

// Selectors
export const isLoading = (state: RootState) => state.loading;

export const loadingReducer = (loading = false, action: AnyAction) => {
  switch (action.type) {
    case SET_LOADING:
      return action.value;

    default:
      return loading;
  }
};
