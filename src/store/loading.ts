import { AnyAction } from 'redux';

const START_LOAD = 'START_LOAD';

export const setLoading = (status: boolean) => ({ type: START_LOAD, status });

export const loadReducer = (state = false, action: AnyAction) => {
  switch (action.type) {
    case START_LOAD:
      return !state;

    default:
      return state;
  }
}
