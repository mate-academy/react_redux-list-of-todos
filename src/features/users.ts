import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getUser } from '../api';
import { User } from '../types/User';

interface UserState {
  current: User | null;
  loading: boolean;
}

const initialState: UserState = {
  current: null,
  loading: false,
};

export const fetchUser = createAsyncThunk('users/fetchOne', (userId: number) =>
  getUser(userId),
);

const userReducer = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchUser.pending, (state: UserState) => {
      state.loading = true;
      state.current = null;
    });

    builder.addCase(fetchUser.fulfilled, (state: UserState, action) => {
      state.loading = false;
      state.current = action.payload;
    });

    builder.addCase(fetchUser.rejected, (state: UserState) => {
      state.loading = false;
    });
  },
});

export default userReducer.reducer;
