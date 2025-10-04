import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Todo } from '../types/Todo';

type State = { todo?: Todo };

const initialState: State = {};

const currentTodoSlice = createSlice({
  name: 'currentTodo',
  initialState,
  reducers: {
    SET: (state, action: PayloadAction<Todo>) => {
      return { ...state, todo: action.payload };
    },
    SETBYID: (state, action: PayloadAction<number>) => {
      // This reducer will be handled by middleware to find todo by ID
      // The actual todo will be set by SET action
      // The action payload is used by the middleware, not here
      void action; // Explicitly acknowledge we're not using it in this reducer

      return state;
    },
    REMOVE: state => {
      return { ...state, todo: undefined };
    },
  },
});

export const { SET, SETBYID, REMOVE } = currentTodoSlice.actions;
export default currentTodoSlice.reducer;
