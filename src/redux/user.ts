import { AnyAction } from 'redux';

const SET_USER = 'SET_USER';

export type UserState = {
  currentUserData: User | null,
};

export const actions = {
  setUser: (user: User | null) => ({ type: SET_USER, user }),
};

export const selectors = {
  getUser: (state: UserState) => state.currentUserData,
};

const initialState: UserState = {
  currentUserData: null,
};

const userReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case SET_USER:
      return { ...state, currentUserData: action.user };

    default:
      return state;
  }
};

export default userReducer;
