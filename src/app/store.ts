import { configureStore } from '@reduxjs/toolkit';
import todoReducer from '../features/todo/todoSlice';
import userReducer from '../features/user/userSlice';
import modalReducer from '../features/modal/modalSlice';
import filterReducer from '../features/filter/filterSlice';

const store = configureStore({
  reducer: {
    todo: todoReducer,
    user: userReducer,
    modal: modalReducer,
    filter: filterReducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
