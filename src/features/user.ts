import { User } from '../types/User';

type SetUserAction = { type: 'user/SET', payload: User };
type RemoveUserAction = { type: 'user/REMOVE' };

type State = User | null;
type Action = SetUserAction | RemoveUserAction;

const setUser = (user: User) => ({ type: 'user/SET', payload: user });
const removeUser = () => ({ type: 'user/REMOVE' });

export const actions = { setUser, removeUser };

const userReducer = (state: State = null, action: Action): State => {
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
