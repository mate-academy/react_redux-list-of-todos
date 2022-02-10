import { Dispatch } from 'react';
import { BASE_URL } from '../../api';
import { UserAction, UserActionTypes } from '../types/user';

export const fetchUser = (userId: number) => {
  return async (dispatch: Dispatch<UserAction>) => {
    try {
      dispatch({ type: UserActionTypes.FETCH_USER });
      const response = await fetch(`${BASE_URL}/users/${String(userId)}`);

      const userFromServer = response.json();

      dispatch({ type: UserActionTypes.FETCH_USER_SUCCESS, payload: await userFromServer });
    } catch (error) {
      dispatch({
        type: UserActionTypes.FETCH_USER_ERROR,
        payload: 'an error occurred while loading user',
      });
    }
  };
};

export const clearUser = (): UserAction => {
  return ({ type: UserActionTypes.CLEAR_USER });
};
