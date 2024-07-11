import { createSlice, PayloadAction, Slice } from '@reduxjs/toolkit';
import { User } from '../types/User';

const initialState = null as User | null;

export const currentUserSlice: Slice<User | null> = createSlice({
  name: 'currentUser',
  initialState,
  reducers: {
    setCurrentUser: (_currentUser, { payload }: PayloadAction<User>) => {
      return payload;
    },
  },
});
