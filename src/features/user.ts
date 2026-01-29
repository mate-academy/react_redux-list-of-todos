import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../types/User';

export const userSlice = createSlice({
  name: 'user',
  initialState: {} as User,
  reducers: {
    setUser(_, action: PayloadAction<User>) {
      return action.payload;
    },
  },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
