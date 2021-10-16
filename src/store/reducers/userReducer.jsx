import { SELECT_USER, CLEAR_USER_ID, USER_PROFILE } from '../types';

const initialState = {
  selectedUser: 0,
  user: null,
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SELECT_USER:
      return {
        ...state,
        selectedUser: action.payload,
      };

    case CLEAR_USER_ID:
      return {
        ...state,
        selectedUser: 0,
        user: null,
      };

    case USER_PROFILE:
      return {
        ...state,
        user: action.payload,
      };

    default:
      return state;
  }
};
