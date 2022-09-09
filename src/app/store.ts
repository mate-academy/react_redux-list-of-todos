import { configureStore } from '@reduxjs/toolkit';
import todoReducer from '../features/todos';
import filterReducer from '../features/filter';
import quaryReducer from '../features/quary';
import selectTodoReducer from '../features/selectTodo';

export const store = configureStore({
  reducer: {
    todos: todoReducer,
    filter: filterReducer,
    quary: quaryReducer,
    selectTodo: selectTodoReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
