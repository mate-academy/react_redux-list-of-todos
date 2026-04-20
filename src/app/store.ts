import { configureStore } from '@reduxjs/toolkit';
import { todosSlice } from '../features/todos';
import { currentTodoSlice } from '../features/currentTodo';
import { filterSlice } from '../features/filter';

// const rootReducer = combineSlices();

export const store = configureStore({
  reducer: {
    todos: todosSlice.reducer,
    currentTodo: currentTodoSlice.reducer,
    filter: filterSlice.reducer,
  },
});

// export type RootState = ReturnType<typeof rootReducer>;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
