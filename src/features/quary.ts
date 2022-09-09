import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface Quary {
  quary: string,
}

const initialState: Quary = {
  quary: '',
};

const quarySlice = createSlice({
  name: 'quary',
  initialState,
  reducers: {
    setQuary(state, action: PayloadAction<string>) {
      // eslint-disable-next-line no-param-reassign
      state.quary = action.payload;
    },
  },
});

export const { setQuary } = quarySlice.actions;
export default quarySlice.reducer;
