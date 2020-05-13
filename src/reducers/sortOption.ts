import { SET_SORT_OPTION } from '../actions/types';
import { SortOptionAction } from '../constants/types';

export const sortOption = (state = 'default', action: SortOptionAction): string => {
  switch (action.type) {
    case SET_SORT_OPTION:
      return action.payload;
    default:
      return state;
  }
};
