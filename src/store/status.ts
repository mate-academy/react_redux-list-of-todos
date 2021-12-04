import { AnyAction } from 'redux';

// action type
const SET_STATUS = 'SET_STATUS';

// action creator
export const actions = {
  setStatus: (payload: string) => ({ type: SET_STATUS, payload }),
};

// initial state
export type StatusState = {
  status: string,
};

const statusState: StatusState = {
  status: 'All',
};

// reducer
export const statusReducer = (state = statusState, action: AnyAction) => {
  switch (action.type) {
    case SET_STATUS:
      return {
        ...state,
        status: action.payload,
      };
    default:
      return state;
  }
};
