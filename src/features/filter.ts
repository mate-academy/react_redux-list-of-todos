// import { createSlice, Slice } from '@reduxjs/toolkit';
// import { Todo } from '../types/Todo';

// interface PropsState {
//   filtered: Todo[];
//   all: Todo[];
// }

// const initialState: PropsState = {
//   filtered: [],
//   all: [],
// };

// const filterSlice: Slice<PropsState> = createSlice({
//   name: 'filter',
//   initialState,
//   reducers: {
//     setActive: state => {
//       return {
//         ...state,
//         filtered: state.all.filter(item => !item.completed),
//       };
//     },
//     setCompleted: state => {
//       return {
//         ...state,
//         filtered: state.all.filter(item => item.completed),
//       };
//     },
//     setAll: state => {
//       return {
//         ...state,
//         filtered: state.all,
//       };
//     },
//   },
// });

// export default filterSlice;
// export const { setActive, setAll, setCompleted } = filterSlice.actions;

import { createSlice, PayloadAction, Slice } from '@reduxjs/toolkit';
import { Status } from '../types/Status';
import { RootState } from '../app/store';

const initialState = {
  query: '',
  status: Status.ALL,
};

type FilterState = {
  query: string;
  status: Status;
};

export const filterSlice: Slice<FilterState> = createSlice({
  name: 'filter',
  initialState,
  // selectors: {
  //   getQuery: state => {
  //     return state.query;
  //   },
  // },
  reducers: {
    setQuery(state, action: PayloadAction<string>) {
      return {
        ...state,
        query: action.payload,
      };
    },

    setStatus(state, action: PayloadAction<Status>) {
      return {
        ...state,
        status: action.payload,
      };
    },
  },
});

export default filterSlice.reducer;
export const { setQuery, setStatus } = filterSlice.actions;

export const getQuery = (state: RootState) => state.filterSlice.query;
export const getStatus = (state: RootState) => state.filterSlice.status;
