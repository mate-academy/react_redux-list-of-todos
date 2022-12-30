/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { User } from '../../types/User';
import { BASE_URL } from '../../APIendpoint';

type InitialState = {
  loading: boolean;
  user: User | null;
  error: string;
};

export const fetchUser = createAsyncThunk(
  'user/fetchUser',
  (userId:number) => {
    const url = `${BASE_URL}/users/${userId}.json`;

    return (
      axios
        .get(url)
        .then(response => response.data)
    );
  },
);

const initialState: InitialState = {
  loading: false,
  user: null,
  error: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchUser.fulfilled, (
      state,
      action: PayloadAction<User>,
    ) => {
      state.loading = false;
      state.user = action.payload;
      state.error = '';
    });
    builder.addCase(fetchUser.rejected, (state, action) => {
      state.loading = false;
      state.user = null;
      state.error = action.error.message || 'Something went wrong';
    });
  },
});

export default userSlice.reducer;
