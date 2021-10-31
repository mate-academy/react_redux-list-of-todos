/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { IUser } from '../../models/IUser';

type UserState = {
  user: IUser | null;
  isLoading: boolean;
  error: string;
  notFound: boolean;
};

const initialState: UserState = {
  user: null,
  isLoading: false,
  error: '',
  notFound: false,
};

export const getUserById = createAsyncThunk(
  'users/getById',
  async (userId: number, { rejectWithValue }) => {
    try {
      const response = await axios.get<IUser>(`https://mate.academy/students-api/users/${userId}`);

      if (!response.data) {
        return rejectWithValue('User not found 🤷‍♂️');
      }

      return response.data;
    } catch (e) {
      return rejectWithValue('Failed to load user. 😒');
    }
  },
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: {
    [getUserById.pending.type]: (state) => {
      state.isLoading = true;
      state.error = '';
    },
    [getUserById.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [getUserById.fulfilled.type]: (state, action: PayloadAction<IUser>) => {
      state.isLoading = false;
      state.error = '';
      state.user = action.payload;
    },
  },
});

export default userSlice.reducer;
