import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../types/User';

type UserStatus = {
  user: User | null;
};

const initialState: UserStatus = {
  user: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User | null>) => {
      return { ...state, user: action.payload };
    },
  },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
