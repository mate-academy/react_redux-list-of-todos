import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../types/User';

const initialState = null as User | null;

export const currentUserSlice = createSlice({
  name: 'currentUser',
  initialState,
  reducers: {
    setUser: (_state, action: PayloadAction<User | null>) => action.payload,
  },
});

export const { setUser } = currentUserSlice.actions;
