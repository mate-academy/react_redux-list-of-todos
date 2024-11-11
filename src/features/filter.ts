import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Todo } from '../types/Todo';

const initialState = {
  query: '',
  status: 'all',
};

type Status = 'all' | 'active' | 'completed';

type State = {
  query: string;
  status: string;
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setStatus(state: State, { payload }: PayloadAction<Status>) {
      return {
        ...state,
        status: payload,
      };
    },
    setQuery(state: State, { payload }: PayloadAction<string>) {
      return {
        ...state,
        query: payload,
      };
    },
  },
});

export const { setQuery, setStatus } = filterSlice.actions;
export default filterSlice.reducer;

export const filtredTodos = (todos: Todo[], filter: State) => {
  const filtred = todos.filter(todo =>
    todo.title.toLowerCase().trim().includes(filter.query.toLowerCase().trim()),
  );

  switch (filter.status) {
    case 'active':
      return filtred.filter(todo => todo.completed === false);
    case 'completed':
      return filtred.filter(todo => todo.completed === true);
    case 'all':
      return [...filtred];
    default:
      return filtred;
  }
};
