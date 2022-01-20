import { SELECT_USER_TODO } from './types';
import { User } from '../Types/User';

const initialState = {
  user: {} as User,
};

export const userReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case SELECT_USER_TODO:
      return {
        ...state,
        user: action.data,
      };

    default:
      return state;
  }
};
