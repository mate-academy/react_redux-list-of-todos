import { createSlice, PayloadAction, Slice } from '@reduxjs/toolkit';
import { Todo } from '../types/Todo';
import { AppDispatch } from '../app/store';
import { getTodos as fetchTodosFromApi } from '../api';
import { setLoading } from './loader';

export const todosSlice: Slice<Todo[]> = createSlice({
  name: 'todos',
  initialState: [] as Todo[],
  reducers: {
    loadTodos: (_state, action: PayloadAction<Todo[]>) => action.payload,
  },
});

export const { loadTodos } = todosSlice.actions;
export default todosSlice.reducer;

export const fetchTodos = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(setLoading(true));
    const todos = await fetchTodosFromApi();

    dispatch(loadTodos(todos));
  } catch (error) {
    throw new Error('error occured while loading todos');
  } finally {
    dispatch(setLoading(false));
  }
};
