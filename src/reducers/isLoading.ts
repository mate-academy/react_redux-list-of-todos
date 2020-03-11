import { SET_IS_LOADING } from '../actions/types';
import { IsLoadingAction } from '../constants/types';

export const isLoading = (state = false, action: IsLoadingAction): boolean => {
  switch (action.type) {
    case SET_IS_LOADING:
      return action.payload;
    default:
      return state;
  }
};
