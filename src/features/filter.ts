import { createSlice, PayloadAction, Slice } from '@reduxjs/toolkit';

export enum StatusTypes {
  All = 'all',
  Completed = 'completed',
  Active = 'active',
}

type State = {
  query: string;
  status: StatusTypes;
};

const initialState: State = {
  query: '',
  status: StatusTypes.All,
};

export const filterSlice: Slice<State> = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setQuery(state, action: PayloadAction<string>) {
      return { ...state, query: action.payload };
    },
    setStatus(state, action: PayloadAction<StatusTypes>) {
      return { ...state, status: action.payload };
    },
  },
});

export const { setQuery, setStatus } = filterSlice.actions;
