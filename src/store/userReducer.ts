import { User } from '../types/User';

type SetUserAction = {
  type: 'user/set'
  payload: User | null
};

export type UserActions = SetUserAction;

export const userReducer = (
  user: User | null = null,
  action: UserActions,
): User | null => {
  switch (action.type) {
    case 'user/set':
      return action.payload;

    default:
      return user;
  }
};

export const actions = {
  setUser: (user: User | null): SetUserAction => ({
    type: 'user/set',
    payload: user,
  }),
};
