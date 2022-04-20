import { RootState } from './types';

// Selectors - a function receiving Redux state and returning some data from it
export const isLoading = (state: RootState) => state.loading;
export const getMessage = (state: RootState) => state.message;

export const loadTodosSelector = (state: RootState): Todo[] => state.todos;

// export const preparedTodosSelector = (state: RootState): Todo[] => {
//   const todo = state.todos.find...
//   const user = state.todos.user...

//   return {
//     ...todo,
//     user
//   }
// };
