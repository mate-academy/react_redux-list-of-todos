import { combineSlices, configureStore } from '@reduxjs/toolkit';
import { todosSliceName, todosSliceReducer } from '../features/todos';
import { filterName, filterReducer } from '../features/filter';
import { currentTodoName, currentTodoReducer } from '../features/currentTodo';

const rootReducer = combineSlices({
  [todosSliceName]: todosSliceReducer,
  [filterName]: filterReducer,
  [currentTodoName]: currentTodoReducer,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
