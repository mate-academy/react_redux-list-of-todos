import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../types/User';
import { LoadingTypes } from '../enums/LoadingTypes';

const initialState = {
  currentUser: null as User | null,
  currentUserLoadingStatus: LoadingTypes.idle,
};

const currentUserSlice = createSlice({
  name: 'currentUser',
  initialState,
  reducers: {
    currentUserFetching: state => {
      return {
        ...state,
        currentUserLoadingStatus: LoadingTypes.loading,
      };
    },
    currentUserFetchError: state => {
      return {
        ...state,
        currentUserLoadingStatus: LoadingTypes.error,
      };
    },
    currentUserFetched: (state, action: PayloadAction<User>) => {
      return {
        ...state,
        currentUser: action.payload,
        currentUserLoadingStatus: LoadingTypes.idle,
      };
    },
  },
});

export const {
  currentUserFetchError,
  currentUserFetched,
  currentUserFetching,
} = currentUserSlice.actions;

export default currentUserSlice.reducer;
