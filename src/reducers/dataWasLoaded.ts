import { SET_DATA_WAS_LOADED } from '../actions/types';
import { DataWasLoadedAction } from '../constants/types';

export const dataWasLoaded = (state = false, action: DataWasLoadedAction): boolean => {
  switch (action.type) {
    case SET_DATA_WAS_LOADED:
      return true;
    default:
      return state;
  }
};
