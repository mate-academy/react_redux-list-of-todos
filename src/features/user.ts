import { Dispatch } from 'redux';
import { getUser } from '../api';
import { User } from '../types/User';

type SetUserAction = {
  type: 'user/SET',
  payload: User,
};

const setUser = (user: User): SetUserAction => ({
  type: 'user/SET',
  payload: user,
});

type RemoveUserAction = {
  type: 'user/REMOVE',
};

const removeUser = (): RemoveUserAction => ({
  type: 'user/REMOVE',
});

const loadUserByIdFromServer = (userId: number) => {
  return async (dispatch: Dispatch<SetUserAction>) => {
    const user = await getUser(userId);

    dispatch(setUser(user));
  };
};

export const USER_ACTIONS = {
  setUser,
  removeUser,
  loadUserByIdFromServer,
};

type State = User | null;
type Action = SetUserAction | RemoveUserAction;

const userReducer = (
  state: State = null,
  action: Action,
) => {
  switch (action.type) {
    case 'user/SET':
      return action.payload;

    case 'user/REMOVE':
      return null;

    default:
      return state;
  }
};

export default userReducer;
