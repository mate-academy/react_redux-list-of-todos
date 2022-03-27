import { Dispatch } from 'redux';
import { getUser } from '../../api';

import { UserActionTypes, UserAction } from '../reducers/UserReducer/types';

export const fetchUser = (id: number) => {
  return async (dispatch: Dispatch<UserAction>) => {
    try {
      dispatch({ type: UserActionTypes.FETCH_USER });
      const response = await getUser(id);

      dispatch({ type: UserActionTypes.FETCH_USER_SUCCESS, payload: response });
    } catch (error) {
      dispatch({ type: UserActionTypes.FETCH_USER_ERROR, payload: 'Error fetching user' });
    }
  };
};
