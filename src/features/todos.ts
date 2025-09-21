import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Todo } from '../types/Todo';

interface TodosState {
  items: Todo[];
  isLoading: boolean;
}

const initialState: TodosState = {
  items: [],
  isLoading: false,
};

export const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    setTodos: (state, action: PayloadAction<Todo[]>) => {
      return {
        ...state,
        items: action.payload,
        isLoading: false,
      };
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      return {
        ...state,
        isLoading: action.payload,
      };
    },
    toggleTodo: (state, action: PayloadAction<number>) => {
      const todoItem = state.items.find(todo => todo.id === action.payload);

      if (todoItem) {
        return {
          ...state,
          items: state.items.map(todo =>
            todo.id === action.payload
              ? { ...todo, completed: !todo.completed }
              : todo,
          ),
        };
      }

      return state;
    },
  },
});

export const { setTodos, setLoading, toggleTodo } = todosSlice.actions;
export default todosSlice.reducer;
