import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../types/User';

const initialState: User | null = null;

export const currentUserSlice = createSlice({
  name: 'currentUser',
  initialState,
  reducers: {
    setCurrentUser: (state, action: PayloadAction<User>) => action.payload,
    clearCurrentUser: () => null,
  },
});

export const { setCurrentUser, clearCurrentUser } = currentUserSlice.actions;
export default currentUserSlice.reducer;
