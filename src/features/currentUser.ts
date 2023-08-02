import { User } from '../types/User';

type SetUser = {
  type: 'user/SET',
  payload: User,
};

type RemoveUser = {
  type: 'user/REMOVE',
};

const setUser = (user: User): SetUser => ({ type: 'user/SET', payload: user });
const removeUser = (): RemoveUser => ({ type: 'user/REMOVE' });

type Action = SetUser | RemoveUser;

const currentUserReducer = (state = {}, action: Action) => {
  switch (action.type) {
    case 'user/SET':
      return action.payload;

    case 'user/REMOVE':
      return null;

    default:
      return state;
  }
};

export const actions = { setUser, removeUser };

export default currentUserReducer;
