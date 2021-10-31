import { AnyAction } from 'redux';
import { Dispatch } from 'react';

const CHANGE_USER = 'CHANGE_USER';
const CLEAR_USER = 'CLEAR_USER';

type SelectedUser = {
  selectedUserId: number;
};

const changeUserId = (id: number) => ({ type: CHANGE_USER, payload: id });
const clearUserId = () => ({ type: CLEAR_USER });

export const changeUser = (id: number) => {
  return (dispatch: Dispatch<{ type: string, payload: number }>) => dispatch(changeUserId(id));
};

export const clearUser = () => {
  return (dispatch: Dispatch<{ type: string }>) => dispatch(clearUserId());
};

const initialState: SelectedUser = {
  selectedUserId: 0,
};

const selectedUserReducer = (state = initialState.selectedUserId, action: AnyAction) => {
  switch (action.type) {
    case CHANGE_USER:
      return action.payload;
    case CLEAR_USER:
      return 0;
    default:
      return state;
  }
};

export default selectedUserReducer;
