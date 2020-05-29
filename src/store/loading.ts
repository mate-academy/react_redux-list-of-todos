import { AnyAction } from 'redux';

const LOAD_PROCESS = 'LOAD_PROCESS';

export const loadProcess = (status: boolean) => ({ type: LOAD_PROCESS, status });

const loadingReducer = (state: boolean, action: AnyAction) => {
  switch (action.type) {
    case LOAD_PROCESS:
      return !state;

    default:
      return state;
  }
}

export default loadingReducer;
