import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { getUser } from '../api';
import { AppDispatch } from '../app/store';
import { UserState } from '../types/Slice';
import { User } from '../types/User';

const initialState: UserState = {
  user: null,
  loadingUser: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User | null>) => ({
      ...state,
      user: action.payload,
    }),
    setLoadingUser: (state, action: PayloadAction<boolean>) => ({
      ...state,
      loadingUser: action.payload,
    }),
  },
});

export const { setUser, setLoadingUser } = userSlice.actions;
export const userReducer = userSlice.reducer;

export const getUserFromService = async (
  dispatch: AppDispatch,
  userId: number,
) => {
  dispatch(setLoadingUser(true));

  try {
    const UserFromServer = await getUser(userId);

    dispatch(setUser(UserFromServer));
  } finally {
    dispatch(setLoadingUser(false));
  }
};
