const defaultState = {
  user: null,
};

export const SHOW_USER_INFO = 'SHOW_USER_INFO';

export const userInfoReducer = (state = defaultState, action) => {
  switch (action.type) {
    case SHOW_USER_INFO:
      return {
        ...state, user: action.payload,
      };

    default:
      return state;
  }
};
