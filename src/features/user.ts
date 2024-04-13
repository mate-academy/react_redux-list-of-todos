import { User } from '../types/User';

type AddUserAction = {
  type: 'user/ADD';
  payload: User | null;
};

const addUser = (user: User): AddUserAction => ({
  type: 'user/ADD',
  payload: user,
});

type Action = AddUserAction;

const userReducer = (
  // eslint-disable-next-line @typescript-eslint/default-param-last
  state: User | null = null,
  action: Action,
): User | null => {
  switch (action.type) {
    case 'user/ADD': {
      if (action.payload) {
        return action.payload;
      }

      return state;
    }

    default:
      return state;
  }
};

export const userActions = { addUser };
export default userReducer;
