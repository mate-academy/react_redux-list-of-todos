import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Todo } from '../types/Todo';
import { User } from '../types/User';
import { AppDispatch } from '../app/store';

type CurrentTodoState = {
  todo: Todo | null;
  user: User | null;
  loading: boolean;
};

const initialState: CurrentTodoState = {
  todo: null,
  user: null,
  loading: false,
};

export const currentTodoSlice = createSlice({
  name: 'currentTodo',
  initialState,
  reducers: {
    setTodo(state, action: PayloadAction<Todo | null>) {
      return {
        ...state,
        todo: action.payload,
      };
    },
    setUser(state, action: PayloadAction<User | null>) {
      return {
        ...state,
        user: action.payload,
      };
    },
    setLoading(state, action: PayloadAction<boolean>) {
      return {
        ...state,
        loading: action.payload,
      };
    },
    clearTodo(state) {
      return {
        ...state,
        user: null,
        todo: null,
      };
    },
  },
});

export const { setTodo, setUser, setLoading, clearTodo } =
  currentTodoSlice.actions;

export const loadCurrentTodoWithUser =
  (todo: Todo) => (dispatch: AppDispatch) => {
    dispatch(setUser(null));
    dispatch(setLoading(true));

    fetch(
      `https://mate-academy.github.io/react_dynamic-list-of-todos/api/users/${todo.userId}.json`,
    )
      .then(res => {
        if (!res.ok) {
          throw new Error('Error in loading user');
        }

        return res.json();
      })
      .then((user: User) => {
        dispatch(setUser(user));
      })
      .finally(() => {
        dispatch(setLoading(false));
      });
  };

export default currentTodoSlice.reducer;
