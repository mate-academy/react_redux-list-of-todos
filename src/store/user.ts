import { AnyAction, Dispatch } from 'redux';
import { getUser } from '../api';
import { State, User } from '../react-app-env';

enum ActionTypes {
  SetUser = 'user/set',
}

const initState: User = {
  id: 0,
  name: '',
  username: '',
  email: '',
  phone: '',
  website: '',
};

export const userActions = {
  setUser: (user: User): AnyAction => ({
    type: ActionTypes.SetUser,
    value: user,
  }),

  loadUser: (userId: number) => async (dispatch: Dispatch<AnyAction>) => {
    try {
      const user = await getUser(userId);

      dispatch(userActions.setUser(user));
    } catch {
      dispatch(userActions.clearUser());
    }
  },

  clearUser: (): AnyAction => userActions.setUser(initState),
};

export const userSelectors = {
  getUser: (state: State): User => state.user,
  getUserId: (state: State): number => state.user.id,
};

export const userReducer = (state: User = initState, action: AnyAction) => {
  switch (action.type) {
    case ActionTypes.SetUser:
      return { ...action.value };
    default:
      return state;
  }
};
