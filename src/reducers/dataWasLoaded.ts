import { Action } from 'redux';

import { SET_DATA_WAS_LOADED } from '../actions/types';

export const dataWasLoaded = (state = false, action: Action): boolean => {
  switch (action.type) {
    case SET_DATA_WAS_LOADED:
      return true;
    default:
      return state;
  }
};
