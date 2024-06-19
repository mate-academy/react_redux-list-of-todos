import { createSlice } from '@reduxjs/toolkit';
import { Todo } from '../types/Todo';
import { getTodos as getTodosFromServer } from '../api';

type GetAction = { type: 'todos/GET'; payload: Todo[] };

const getTodos = () => {
  const result: GetAction = { type: 'todos/GET', payload: [] };

  getTodosFromServer().then(items => (result.payload = items));

  return result;
};

export const todosSlice = createSlice({
  name: 'todos',
  initialState: [] as Todo[],
  reducers: {
    getTodos: () => getTodos(),
  },
});
