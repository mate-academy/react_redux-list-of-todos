export const SET = 'userId/set';
export const CLEAR = 'userId/clear';

export const actions = {
  [SET]: (id) => ({ type: SET, id }),
  [CLEAR]: () => ({ type: CLEAR }),
}

const userIdReducer = (userId = 0, action) => {
  switch (action.type) {
    case SET:
      return action.id;

    case CLEAR:
      return 0;
  
    default:
      return userId;
  }
}

export default userIdReducer;
