/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { ITodo } from '../../models/ITodo';

type TodosState = {
  todos: ITodo[];
  isLoading: boolean;
  error: string;
};

const initialState: TodosState = {
  todos: [],
  isLoading: false,
  error: '',
};

export const getAllTodos = createAsyncThunk(
  'todos/getAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get<ITodo[]>('https://mate.academy/students-api/todos');

      return response.data;
    } catch (e) {
      return rejectWithValue('Sorry, seems like our servers are on 🔥. Try again');
    }
  },
);

const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    shuffleTodos(state) {
      state.todos.sort(() => 0.5 - Math.random());
    },
    deleteTodo(state, { payload }: PayloadAction<number>) {
      state.todos = state.todos.filter(({ id }) => id !== payload);
    },
  },
  extraReducers: {
    [getAllTodos.pending.type]: (state) => {
      state.isLoading = true;
      state.error = '';
    },
    [getAllTodos.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [getAllTodos.fulfilled.type]: (state, action: PayloadAction<ITodo[]>) => {
      state.isLoading = false;
      state.error = '';
      state.todos = action.payload;
    },
  },
});

export const { shuffleTodos, deleteTodo } = todosSlice.actions;
export default todosSlice.reducer;
