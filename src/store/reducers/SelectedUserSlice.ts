/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type SelectedUserState = {
  selectedUserId: number | null;
};

const initialState: SelectedUserState = {
  selectedUserId: null,
};

const selectedUserSlice = createSlice({
  name: 'selectedUser',
  initialState,
  reducers: {
    selectUser(state, action: PayloadAction<number>) {
      state.selectedUserId = action.payload;
    },
    clearUser(state) {
      state.selectedUserId = null;
    },
  },
});

export const { selectUser, clearUser } = selectedUserSlice.actions;
export default selectedUserSlice.reducer;
