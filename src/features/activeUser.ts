import { User } from '../types/User';

type AddUser = { type: 'userActive/ADD', user: User };
type RemoveUser = { type : 'userActive/REMOVE' };

const addUser = (user: User): AddUser => ({ type: 'userActive/ADD', user });
const removeUser = (): RemoveUser => ({ type: 'userActive/REMOVE' });

export const actions = { addUser, removeUser };

type Actions = AddUser | RemoveUser;
type State = User | null;

export const userActiveReducer = (state: State = null, payload: Actions) => {
  switch (payload.type) {
    case 'userActive/ADD':
      return payload.user;

    case 'userActive/REMOVE':
      return null;

    default:
      return state;
  }
};

export default userActiveReducer;
