import { combineSlices, configureStore } from '@reduxjs/toolkit';
import { reducer as todosReducer } from '../features/todos';

const rootReducer = combineSlices({
  todos: todosReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
