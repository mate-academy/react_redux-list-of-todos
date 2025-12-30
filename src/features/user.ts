import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../types/User';

export interface UserState {
  user: User | null;
  isLoading: boolean;
}

const initialState: UserState = {
  user: null,
  isLoading: false,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    startLoading(state) {
      return {
        ...state,
        isLoading: true,
      }
    },
    setUser(state, action: PayloadAction<User>) {
      return {
        ...state,
        user: action.payload,
        isLoading: false,
      }
    },
    clearUser(state) {
      return {
        ...state,
        user: null,
      }
    },
  },
});

export const { startLoading, setUser, clearUser } = userSlice.actions;
