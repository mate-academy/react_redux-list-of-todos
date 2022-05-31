// there I imported rootState because i use it in selectors for this inner state

/* eslint-disable import/no-cycle */

// Redux Toolkit allows us to write "mutating" logic in reducers. It
// doesn't actually mutate the state because it uses the Immer library,
// which detects changes to a "draft state" and produces a brand new
// immutable state based off those changes

/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '.';

interface FilterQueryState {
  text: string,
}

const initialState: FilterQueryState = {
  text: '',
};

export const filterQuerySlice = createSlice({
  name: 'query',
  initialState,
  reducers: {
    setNewQuery: (state, action: PayloadAction<string>) => {
      state.text = action.payload;
    },
  },
});

export const { setNewQuery } = filterQuerySlice.actions;

export const selectors = {
  query: (state: RootState) => state.query.text,
};

export default filterQuerySlice.reducer;
