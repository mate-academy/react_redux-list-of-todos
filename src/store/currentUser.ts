import { AnyAction } from 'redux';
import { InitialUserStateT, USERTYPE } from '../api/interface';

export const FETCH_USER_PENDING = 'FETCH_USER_PENDING';
export const FETCH_USER_SUCCESS = 'FETCH_USER_SUCCESS';
export const FETCH_USER_ERROR = 'FETCH_USER_ERROR';
export const SELECTED_USER = 'SELECTED_USER';
export const CLEAR_SELECTED_USER = 'CLEAR_SELECTED_USER';

export function setLoading() {
  return {
    type: FETCH_USER_PENDING,
  };
}

export function setUser(user: USERTYPE[]) {
  return {
    type: FETCH_USER_SUCCESS,
    user,
  };
}

export function setUserError(error: string) {
  return {
    type: FETCH_USER_ERROR,
    error,
  };
}

export function selectedUser(userId: number) {
  return {
    type: SELECTED_USER,
    userId,
  };
}

export function clearSelectedUser() {
  return {
    type: CLEAR_SELECTED_USER,
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
  selectedUserId: 0,
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
    case SELECTED_USER:
      return {
        ...state,
        selectedUserId: action.userId,
      };
    case CLEAR_SELECTED_USER:
      return {
        ...state,
        selectedUserId: 0,
      };
    default:
      return state;
  }
}

export const getUserId = (state: InitialUserStateT): number => state.selectedUserId;
export const getUser = (state: InitialUserStateT): USERTYPE => state.user;
export const getUserPending = (state: InitialUserStateT): boolean => state.pending;
export const getUserError = (state: InitialUserStateT): null | string => state.error;
