import { Dispatch } from 'redux';
import {
  UserFetchError, UserFetchFinish, UserFetchStart, UserFetchSuccess,
  User, UserAction, UserActionTypes, UserState, UserUnselect,
} from '../types/User';
import { getUser } from '../api';

const initialState: UserState = {
  user: null,
  loading: false,
  error: null,
};

export const actions = {
  startFetch: (): UserFetchStart => ({
    type: UserActionTypes.UserFetchStart,
  }),
  setUser: (user: User): UserFetchSuccess => ({
    type: UserActionTypes.UserFetchSuccess,
    payload: user,
  }),
  setError: (error: string): UserFetchError => ({
    type: UserActionTypes.UserFetchError,
    payload: error,
  }),
  finishFetch: (): UserFetchFinish => ({
    type: UserActionTypes.UserFetchFinish,
  }),
  userUnselect: (): UserUnselect => ({ type: UserActionTypes.UserUnselect }),
};

export const fetchUser = (userId: number) => {
  return (dispatch: Dispatch<UserAction>) => {
    dispatch(actions.startFetch());

    getUser(userId)
      .then(userFromServer => dispatch(actions.setUser(userFromServer)))
      .catch(err => dispatch(actions.setError(err)))
      .finally(() => dispatch(actions.finishFetch()));
  };
};

const userReducer = (
  state = initialState,
  action: UserAction,
) : UserState => {
  switch (action.type) {
    case UserActionTypes.UserFetchStart:
      return {
        ...state,
        loading: true,
      };
    case UserActionTypes.UserFetchSuccess:
      return {
        ...state,
        user: action.payload,
      };
    case UserActionTypes.UserFetchError:
      return {
        ...state,
        error: action.payload,
      };
    case UserActionTypes.UserFetchFinish:
      return {
        ...state,
        loading: false,
      };
    case UserActionTypes.UserUnselect:
      return {
        ...state,
        user: null,
      };
    default:
      return state;
  }
};

export default userReducer;
