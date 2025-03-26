import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Todo } from '../types/Todo';

const initialState = null as Todo | null;

// type SetAction = {
//   type: 'currentTodo/SET';
//   payload: Todo;
// };

// const setTodo = (todo: Todo): SetAction => ({
//   type: 'currentTodo/SET',
//   payload: todo,
// });

// type UpdateAction = {
//   type: 'currentTodo/UPDATE';
//   payload: Todo;
// };

// const updateTodo = (todo: Todo): UpdateAction => ({
//   type: 'currentTodo/UPDATE',
//   payload: todo,
// });

// type ClearAction = {
//   type: 'currentTodo/CLEAR';
// };

// const clearTodo = (): ClearAction => ({
//   type: 'currentTodo/CLEAR',
// });

// type Action = SetAction | UpdateAction | ClearAction;

// const currentTodoReducer = (action: Action, state = initialState) => {
//   switch (action.type) {
//     case 'currentTodo/SET':
//       return action.payload;

//     case 'currentTodo/UPDATE':
//       return { ...state, ...action.payload };

//     case 'currentTodo/CLEAR':
//       return null;

//     default:
//       return state;
//   }
// };

export const currentTodoSlice = createSlice({
  name: 'currentTodo',
  initialState,
  reducers: {
    setCurrentTodo(_, action: PayloadAction<Todo | null>) {
      return action.payload;
    },
    updateCurrentTodo(state, action: PayloadAction<Todo>) {
      if (state) {
        return { ...state, ...action.payload };
      }

      return state;
    },
    clearCurrentTodo() {
      return null;
    },
  },
});

export const { setCurrentTodo, updateCurrentTodo, clearCurrentTodo } =
  currentTodoSlice.actions;
export default currentTodoSlice.reducer;

// export const actions = { setTodo, updateTodo, clearTodo };

// export default currentTodoReducer;
