import { AnyAction, Dispatch } from 'redux';
import { User } from '../types/user';
import { API } from '../utils/api';

const SET_USER = 'SET_USER';
const CLEAR_USER = 'CLEAR_USER';

export type InitialSelectedUser = {
  user: User | null
};

export const actions = {
  setUser: (payload: User | null) => ({ type: SET_USER, payload }),
  fetchUser(userId: number) {
    return async (dispatch: Dispatch) => {
      try {
        const user = await API.getUserInfo(userId);

        dispatch(this.setUser(user));
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log(error);
      }
    };
  },
  clearUser: () => ({ type: CLEAR_USER }),
};

const initialState: InitialSelectedUser = {
  user: null,
};

const selectedUser = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        user: action.payload,
      };

    case CLEAR_USER:
      return {
        ...state,
        user: null,
      };

    default:
      return state;
  }
};

export default selectedUser;
