import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { getUser } from '../api';
import { User } from '../types/User';

export const fetchUser = createAsyncThunk('user/fetch', (userId: number) =>
  getUser(userId),
);

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    data: null as User | null,
    loading: false,
  },
  reducers: {
    clearUser: () => ({
      data: null,
      loading: false,
    }),
  },
  extraReducers: builder => {
    builder
      .addCase(fetchUser.pending, state => ({
        ...state,
        loading: true,
      }))
      .addCase(fetchUser.fulfilled, (_state, action) => ({
        data: action.payload,
        loading: false,
      }))
      .addCase(fetchUser.rejected, () => ({
        data: null,
        loading: false,
      }));
  },
});

export const { clearUser } = userSlice.actions;
