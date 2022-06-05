import { Dispatch, AnyAction } from 'redux';
import { User } from '../type/user';
import { getUserFS } from '../api';

enum UserAction {
  UpladUser = 'Upload::User',
  ClearUser = 'Clear::User',
  SetUserError = 'Set::UserError',
}

export const userAction = {
  uploadUser: (user: User) => (
    { type: UserAction.UpladUser, payload: user }
  ),
  clearUser: () => (
    { type: UserAction.ClearUser }
  ),
  SetUserError: (isError: boolean) => (
    { type: UserAction.SetUserError, payload: isError }
  ),
};

export const uploadUser = (userId: number) => {
  return async (dispatch: Dispatch) => {
    try {
      const data = await getUserFS(userId);

      dispatch(userAction.SetUserError(false));
      dispatch(userAction.uploadUser(data));
    } catch (error) {
      dispatch(userAction.clearUser());
      dispatch(userAction.SetUserError(true));
    }
  };
};

interface UserState {
  user: User | null;
  messageError: boolean;
}

export interface State {
  user: User | null;
  messageError: boolean;
}

const initialState: UserState = {
  user: null,
  messageError: false,
};

export const userReducer = (
  state: State = initialState,
  action: AnyAction,
) => {
  switch (action.type) {
    case UserAction.UpladUser:
      return { ...state, user: action.payload };

    case UserAction.ClearUser:
      return { ...state, user: null };

    case UserAction.SetUserError:
      return { ...state, messageError: action.payload };

    default:
      return state;
  }
};
