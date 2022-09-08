import { Maybe } from '../types/Maybe';
import { User } from '../types/User';

type RemoveUserAction = { type: 'currentUser/REMOVE' };

type SetUserAction = {
  type: 'currentUser/SET';
  payload: User;
};

type SetUserIsLoadingAction = {
  type: 'currentUser/setIsLoading';
  payload: boolean;
};

const removeUser = (): RemoveUserAction => ({ type: 'currentUser/REMOVE' });

const setUser = (user: User): SetUserAction => ({
  type: 'currentUser/SET',
  payload: user,
});

const setUserIsLoading = (value: boolean): SetUserIsLoadingAction => ({
  type: 'currentUser/setIsLoading',
  payload: value,
});

export const actions = { setUser, removeUser, setUserIsLoading };

export type StateUser = {
  user: Maybe<User>,
  isLoading: boolean,
};

const initialState = {
  user: null,
  isLoading: false,
};

type ActionCurrentUser = SetUserAction
| RemoveUserAction
| SetUserIsLoadingAction;

export const USER_ACTIONS_CREATOR = {
  setUser,
  removeUser,
  setUserIsLoading,
};

const currentUserReducer = (
  state: StateUser = initialState,
  action: ActionCurrentUser,
): StateUser => {
  switch (action.type) {
    case 'currentUser/SET':
      return {
        ...state,
        user: action.payload,
      };

    case 'currentUser/REMOVE':
      return {
        ...state,
        user: null,
      };

    case 'currentUser/setIsLoading':
      return {
        ...state,
        isLoading: action.payload,
      };

    default:
      return state;
  }
};

export default currentUserReducer;
