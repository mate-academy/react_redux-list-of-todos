/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../types/User'; // тип User, должен быть у тебя в types/User.ts
import { getUser } from '../api'; // функция для fetch пользователя по id

// thunk для загрузки пользователя
export const fetchUser = createAsyncThunk<User, number>(
  'currentUser/fetchUser',
  async (userId, thunkAPI) => {
    try {
      const user = await getUser(userId);

      return user;
    } catch (err: unknown) {
      if (err instanceof Error) {
        return thunkAPI.rejectWithValue(err.message);
      }

      return thunkAPI.rejectWithValue('Error fetching user');
    }
  },
);

// интерфейс состояния
export interface CurrentUserState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

const initialState: CurrentUserState = {
  user: null,
  loading: false,
  error: null,
};

export const currentUserSlice = createSlice({
  name: 'currentUser',
  initialState,
  reducers: {
    resetUser: state => {
      state.user = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchUser.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.user = action.payload;
        state.loading = false;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.error = (action.payload as string) || 'Error fetching user';
        state.loading = false;
      });
  },
});

export const { resetUser } = currentUserSlice.actions;
export default currentUserSlice.reducer;
