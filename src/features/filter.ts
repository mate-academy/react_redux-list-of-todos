import { createSlice } from '@reduxjs/toolkit';
import { Status } from '../types/Status';
import { Todo } from '../types/Todo';

const initialState: { query: string; status: Status } = {
  query: '',
  status: 'all',
};

export const { reducer, actions } = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    updateQuery: (state, action) => {
      return { ...state, query: action.payload };
    },
    updateStatus: (state, action) => {
      return { ...state, status: action.payload };
    },
  },
});

export const filterTodos = (
  todos: Todo[],
  filter: { query: string; status: Status },
) => {
  return todos.filter(todo => {
    const matchesQuery = todo.title
      .toLowerCase()
      .includes(filter.query.toLowerCase());

    const matchesStatus =
      filter.status === 'all' ||
      (filter.status === 'active' && !todo.completed) ||
      (filter.status === 'completed' && todo.completed);

    return matchesQuery && matchesStatus;
  });
};
