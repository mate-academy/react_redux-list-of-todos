import { User } from '../types/User';

type SetUser = {
  type: 'user/SET',
  payload: User,
};

type RemoveUser = {
  type: 'user/REMOVE',
};

const setUser = (user: User): SetUser => ({
  type: 'user/SET',
  payload: user,
});

const removeUser = (): RemoveUser => ({
  type: 'user/REMOVE',
});

export const actions = { setUser, removeUser };

type Actions = SetUser | RemoveUser;

const userReducer = (
  state: User | null = null,
  action: Actions,
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
