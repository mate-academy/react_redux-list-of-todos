import { AnyAction } from 'redux';

const SET_LOADED = 'SET_LOADED';

export const setLoaded = () => ({ type: SET_LOADED });

export const getLoaded = (state: RootState) => state.loaded;

export const loadedReducer = (state = { loaded: false }, action: AnyAction) => {
  switch (action.type) {
    case SET_LOADED:
      return { ...state, loaded: true };

    default:
      return state;
  }
}
