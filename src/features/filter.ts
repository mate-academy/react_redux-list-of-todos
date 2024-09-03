import { createSlice, PayloadAction, Slice } from '@reduxjs/toolkit';

const initialState = {
  query: '',
  status: 'all',
};

export const filterSlice: Slice<{
  query: string;
  status: string;
}> = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    changeQuery: (state, action: PayloadAction<string>) => {
      return {
        ...state,
        query: action.payload,
      };
    },
    changeStatus: (state, action: PayloadAction<string>) => ({
      ...state,
      status: action.payload,
    }),
  },
});

export const { changeQuery, clearQuery, changeStatus } = filterSlice.actions;
// Export the reducer
export default filterSlice.reducer;
