/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Todo } from '../../types/Todo';

type TodosState = {
  items: Todo[];
  status: 'idle' | 'loading' | 'failed';
  error: string | null;
};

const initialState: TodosState = {
  items: [],
  status: 'idle',
  error: null,
};

export const todosSlice = createSlice({
  name: 'todos',
  initialState: initialState,
  reducers: {
    setItems(state, action: PayloadAction<Todo[]>) {
      // eslint-disable-next-line no-param-reassign
      state.items = action.payload;
      // eslint-disable-next-line no-param-reassign
      state.status = 'idle';
      state.error = null;
    },
    setLoading(state) {
      state.status = 'loading';
      state.error = null;
    },

    setError(state, action: PayloadAction<string | null>) {
      state.status = 'failed';
      state.error = action.payload;
    },
  },
});

export const { setItems, setLoading, setError } = todosSlice.actions;
export default todosSlice.reducer;
