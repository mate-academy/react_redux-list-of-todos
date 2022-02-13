import { UserAction, UserActionTypes, UserState } from '../types/user';

const initialState: UserState = {
  user: null,
  hasError: null,
  isLoading: false,
  userId: 0,
};

export const userReducer = (state = initialState, action: UserAction): UserState => {
  switch (action.type) {
    case UserActionTypes.LOAD_USER:
      return {
        ...state,
        isLoading: true,
        hasError: null,
        user: null,
      };
    case UserActionTypes.LOAD_USER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        hasError: null,
        user: action.payload,
      };
    case UserActionTypes.LOAD_USER_ERROR:
      return {
        ...state,
        isLoading: false,
        hasError: action.payload,
        user: null,
      };
    case UserActionTypes.SET_USER_ID:
      return {
        ...state,
        userId: action.payload,
      };
    default:
      return state;
  }
};
