import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Status } from '../types/Status';
import { Todo } from '../types/Todo';

type State = {
  query: string;
  status: Status;
};

const initialState: State = {
  query: '',
  status: 'all',
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    changeStatus(state: State, { payload }: PayloadAction<Status>) {
      return {
        ...state,
        status: payload,
      };
    },
    changeQuery(state: State, { payload }: PayloadAction<string>) {
      return {
        ...state,
        query: payload,
      };
    },
  },
});

export const { changeQuery, changeStatus } = filterSlice.actions;

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
