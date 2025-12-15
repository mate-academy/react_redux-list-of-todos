import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Todo } from '../types/Todo';
import { User } from '../types/User';

const initialState = {
  currentTodo: null as Todo | null,
  isUserLoading: true as boolean,
  assignedUser: null as User | null,
};

export const currentTodoSlice = createSlice({
  name: 'currentTodo',
  initialState,
  reducers: {
    set: (state, action: PayloadAction<Todo>) => ({
      ...state,
      currentTodo: action.payload,
    }),
    clear: state => ({
      ...state,
      currentTodo: null,
      isUserLoading: false,
      assignedUser: null,
    }),
    setUserIsLoading: (state, action: PayloadAction<boolean>) => ({
      ...state,
      isUserLoading: action.payload,
    }),
    setAssignedUser: (state, action: PayloadAction<User | null>) => ({
      ...state,
      assignedUser: action.payload,
    }),
  },
});

export const { actions } = currentTodoSlice;
