import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FilterState {
  query: string;
  status: string;
}

const initialState: FilterState = {
  query: "",
  status: "all",
};

export const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    changeFilterStatus(state, { payload }: PayloadAction<string>) {
      // eslint-disable-next-line no-param-reassign
      state.status = payload;
    },
    changeFilterQuery(state, { payload }: PayloadAction<string>) {
      // eslint-disable-next-line no-param-reassign
      state.query = payload;
    },
  },
});
