import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Todo } from '../types/Todo';

// type SetTodosAction = {
//   type: 'todos/SET';
//   payload: Todo[];
// };

// const set = (todos: Todo[]): SetTodosAction => ({
//   type: 'todos/SET',
//   payload: todos,
// });

// const todosReducer = (action: SetTodosAction, todos: Todo[] = []): Todo[] => {
//   switch (action.type) {
//     case 'todos/SET':
//       return [...todos, ...action.payload];

//     default:
//       return todos;
//   }
// };

export const todosSlice = createSlice({
  name: 'todos',
  initialState: [] as Todo[],
  reducers: {
    setTodos(_todos: Todo[], action: PayloadAction<Todo[]>) {
      return action.payload;
    },
  },
});

export const { setTodos } = todosSlice.actions;

export default todosSlice.reducer;

// export const actions = { set };
// export default todosReducer;
