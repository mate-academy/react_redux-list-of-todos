import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../types/User';

const initialState: { users: Record<number, User> } = {
  users: {}, // ✅ TypeScript now knows `users` will store User objects
};

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<{ id: number; user: User }>) => {
      return {
        ...state,
        users: {
          ...state.users,
          [action.payload.id]: action.payload.user, // ✅ Store user data properly
        },
      };
    },
  },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;

export const selectUser = (
  state: { users: { users: Record<number, User> } },
  userId: number,
) => {
  return state.users.users[userId];
};

export const selectAllUsers = (state: {
  users: { users: Record<number, User> };
}) => {
  return Object.values(state.users.users);
};

export const selectUserById = (
  state: { users: { users: Record<number, User> } },
  userId: number,
) => {
  return state.users.users[userId];
};

export const selectUserByName = (
  state: { users: { users: Record<number, User> } },
  userName: string,
) => {
  return Object.values(state.users.users).find(user => user.name === userName);
};
