import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Todo } from '../../types/Todo'; // ← виправлений шлях

const todosSlice = createSlice({
  name: 'todos',
  initialState: [] as Todo[],
  reducers: {
    setTodos: (state, action: PayloadAction<Todo[]>) => {
      return action.payload; // ← використовуємо return замість мутації
    },
  },
});

export const { setTodos } = todosSlice.actions;
export default todosSlice.reducer;
