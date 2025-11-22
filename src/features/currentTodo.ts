import { createSlice } from '@reduxjs/toolkit';
import { Todo } from '../types/Todo';
import { User } from '../types/User';

type State = {
  currentTodo: Todo | null;
  loading: boolean;
  user: User | null;
};

const initialState: State = {
  currentTodo: null,
  loading: false,
  user: null,
};

export const currentTodoSlice = createSlice({
  name: 'currentTodo',
  initialState: initialState,
  reducers: {
    setCurrentTodo(state, action): State {
      return {
        ...state,
        currentTodo: action.payload,
      };
    },

    setCurrentUser(state, action): State {
      return {
        ...state,
        user: action.payload,
      };
    },

    setLoading(state, action) {
      return {
        ...state,
        loading: action.payload,
      };
    },
  },
});

export const { setCurrentTodo, setCurrentUser, setLoading } =
  currentTodoSlice.actions;
