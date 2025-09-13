import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../types/User';

const initialState: User[] = [];

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUsers: (_state, action: PayloadAction<User[]>) => action.payload,
  },
});

export const { setUsers } = usersSlice.actions;
export default usersSlice.reducer;
