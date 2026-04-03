import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../types/User';

export const userSlice = createSlice({
  name: 'user',
  initialState: {} as User,
  reducers: {
    setUser: (_, aciton: PayloadAction<User>) => {
      return aciton.payload;
    },
  },
});

export const { setUser } = userSlice.actions;
