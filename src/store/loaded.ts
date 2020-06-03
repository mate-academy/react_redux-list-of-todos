import { Action } from 'redux';

const LOADED = 'LOADED';

type Loaded = Action<typeof LOADED> & { status: boolean };

export const loadedAction= (status: boolean): Loaded => ({ type: LOADED, status });

const loadedReducer = (state = false, action: Loaded) => {
  switch (action.type) {
    case LOADED:
      return action.status;

    default:
      return state;
  }
};

export default loadedReducer;
