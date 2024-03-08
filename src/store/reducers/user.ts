import { User } from '../../types/User';
import {
  FETCH_USER_FAILURE,
  FETCH_USER_REQUEST,
  FETCH_USER_SUCCESS,
  USER_REMOVE,
} from '../actionTypes/user';

interface UserState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  user: null,
  loading: false,
  error: null,
};

type UserRemoveAction = {
  type: 'USER_REMOVE';
};

export const removeUser = (): UserRemoveAction => ({
  type: 'USER_REMOVE',
});

const userReducer = (state = initialState, action: any): UserState => {
  switch (action.type) {
    case FETCH_USER_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload,
      };
    case FETCH_USER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case USER_REMOVE:
      return {
        user: null,
        loading: false,
        error: null,
      };
    default:
      return state;
  }
};

export default userReducer;
