import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Todo } from '../types/Todo';

type TodosState = {
  todos: Todo[];
  loading: boolean;
  error: string;
};

const initialState: TodosState = {
  todos: [],
  loading: false,
  error: '',
};

const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      // eslint-disable-next-line no-param-reassign
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      // eslint-disable-next-line no-param-reassign
      state.error = action.payload;
    },
    set: (state, action: PayloadAction<Todo[]>) => {
      // eslint-disable-next-line no-param-reassign
      state.todos = action.payload;
    },
  },
});

export default todosSlice.reducer;
export const { setLoading, setError, set } = todosSlice.actions;
