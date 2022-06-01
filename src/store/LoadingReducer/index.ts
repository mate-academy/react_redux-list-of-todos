import { AnyAction } from 'redux';

import {
  START_LOADING,
  FINISH_LOADING,
} from './actions';

const initialState = {
  loading: false,
  message: '',
};

export const LoadingReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case START_LOADING:
      return { ...state, loading: true };

    case FINISH_LOADING:
      return {
        ...state,
        loading: false,
        message: action.message,
      };

    default:
      return state;
  }
};
