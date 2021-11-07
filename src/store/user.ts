import { AnyAction } from 'redux';
import { User } from '../types';

const GET_USERS = 'GET_USERS';

export const actions = {
  getUsers: (payload: User[]) => ({ type: GET_USERS, payload }),
};

export type UsersState = {
  users: User[],
};

const usersState: UsersState = {
  users: [],
};

export const usersReducer = (state = usersState, action: AnyAction) => {
  switch (action.type) {
    case GET_USERS:
      return { ...state, users: [...state.users, ...action.payload] };
    default:
      return state;
  }
};
