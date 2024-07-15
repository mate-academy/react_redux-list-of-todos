import { createSlice, PayloadAction, Slice } from '@reduxjs/toolkit';
import { Todo } from '../types/Todo';

// interface TodoState {
//   todos: Todo[];
// }

// const initialState: TodoState = {

// };

type SetTodosAction = {
  type: 'todos/SET';
  payload: Todo[];
};

const setTodos = (value: Todo[]): SetTodosAction => ({
  type: 'todos/SET',
  payload: value,
});

export const todosSlice: Slice<Todo[]> = createSlice({
  name: 'todos',
  initialState: [] as Todo[],
  reducers: {
    fetchTodos(state, action: PayloadAction<Todo[]>) {
      state.push(...action.payload);
    },
  },
});

export const actions = { setTodos };

export const { fetchTodos } = todosSlice.actions;
