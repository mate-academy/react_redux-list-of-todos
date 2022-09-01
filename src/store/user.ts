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
    type: UserActionTypes.user_FETCH_START,
  }),
  setUser: (user: User): UserFetchSuccess => ({
    type: UserActionTypes.user_FETCH_SUCCESS,
    payload: user,
  }),
  setError: (error: string): UserFetchError => ({
    type: UserActionTypes.user_FETCH_ERROR,
    payload: error,
  }),
  finishFetch: (): UserFetchFinish => ({
    type: UserActionTypes.user_FETCH_FINISH,
  }),
  userUnselect: (): UserUnselect => ({ type: UserActionTypes.user_UNSELECT }),
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
    case UserActionTypes.user_FETCH_START:
      return {
        ...state,
        loading: true,
      };
    case UserActionTypes.user_FETCH_SUCCESS:
      return {
        ...state,
        user: action.payload,
      };
    case UserActionTypes.user_FETCH_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    case UserActionTypes.user_FETCH_FINISH:
      return {
        ...state,
        loading: false,
      };
    case UserActionTypes.user_UNSELECT:
      return {
        ...state,
        user: null,
      };
    default:
      return state;
  }
};

export default userReducer;
