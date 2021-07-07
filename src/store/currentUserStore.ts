import { AnyAction } from 'redux';

export type User = {
  id: number;
  name: string;
  email: string;
  phone: string;
};

export type CurrentUserState = {
  value: User | null;
  isLoading: boolean;
  isInitialized: boolean;
  hasError: boolean;
};

const initialState = {
  value: null,
  isLoading: false,
  isInitialized: false,
  hasError: false,
};

const SET_USER = 'currentUser/SET_USER';
const SET_ERROR = 'currentUSer/SET_ERROR';
const ENABLE_LOADING = 'currentUser/ENABLE_LOADING';
const DISABLE_LOADING = 'currentUser/DISABLE_LOADING';
const INITIALIZE = 'currentUser/INITIALIZE';
const CANCEL_INITIALIZATION = 'currentUser/CANCEL_INITIALIZATION';

export const actions = {
  setUser: (user: User | null) => ({
    type: SET_USER,
    payload: user,
  }),
  setError: (hasError: boolean) => ({
    type: SET_ERROR,
    payload: hasError,
  }),
  enableLoading: () => ({
    type: ENABLE_LOADING,
  }),
  disableLoading: () => ({
    type: DISABLE_LOADING,
  }),
  initialize: () => ({ type: INITIALIZE }),
  cancelInitialization: () => ({
    type: CANCEL_INITIALIZATION,
  }),
};

export const selectors = {
  getUser: (state: CurrentUserState) => state.value,
  getUserId: (state: CurrentUserState) => {
    if (state.value) {
      return state.value.id;
    }

    return null;
  },
  hasUser: (state: CurrentUserState) => !!state.value,
  isLoading: (state: CurrentUserState) => state.isLoading,
  isInitialized: (state: CurrentUserState) => state.isInitialized,
  hasError: (state: CurrentUserState) => state.hasError,
};

const userReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case INITIALIZE:
      return {
        ...state,
        isInitialized: true,
      };
    case CANCEL_INITIALIZATION:
      return {
        ...state,
        isInitialized: false,
      };
    case ENABLE_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case DISABLE_LOADING:
      return {
        ...state,
        isLoading: false,
      };
    case SET_USER:
      return {
        ...state,
        value: action.payload,
      };
    case SET_ERROR:
      return {
        ...state,
        hasError: action.payload,
      };
    default:
      return state;
  }
};

export default userReducer;
