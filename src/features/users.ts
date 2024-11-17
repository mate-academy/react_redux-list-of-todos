import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { User } from '../types/User';
import { getUser } from '../api';

type InitialState = {
  user: User | null;
  loaded: boolean;
};

const initialState: InitialState = {
  user: null,
  loaded: false,
};

export const init = createAsyncThunk('user/fetch', (userId: number) => {
  return getUser(userId);
});

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(init.pending, state => {
      return { ...state, loaded: true };
    });

    builder.addCase(init.fulfilled, (state, action) => {
      return { ...state, user: action.payload, loaded: false };
    });
  },
});

export default userSlice.reducer;