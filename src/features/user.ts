import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../types/User';

const initialState = null as User | null;

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<User | null>) {
      return action.payload;
    },
    clearCurrentUser: () => null,
  },
});

export const { setUser, clearCurrentUser } = userSlice.actions;
export default userSlice.reducer;
