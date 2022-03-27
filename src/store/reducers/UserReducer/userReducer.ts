import { UserState, UserAction, UserActionTypes } from './types';

const initialState: UserState = {
  user: null,
  loading: false,
  error: null,
};

export const userReducer = (state = initialState, action: UserAction): UserState => {
  switch (action.type) {
    case UserActionTypes.FETCH_USER:
      return {
        ...state,
        loading: true,
      };

    case UserActionTypes.FETCH_USER_SUCCESS:
      return {
        ...state,
        user: action.payload,
        loading: false,
      };

    case UserActionTypes.FETCH_USER_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case UserActionTypes.RESET_USER:
      return {
        ...state,
        user: null,
      };

    default:
      return state;
  }
};
