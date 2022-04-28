/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { request } from '../../api/api';

const initialState: UserState = {
  user: null,
  selectedUserId: 0,
  isUserLoading: true,
  userLoadingError: false,
};

export const getUser = createAsyncThunk(
  'user/getUser',
  async (userId: number): Promise<User> => {
    return request<User>(`users/${userId}`);
  },
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    changeUserId: (state: UserState, action) => {
      state.selectedUserId = action.payload;
    },
  },

  extraReducers: {
    [getUser.pending.type]: (state: UserState) => {
      state.userLoadingError = false;
      state.isUserLoading = true;
    },
    [getUser.fulfilled.type]: (state: UserState, action) => {
      state.isUserLoading = false;
      state.userLoadingError = false;
      state.user = action.payload;
    },
    [getUser.rejected.type]: (state: UserState) => {
      state.isUserLoading = false;
      state.userLoadingError = true;
    },
  },
});

export const { changeUserId } = userSlice.actions;

export default userSlice.reducer;
