import { AnyAction } from 'redux';

const FINISH_LOAD = 'FINISH_LOAD';

export const setLoaded = (status: boolean) => ({ type: FINISH_LOAD, status });

export const loadedReducer = (state = false, action: AnyAction) => {
  switch (action.type) {
    case FINISH_LOAD:
      return !state;

    default:
      return state;
  }
}
