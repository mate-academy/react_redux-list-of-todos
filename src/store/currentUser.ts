import { AnyAction } from 'redux';
import { InitialUserStateT, USERTYPE } from '../api/interface';

export const FETCH_USER_PENDING = 'FETCH_USER_PENDING';
export const FETCH_USER_SUCCESS = 'FETCH_USER_SUCCESS';
export const FETCH_USER_ERROR = 'FETCH_USER_ERROR';

export function fetchUserPending() {
  return {
    type: FETCH_USER_PENDING,
  };
}

export function fetchUserSuccess(user: USERTYPE[]) {
  return {
    type: FETCH_USER_SUCCESS,
    user,
  };
}

export function fetchUserError(error: string) {
  return {
    type: FETCH_USER_ERROR,
    error,
  };
}

const initialState: InitialUserStateT = {
  pending: false,
  user: {
    id: 0,
    name: '',
    phone: '',
    email: '',
  },
  error: null,
};

export function userReducer(state: InitialUserStateT = initialState, action: AnyAction) {
  switch (action.type) {
    case FETCH_USER_PENDING:
      return {
        ...state,
        pending: true,
      };
    case FETCH_USER_SUCCESS:
      return {
        ...state,
        pending: false,
        user: action.user,
      };
    case FETCH_USER_ERROR:
      return {
        ...state,
        pending: false,
        error: action.error,
      };
    default:
      return state;
  }
}

export const getUser = (state: InitialUserStateT): USERTYPE => state.user;
export const getUserPending = (state: InitialUserStateT): boolean => state.pending;
export const getUserError = (state: InitialUserStateT): null | string => state.error;
