/* eslint-disable no-console */
// import { getData } from '../../data/api';
import { getUsers } from '../../data/users.api';
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
