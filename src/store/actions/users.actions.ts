import { User } from '../../types/user.type';
import { ActionTypes, AddUserAction } from '../types';

export const addUserAction = (payload: User | null): AddUserAction => ({
  type: ActionTypes.AddUser,
  payload,
});
