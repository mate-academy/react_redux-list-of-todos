import { AnyAction } from 'redux';

const USER_ID = 'USER_ID';

export const getUserId = (userId: number) => ({
  type: USER_ID, userId
});

const reducer = (userId = 0, action: AnyAction) => {
  switch (action.type) {
    case USER_ID:
      return action.userId;

    default:
      return userId;
  }
};

export default reducer;
