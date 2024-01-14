import { User } from '../types/User';

const setUser = (user: User) => ({
  type: 'SET_USER' as const,
  payload: user,
});

interface UserState {
  user: User | null;
}

type TypeActionsUser = {
  type: 'SET_USER';
  payload: User | null;
};

const initialState: UserState = {
  user: null,
};

export const actions = { setUser };

const userReducer = (state = initialState, action: TypeActionsUser) => {
  switch (action.type) {
    case 'SET_USER':
      return {
        ...state,
        user: action.payload,
      };
    default:
      return state;
  }
};

export default userReducer;
