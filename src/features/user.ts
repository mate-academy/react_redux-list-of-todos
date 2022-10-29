import { User } from '../types/User';

type SetUser = {
  type: 'user/SET';
  payload: User;
};

const setUser = (user: User): SetUser => ({
  type: 'user/SET',
  payload: user,
});

type RemoveUser = {
  type: 'user/REMOVE';
};

const removeUser = (): RemoveUser => ({
  type: 'user/REMOVE',
});

export const actions = { setUser, removeUser };

type State = User | null;
type Action = SetUser | RemoveUser;

export const userReducer = (
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
