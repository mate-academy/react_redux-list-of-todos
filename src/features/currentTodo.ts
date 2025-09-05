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
    set: (state, action: PayloadAction<Todo>) => {
      return { ...state, currentTodo: action.payload };
    },
    clear: state => {
      return {
        ...state,
        currentTodo: null,
        assignedUser: null,
        isUserLoading: false,
      };
    },
    setIsUserLoading: (state, action: PayloadAction<boolean>) => {
      return { ...state, isUserLoading: action.payload };
    },
    setAssignedUser: (state, action: PayloadAction<User | null>) => {
      return { ...state, assignedUser: action.payload };
    },
  },
});

export const { actions } = currentTodoSlice;
