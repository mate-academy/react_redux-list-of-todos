import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from './index';
import { User } from '../react-app-env';
import { fetchUser } from './ActionCreators';

interface UsersState {
  user: User | null;
  isLoading: boolean;
  error: string;
}

const initialState: UsersState = {
  user: null,
  isLoading: false,
  error: '',
};

export const usersSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchUser.fulfilled.type]: (state, action: PayloadAction<User>) => {
      state.isLoading = false;
      state.error = '';
      state.user = action.payload;
    },
    [fetchUser.pending.type]: (state) => {
      state.isLoading = true;
    },
    [fetchUser.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const userInfo = (state: RootState) => state.userReducer;
export default usersSlice.reducer;
