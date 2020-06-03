import { Action } from 'redux';

const LOADED = 'LOADED';

type Loaded = Action<typeof LOADED>;

export const loadedAction= (): Loaded => ({ type: LOADED });

const loadedReducer = (state = false, action: Loaded) => {
  switch (action.type) {
    case LOADED:
      return true;

    default:
      return state;
  }
};

export default loadedReducer;
