import { createStore, AnyAction } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import {
  SET_TODOS,
  TOGGLE_HAS_USER_LOADING_ERROR,
  TOGGLE_USER_LOADER_VISIBILITY,
  SET_USER,
} from './actions';

const initialState: RootState = {
  todos: [],
  isUserLoading: false,
  user: null,
  hasUserLoadingError: false,
};

const rootReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case SET_TODOS:
      return {
        ...state,
        todos: action.payload,
      };

    case TOGGLE_USER_LOADER_VISIBILITY:
      return {
        ...state,
        isUserLoading: !state.isUserLoading,
      };

    case SET_USER:
      return {
        ...state,
        user: action.payload,
      };

    case TOGGLE_HAS_USER_LOADING_ERROR:
      return {
        ...state,
        hasUserLoadingError: !state.hasUserLoadingError,
      };

    default:
      return state;
  }
};

const store = createStore(
  rootReducer,
  composeWithDevTools(),
);

export default store;
