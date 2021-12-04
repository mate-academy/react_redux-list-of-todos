import { AnyAction } from 'redux';

// action type
const SET_USER = 'SET_USER';

// action creator
export const actions = {
  setUser: (payload: User | null) => ({ type: SET_USER, payload }),
};

// initial state
export type SelectedUserState = {
  selectedUser: User | null,
};

const selectedUserState: SelectedUserState = {
  selectedUser: null,
};

// reducer
export const selectedUserReducer = (state = selectedUserState, action: AnyAction) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        selectedUser: action.payload,
      };
    default:
      return state;
  }
};
