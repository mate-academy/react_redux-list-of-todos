import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Todo } from '../types/Todo';

export interface TodosState {
  items: Todo[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  modalVisible: boolean;
  selectedTodo: Todo | null;
}

const initialState: TodosState = {
  items: [],
  status: 'idle',
  modalVisible: false,
  selectedTodo: null,
};

export const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    setTodos: (state, action: PayloadAction<Todo[]>) => {
      state.items = action.payload;
      state.status = 'succeeded';
    },
    addTodo: (state, action: PayloadAction<Todo>) => {
      state.items.push(action.payload);
    },
    updateTodo: (state, action: PayloadAction<Todo>) => {
      const index = state.items.findIndex(todo => todo.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = action.payload;
      }
    },
    deleteTodo: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter(todo => todo.id !== action.payload);
    },
    setLoading: (state) => {
      state.status = 'loading';
    },
    setFailed: (state) => {
      state.status = 'failed';
    },
    setModalVisibility: (state, action: PayloadAction<boolean>) => {
      state.modalVisible = action.payload;
    },
    setSelectedTodo: (state, action: PayloadAction<Todo | null>) => {
      state.selectedTodo = action.payload;
    },
  },
});

export const {
  setTodos,
  addTodo,
  updateTodo,
  deleteTodo,
  setLoading,
  setFailed,
  setModalVisibility,
  setSelectedTodo,
} = todosSlice.actions;

export default todosSlice.reducer;
