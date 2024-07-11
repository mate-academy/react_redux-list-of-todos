import { combineSlices, configureStore } from '@reduxjs/toolkit';
import { filterSlice } from '../features/filter';
import { todosSlice } from '../features/todos';
import { currentTodoSlice } from '../features/currentTodo';
import { currentUserSlice } from '../features/currentUser';

const rootReducer = combineSlices(
  filterSlice,
  todosSlice,
  currentTodoSlice,
  currentUserSlice,
);

export const store = configureStore({
  reducer: rootReducer,
});

// const [selectedUser, setSelectedUser] = useState<User | null>(null);
//   const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
