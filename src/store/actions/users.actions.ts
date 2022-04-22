import { getUsers } from '../../data/users.api';
import { User } from '../../types/user.type';
import { ActionTypes, AddAllUsersAction } from '../types';

const addAllUsers = (payload: User[]): AddAllUsersAction => ({
  type: ActionTypes.AddAllUsers,
  payload,
});

export const loadUsers = () => async (
  dispatch: (arg0: { type: string; payload: User[]; }) => void,
) => {
  const users = await getUsers();

  const addUserAction = addAllUsers(users);

  dispatch(addUserAction);
};
