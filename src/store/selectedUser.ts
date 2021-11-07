import { AnyAction } from 'redux';
import { User } from '../types';

const SET_USER = 'SET_USER';

export const actions = {
  setUser: (payload: User | null) => ({ type: SET_USER, payload }),
};

export type SelectedUserState = {
  selectedUser: User | null,
};

const selectedUserState: SelectedUserState = {
  selectedUser: null,
};

export const selectedUserReducer = (state = selectedUserState, action: AnyAction) => {
  switch (action.type) {
    case SET_USER:
      return { ...state, selectedUser: action.payload };
    default:
      return state;
  }
};
