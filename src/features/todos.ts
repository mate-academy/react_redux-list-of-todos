import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Todo } from '../types/Todo';
import { AppDispatch } from '../app/store';

type TodosState = {
  todos: Todo[];
  loading: boolean;
};

const initialState: TodosState = {
  todos: [],
  loading: false,
};

export const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    setTodos(state, action: PayloadAction<Todo[]>) {
      return {
        ...state,
        todos: action.payload,
      };
    },
    setLoading(state, action: PayloadAction<boolean>) {
      return {
        ...state,
        loading: action.payload,
      };
    },
  },
});

export const { setTodos, setLoading } = todosSlice.actions;

export const loadTodos = () => (dispatch: AppDispatch) => {
  dispatch(setLoading(true));

  fetch(
    'https://mate-academy.github.io/react_dynamic-list-of-todos/api/todos.json',
  )
    .then(res => {
      if (!res.ok) {
        throw new Error('Ошибка загрузки данных');
      }

      return res.json();
    })
    .then((data: Todo[]) => {
      dispatch(setTodos(data));
    })
    .finally(() => {
      dispatch(setLoading(false));
    });
};

export default todosSlice.reducer;
