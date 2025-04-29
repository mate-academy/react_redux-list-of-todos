import { combineSlices, configureStore } from '@reduxjs/toolkit';

import { filter } from '../features/filter';
import { todos } from '../features/todos';

const rootReducer = combineSlices(filter, todos);

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
