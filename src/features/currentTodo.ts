import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Todo } from '../types/Todo';
import { User } from '../types/User';

type CurrentTodoState = {
  selectedTodo: Todo | null;
  selectedUser: User | null;
  isModalOpen: boolean;
  error: string | null;
};

const initialState: CurrentTodoState = {
  selectedTodo: null,
  selectedUser: null,
  isModalOpen: false,
  error: null,
};

export const currentTodoSlice = createSlice({
  name: 'currentTodo',
  initialState,
  reducers: {
    selectTodo(state, action: PayloadAction<Todo>) {
      return {
        ...state,
        selectedTodo: action.payload,
        isModalOpen: true,
        selectedUser: null,
        error: null,
      };
    },
    clearSelection(state) {
      return {
        ...state,
        selectedTodo: null,
        isModalOpen: false,
        selectedUser: null,
        error: null,
      };
    },
    setCurrentUser(state, action: PayloadAction<User>) {
      return {
        ...state,
        selectedUser: action.payload,
        error: null,
      };
    },
    clearUser(state) {
      return {
        ...state,
        selectedUser: null,
      };
    },
    setModalOpen(state, action: PayloadAction<boolean>) {
      return {
        ...state,
        isModalOpen: action.payload,
      };
    },
    setCurrentTodoError(state, action: PayloadAction<string | null>) {
      return {
        ...state,
        error: action.payload,
      };
    },
  },
});

export const {
  selectTodo,
  clearSelection,
  setCurrentUser,
  clearUser,
  setModalOpen,
  setCurrentTodoError,
} = currentTodoSlice.actions;

type CurrentTodoSelectorsState = { currentTodo: CurrentTodoState };

const selectCurrentTodoState = (state: CurrentTodoSelectorsState) =>
  state.currentTodo;

export const selectCurrentTodo = (state: CurrentTodoSelectorsState) =>
  selectCurrentTodoState(state).selectedTodo;
export const selectCurrentUser = (state: CurrentTodoSelectorsState) =>
  selectCurrentTodoState(state).selectedUser;
export const selectIsModalOpen = (state: CurrentTodoSelectorsState) =>
  selectCurrentTodoState(state).isModalOpen;
export const selectCurrentTodoError = (state: CurrentTodoSelectorsState) =>
  selectCurrentTodoState(state).error;
