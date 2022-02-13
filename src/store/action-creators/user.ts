import { Dispatch } from 'react';
import {
  LoadUserAction,
  LoadUserErrorAction,
  LoadUserSuccessAction,
  SetUserIdAction,
  UserAction,
  UserActionTypes,
} from '../types/user';
import { getUser } from '../../api/api';

export const loadUserStart = (): LoadUserAction => ({ type: UserActionTypes.LOAD_USER });

export const loadUserSuccess = (user: User): LoadUserSuccessAction => (
  { type: UserActionTypes.LOAD_USER_SUCCESS, payload: user }
);

export const loadUserError = (error: string): LoadUserErrorAction => (
  { type: UserActionTypes.LOAD_USER_ERROR, payload: error }
);

export const setUserId = (userId: number): SetUserIdAction => (
  { type: UserActionTypes.SET_USER_ID, payload: userId }
);

export const loadUser = (userId: number) => {
  return async (dispatch: Dispatch<UserAction>) => {
    try {
      dispatch(loadUserStart());
      const user = await getUser(userId);

      dispatch(loadUserSuccess(user));
    } catch (error) {
      dispatch(loadUserError('User not found('));
    }
  };
};
