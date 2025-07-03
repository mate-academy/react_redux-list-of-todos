import { createSlice } from '@reduxjs/toolkit';
import { User } from '../types/User';

export const currentUserSlice = createSlice({
  name: 'user',
  initialState: null as User | null,
  reducers: {
    setUser: (_state, action) => {
      return action.payload;
    },
  },
});
