import { User } from '../types/User';

type State = User | null;

type SetAction = {
  type: 'currentUser/SET';
  payload: User;
};

type RemoveAction = {
  type: 'currentUser/REMOVE';
};

type Action = SetAction | RemoveAction;

const setUser = (user: User): SetAction => ({
  type: 'currentUser/SET',
  payload: user,
});

const removeUser = (): RemoveAction => ({
  type: 'currentUser/REMOVE',
});

export const actions = { setUser, removeUser };

export const currentUserReducer = (
  user: State = null,
  action: Action,
): State => {
  switch (action.type) {
    case 'currentUser/SET':
      return {
        ...action.payload,
      };

    case 'currentUser/REMOVE':
      return null;

    default:
      return user;
  }
};
