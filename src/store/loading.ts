import { Action } from 'redux';

const LOADING = 'START_LOADING';

type Loading = Action<typeof LOADING>;

export const loadingAction = (): Loading => ({ type: LOADING });


const loadingReducer = (state = false, action: Loading) => {
  switch (action.type) {
    case LOADING:
      return true;

    default:
      return state;
  }
};

export default loadingReducer;
