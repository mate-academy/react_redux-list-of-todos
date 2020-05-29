import { AnyAction } from 'redux';

const SET_LOADED = 'SET_LOADED';

export const setLoaded = () => ({ type: SET_LOADED });

const loadedReducer = (state = false, action: AnyAction) => {
  switch (action.type) {
    case SET_LOADED:
      return true;

    default:
      return state;
  }
}

export default loadedReducer;
