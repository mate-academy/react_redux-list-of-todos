import { User } from '../Types/User';

type RootState = User | null;

type SetUser = {
  type: 'user/SetUser',
  payload: User,
};

type RemoveUser = {
  type: 'user/RemoveUser',
};

type Action = SetUser | RemoveUser;

export const userActions = {
  SetUser: (user: User) => ({ type: 'user/SetUser', payload: user }),
  RemoveUser: () => ({ type: 'user/RemoveUser' }),
};

const userReducer = (state:RootState = null, action: Action): RootState => {
  switch (action.type) {
    case 'user/SetUser':
      return action.payload;

    case 'user/RemoveUser':
      return null;

    default:
      return state;
  }
};

export default userReducer;
