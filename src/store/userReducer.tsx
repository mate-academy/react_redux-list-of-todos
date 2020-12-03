import { AnyAction } from 'redux';
import { User } from '../components/interfaces';

const SET_USER = 'SET_USER';

export const setUser = (user: User) => ({ type: SET_USER, user});

const reducer = (user = null, action: AnyAction) => {
  switch (action.type) {
    case SET_USER:
      return action.user;

    default:
      return user;
  }
};

export default reducer;
