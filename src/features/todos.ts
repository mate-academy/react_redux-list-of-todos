import { createSlice } from '@reduxjs/toolkit';
import { Todo } from '../types/Todo';

type State = {
  todos: Todo[];
  loading: boolean;
  notif: string;
};

const initState: State = {
  todos: [],
  loading: true,
  notif: '',
};

export const todosSlice = createSlice({
  name: 'todos',
  initialState: initState,
  reducers: {
    setTodos(state, action): State {
      return {
        ...state,
        todos: action.payload,
      };
    },

    setLoading(state, action): State {
      return {
        ...state,
        loading: action.payload,
      };
    },

    setNotif(state, action): State {
      return {
        ...state,
        notif: action.payload,
      };
    },

    addTodos(state, action): State {
      return {
        ...state,
        todos: [...state.todos, action.payload],
      };
    },
  },
});

export const { setTodos, setLoading, setNotif, addTodos } = todosSlice.actions;
