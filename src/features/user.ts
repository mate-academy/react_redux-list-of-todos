import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../types/User';

const initialState = {
  user: null as User | null,
  loading: false,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setLoadingUser: (state, action: PayloadAction<boolean>) => ({
      ...state,
      loading: action.payload,
    }),

    setUser: (state, action: PayloadAction<User>) => ({
      ...state,
      user: action.payload,
      loading: false,
    }),
  },
});

export const { setLoadingUser, setUser } = userSlice.actions;
