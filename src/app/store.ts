// import { combineSlices, configureStore } from '@reduxjs/toolkit';
// import { currentTodoSlice } from '../features/currentTodo';
// import { filterSlice } from '../features/filter';
// import { todosSlice } from '../features/todos';
// import { userSlice } from '../features/user';

// const rootReducer = combineSlices({
//   currentTodo: currentTodoSlice,
//   filter: filterSlice,
//   todos: todosSlice,
//   user: userSlice,
// });

// export const store = configureStore({
//   reducer: rootReducer,
// });

// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;

import { configureStore } from '@reduxjs/toolkit';
import currentTodoReducer from '../features/currentTodo';
import filterReducer from '../features/filter';
import todosReducer from '../features/todos';
import userReducer from '../features/user';

export const store = configureStore({
  reducer: {
    currentTodo: currentTodoReducer,
    filter: filterReducer,
    todos: todosReducer,
    user: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
