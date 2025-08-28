/* eslint-disable no-param-reassign */
// src/features/usersSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../types/User';

interface UsersState {
  users: User[];
}

const initialState: UsersState = {
  users: [],
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUsers: (state, action: PayloadAction<User[]>) => {
      state.users = action.payload;
    },
  },
});

export const { setUsers } = usersSlice.actions;
export default usersSlice.reducer;
export type { UsersState };
