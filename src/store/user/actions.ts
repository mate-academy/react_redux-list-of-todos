import { User } from '../../react-app-env';

export const LOAD_USER = 'LOAD_USER';
export const CLEAR_USER = 'CLEAR_USER';

export const loadUser = (user: User) => ({
  type: LOAD_USER, user,
});

export const clearUser = () => ({ type: LOAD_USER });
