/* eslint-disable no-param-reassign */
import {
  createSlice,
  createAsyncThunk,
  PayloadAction,
  createSelector,
} from '@reduxjs/toolkit';
import axios from 'axios';
import { Todo } from '../../types/Todo';
import { BASE_URL } from '../../APIendpoint';
// eslint-disable-next-line import/no-cycle
import { RootState } from '../../app/store';

type InitialState = {
  loading: boolean;
  todos: Todo[];
  error: string;
  selectedTodo: Todo | null;
};

export const fetchTodos = createAsyncThunk('user/fetchTodos', () => {
  const url = `${BASE_URL}/todos.json`;

  return (
    axios
      .get(url)
      .then(response => response.data)
  );
});

const initialState: InitialState = {
  loading: false,
  todos: [],
  error: '',
  selectedTodo: null,
};

const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    openTodo: (state, action: PayloadAction<number>) => {
      state.selectedTodo = state.todos.find(todo => todo.id === action.payload)
      || null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTodos.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchTodos.fulfilled, (
      state,
      action: PayloadAction<Todo[]>,
    ) => {
      state.loading = false;
      state.todos = action.payload;
      state.error = '';
    });
    builder.addCase(fetchTodos.rejected, (state, action) => {
      state.loading = false;
      state.todos = [];
      state.error = action.error.message || 'Something went wrong';
    });
  },
});

export default todoSlice.reducer;
export const { openTodo } = todoSlice.actions;

const todosList = (state: RootState) => state.todo.todos;
const searchValue = (state: RootState) => state.filter.searchValue;
const optionValue = (state: RootState) => state.filter.optionValue;

export const filteredTodosSelector = createSelector(
  [todosList, searchValue, optionValue],
  (todos, search, option) => {
    return todos.filter(todo => {
      const query = search.toLowerCase().trim();
      const title = todo.title.toLowerCase();

      switch (option) {
        case 'active':
          return !todo.completed && title.includes(query);
        case 'completed':
          return todo.completed && title.includes(query);
        default:
          return title.includes(query);
      }
    });
  },
);
