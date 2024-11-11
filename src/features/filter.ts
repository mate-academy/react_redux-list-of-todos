// import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Todo } from '../types/Todo';

const initialState: FilterState = {
  query: '',
  status: 'all',
};

type Status = 'all' | 'active' | 'completed';

export interface FilterState {
  query: string;
  status: Status;
}

type StatusAction = {
  type: 'filter/STATUS';
  payload: Status;
};

const setStatus = (status: Status): StatusAction => ({
  type: 'filter/STATUS',
  payload: status,
});

type QueryAction = {
  type: 'filter/QUERY';
  payload: string;
};

const setQuery = (query: string): QueryAction => ({
  type: 'filter/QUERY',
  payload: query,
});

type Actions = StatusAction | QueryAction;

// eslint-disable-next-line @typescript-eslint/default-param-last
const filterReducer = (state = initialState, action: Actions) => {
  switch (action.type) {
    case 'filter/QUERY':
      return {
        ...state,
        payload: action.payload,
      };

    case 'filter/STATUS':
      return {
        ...state,
        payload: action.payload,
      };

    default:
      return state;
  }
};

// export const filterSlice = createSlice({
//   name: 'filter',
//   initialState,
//   reducers: {
//     setStatus(state, action: PayloadAction<Status>) {
//       // eslint-disable-next-line no-param-reassign
//       state.status = action.payload;
//     },
//     setQuery(state, action: PayloadAction<string>) {
//       // eslint-disable-next-line no-param-reassign
//       state.query = action.payload;
//     },
//   },
// });

// export const { setQuery, setStatus } = filterSlice.actions;
// export default filterSlice.reducer;

export const actions = { setStatus, setQuery };
export default filterReducer;

export const filteredTodos = (todos: Todo[], filter: FilterState) => {
  const preparedTodos = todos.filter(todo =>
    todo.title.toLowerCase().includes(filter.query.toLowerCase()),
  );

  switch (filter.status) {
    case 'active':
      return preparedTodos.filter(todo => !todo.completed);
    case 'completed':
      return preparedTodos.filter(todo => todo.completed);
    default:
      return preparedTodos;
  }
};
