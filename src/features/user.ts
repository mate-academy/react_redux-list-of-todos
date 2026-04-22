import { createSlice } from '@reduxjs/toolkit';
import { User } from '../types/User';

const initialState = null as User | null;

export const UserSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      return action.payload;
    },
  },
});

export const { setUser } = UserSlice.actions;
