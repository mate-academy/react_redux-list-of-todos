import { AnyAction } from 'redux';
import { User } from '../types/User';

const SET_USER = 'SET_USER';

export type UserState = {
  userData: User | null
};

export const actions = {
  setUser: (user: User | null) => ({ type: SET_USER, user }),
};

export const selectors = {
  getUser: (state: UserState) => state.userData,
};

const initialState: UserState = {
  userData: null,
};

const userReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        userData: action.user,
      };

    default:
      return state;
  }
};

export default userReducer;
