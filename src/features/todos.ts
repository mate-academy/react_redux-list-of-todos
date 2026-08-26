import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Todo } from '../types/Todo';

interface TodosState {
  items: Todo[];
  selectedTodo: Todo | null;
  loading: boolean;
}

const initialState: TodosState = {
  items: [],
  selectedTodo: null,
  loading: false,
};

export const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    setTodos: (state, action: PayloadAction<Todo[]>) => {
      // eslint-disable-next-line no-param-reassign
      state.items = action.payload;
    },
    setSelectedTodo: (state, action: PayloadAction<Todo | null>) => {
      // eslint-disable-next-line no-param-reassign
      state.selectedTodo = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      // eslint-disable-next-line no-param-reassign
      state.loading = action.payload;
    },
  },
});

export const { setTodos, setSelectedTodo, setLoading } = todosSlice.actions;

/*todosSlice = {
  name: 'todos',

  reducer: function (state = { items: [], selectedTodo: null, loading: false }, action) {
    switch (action.type) {
      case 'todos/setTodos':
        return { ...state, items: action.payload };

      case 'todos/setSelectedTodo':
        return { ...state, selectedTodo: action.payload };

      case 'todos/setLoading':
        return { ...state, loading: action.payload };

      default:
        return state;
    }
  },

  actions: {
    setTodos: function (payload) {
      return { type: 'todos/setTodos', payload: payload };
    },
    setSelectedTodo: function (payload) {
      return { type: 'todos/setSelectedTodo', payload: payload };
    },
    setLoading: function (payload) {
      return { type: 'todos/setLoading', payload: payload };
    },
  },
} */
