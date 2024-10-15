import { createSlice } from '@reduxjs/toolkit';
import { Todo } from '../types/Todo';

interface TodosState {
  items: Todo[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
}

const initialState: TodosState = {
  items: [],
  status: 'idle',
};

export const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    setTodos(state, action) {
      // eslint-disable-next-line no-param-reassign
      state.items = action.payload;
      // eslint-disable-next-line no-param-reassign
    },
    setLoading(state) {
      // eslint-disable-next-line no-param-reassign
      state.status = 'loading';
    },
    setEndLoading(state) {
      // eslint-disable-next-line no-param-reassign
      state.status = 'idle';
    },
    setError(state) {
      // eslint-disable-next-line no-param-reassign
      state.status = 'failed';
    },
  },
});

export const { setTodos, setLoading, setError, setEndLoading } =
  todosSlice.actions;

export default todosSlice.reducer;
