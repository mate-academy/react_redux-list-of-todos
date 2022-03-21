import { createAsyncThunk } from '@reduxjs/toolkit';

const API_URL = 'https://mate.academy/students-api/users/';

// import { AppDispatch } from './index';
// import { setUser, userError, userLoading } from './user';
//
// const API_URL = 'https://mate.academy/stud123ents-api/users/';
//
// export const fetchUserFromServer = (userId: number) => (
//   async (dispatch: AppDispatch) => {
//     try {
//       dispatch(userLoading());
//
//       const response = await fetch(`${API_URL}${userId}`);
//       const data = await response.json();
//
//       dispatch(setUser(data));
//     } catch (e: any) {
//       dispatch(userError(e.message));
//     }
//   }
// );

export const fetchUser = createAsyncThunk(
  'fetch/user',
  async (userId: number, thunkApi) => {
    try {
      const response = await fetch(`${API_URL}${userId}`);

      return await response.json();
    } catch (e: any) {
      return thunkApi.rejectWithValue(e.message);
    }
  },
);
