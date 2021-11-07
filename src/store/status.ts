import { AnyAction } from 'redux';

const SET_STATUS = 'SET_STATUS';
// const SET_ALL = 'SET_ALL';
// const SET_COMPLETED = 'SET_DONE';
// const SET_ACTIVE = 'SET_IN_PROGRES';

export const actions = {
  setStatus: (payload: string) => ({ type: SET_STATUS, payload }),
  // setAll: () => ({ type: SET_ALL, payload: 'all' }),
  // setCompleated: () => ({ type: SET_COMPLETED, payload: 'completed' }),
  // setActive: () => ({ type: SET_ACTIVE, payload: 'active' }),
};

export type StatusState = {
  status: string,
};

const statusState: StatusState = {
  status: 'All',
};

export const statusReducer = (state = statusState, action: AnyAction) => {
  switch (action.type) {
    case SET_STATUS:
      return { ...state, status: action.payload };
    default:
      return state;
  }
};
