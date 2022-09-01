import { Dispatch } from 'redux';
import { User } from '../types/User';
import { Maybe } from '../types/Maybe';
import { getUser } from '../api';

enum UserActionTypes {
  user_FETCH_START,
  user_FETCH_SUCCESS,
  user_FETCH_ERROR,
  user_FETCH_FINISH,
  user_UNSELECT,
}

interface FetchStart {
  type: UserActionTypes.user_FETCH_START,
}

interface FetchSuccess {
  type: UserActionTypes.user_FETCH_SUCCESS,
  payload: User,
}

interface FetchError {
  type: UserActionTypes.user_FETCH_ERROR,
  payload: string,
}

interface FetchFinish {
  type: UserActionTypes.user_FETCH_FINISH,
}

interface UserUnselect {
  type: UserActionTypes.user_UNSELECT,
}

type UserAction = (
  FetchStart | FetchSuccess | FetchError | FetchFinish | UserUnselect
);

interface UserState {
  user: Maybe<User>,
  loading: boolean,
  error: Maybe<string>,
}

const initialState: UserState = {
  user: null,
  loading: false,
  error: null,
};

export const actions = {
  startFetch: (): FetchStart => ({ type: UserActionTypes.user_FETCH_START }),
  setUser: (user: User): FetchSuccess => ({
    type: UserActionTypes.user_FETCH_SUCCESS,
    payload: user,
  }),
  setError: (error: string): FetchError => ({
    type: UserActionTypes.user_FETCH_ERROR,
    payload: error,
  }),
  finishFetch: (): FetchFinish => ({ type: UserActionTypes.user_FETCH_FINISH }),
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
