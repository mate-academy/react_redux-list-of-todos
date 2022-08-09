import { UserAction, UserActionTypes, UserState } from '../../types/User';

const initialState: UserState = {
  user: null,
  loading: false,
  error: null,
};

export const userReducer = (
  state = initialState,
  action: UserAction,
) : UserState => {
  switch (action.type) {
    case UserActionTypes.FETCH_USER:
      return {
        user: null,
        loading: true,
        error: null,
      };
    case UserActionTypes.FETCH_USER_SUCCESS:
      return {
        user: action.payload,
        loading: false,
        error: null,
      };
    case UserActionTypes.FETCH_USER_ERROR:
      return {
        user: null,
        loading: false,
        error: action.payload,
      };
    case UserActionTypes.SET_USER_NULL:
      return {
        ...state,
        user: null,
      };
    default:
      return state;
  }
};
