import { AnyAction } from 'redux';

// action type
const GET_USERS = 'GET_USERS';

// action creator
export const actions = {
  getUsers: (payload: User[]) => ({ type: GET_USERS, payload }),
};

// initial state
export type UsersState = {
  users: User[],
};

const usersState: UsersState = {
  users: [],
};

// reducer
export const usersReducer = (state = usersState, action: AnyAction) => {
  switch (action.type) {
    case GET_USERS:
      return {
        ...state,
        users: [...state.users, ...action.payload],
      };
    default:
      return state;
  }
};
