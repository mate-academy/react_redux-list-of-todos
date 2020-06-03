import { Action } from 'redux';

const LOADING = 'START_LOADING';

type Loading = Action<typeof LOADING> & { status: boolean };

export const loadingAction = (status: boolean): Loading => ({ type: LOADING, status });


const loadingReducer = (state = false, action: Loading) => {
  switch (action.type) {
    case LOADING:
      return action.status;

    default:
      return state;
  }
};

export default loadingReducer;
