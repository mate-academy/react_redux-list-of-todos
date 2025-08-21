import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../types/User';

const initialState = null as User | null;

export const currentUserSlice = createSlice({
  name: 'currentUser',
  initialState,
  reducers: {
    showActiveUser: (state, action: PayloadAction<User>) => action.payload,
    closeActiveUser: () => null,
  },
});
