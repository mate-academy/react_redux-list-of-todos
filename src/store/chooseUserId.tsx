import { AnyAction } from 'redux';

const CHOOSE_USER_ID = 'CHOOSE_USER_ID';

export const chooseUserId = (userId: number) => ({ type: CHOOSE_USER_ID, userId});

const reducer = (userId = 0, action: AnyAction) => {
  switch (action.type) {
    case CHOOSE_USER_ID:
      return action.userId;

    default:
      return userId;
  }
};

export default reducer;
