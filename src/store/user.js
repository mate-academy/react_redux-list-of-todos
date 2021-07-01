import { getUser } from '../scripts/api';

export const CHOOSE = 'user/choose';
export const LOAD = 'user/load';

export const actions = {
  [LOAD]: (id) => (dispatch) => {
    getUser(id)
      .then((user) => {
        dispatch(actions[CHOOSE](user));
      });
  },

  [CHOOSE]: (user) => ({ type: CHOOSE, user }),
}

const userReducer = (user = null, action) => {
  switch (action.type) {
    case CHOOSE:
      return action.user;

    default:
      return user;
  }
}

export default userReducer;
