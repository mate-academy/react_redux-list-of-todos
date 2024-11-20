/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction, Slice } from '@reduxjs/toolkit';
import { User } from '../types/User';

export interface CurrentUserState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

const initialState: CurrentUserState = {
  user: null,
  loading: false,
  error: null,
};

export const activeUserSlice: Slice<CurrentUserState> = createSlice({
  name: 'currentUser',
  initialState,
  reducers: {
    setUserStart(state) {
      state.loading = true;
      state.error = null;
    },
    setUserSuccess(state, action: PayloadAction<User>) {
      state.user = action.payload;
      state.loading = false;
    },
    setUserFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    clearUser(state) {
      state.user = null;
      state.loading = false;
      state.error = null;
    },
  },
});

export const { setUserStart, setUserSuccess, setUserFailure, clearUser } =
  activeUserSlice.actions;

export default activeUserSlice.reducer;
