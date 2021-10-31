import { configureStore } from '@reduxjs/toolkit';
import selectedUserReducer from './reducers/SelectedUserSlice';
import todosReducer from './reducers/TodosSlice';
import userReducer from './reducers/UserSlice';

export const store = configureStore({
  reducer: {
    selectedUserId: selectedUserReducer,
    todo: todosReducer,
    user: userReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
