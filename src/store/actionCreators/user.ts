import { ThunkAction } from 'redux-thunk';
import { getUser } from '../../api';
import { RootState } from '../store';
import {
  FETCH_USER_REQUEST,
  FETCH_USER_SUCCESS,
  FETCH_USER_FAILURE,
} from '../actionTypes/user';
import { User } from '../../types/User';

type FetchUserRequestAction = {
  type: 'FETCH_USER_REQUEST';
};

type FetchUserSuccessAction = {
  type: 'FETCH_USER_SUCCESS';
  payload: User;
};

type FetchUserFailureAction = {
  type: 'FETCH_USER_FAILURE';
  payload: string;
};

/* eslint-disable-next-line */
type Action = FetchUserRequestAction | FetchUserSuccessAction | FetchUserFailureAction;

export const fetchUserRequest = (): FetchUserRequestAction => ({
  type: FETCH_USER_REQUEST,
});

export const fetchUserSuccess = (user: User): FetchUserSuccessAction => ({
  type: FETCH_USER_SUCCESS,
  payload: user,
});

export const fetchUserFailure = (error: string): FetchUserFailureAction => ({
  type: FETCH_USER_FAILURE,
  payload: error,
});

/* eslint-disable-next-line */
export const fetchUserAsync = (id: number): ThunkAction<void, RootState, unknown, Action> =>
  async dispatch => {
    try {
      dispatch(fetchUserRequest());
      const data = await getUser(id);

      dispatch(fetchUserSuccess(data));
    } catch (error: any) {
      dispatch(fetchUserFailure(error.message));
    }
  };
