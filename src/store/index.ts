import { createStore, AnyAction } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

const START_LOADING = 'START_LOADING';
const SET_TODOS = 'SET_TODOS';
const SET_ERROR = 'SET_ERROR';
const FINISH_LOADING = 'FINISH_LOADING';
const DELETE_TODO = 'DELETE_TODO';
const SORT_TODO = 'SORT_TODO';

export const startLoading = () => ({
  type: START_LOADING,
});
export const setTodos = (todos: PreparedTodos) => ({
  type: SET_TODOS,
  todos,
});

export const setError = (error = '') => ({
  type: SET_ERROR,
  error,
});

export const finishLoading = (message = '') => ({
  type: FINISH_LOADING,
  message,
});
export const deleteTask = (data: number) => ({
  type: DELETE_TODO,
  id: data,
});
export const sortTodo = (sortByField: string) => ({
  type: SORT_TODO,
  sortByField,
});

export const isLoading = (state: RootState) => state.loading;
export const loadSortButtons = (state: RootState) => state.loadSortButtons;
export const getSortedTodos = (state: RootState) => {
  switch (state.sortByField) {
    case 'Name':
      return [...state.todos]
        .sort((a, b) => a.user.name.localeCompare(b.user.name));
    case 'Title':
      return [...state.todos]
        .sort((a, b) => a.title.localeCompare(b.title));
    case 'Status':
      return [...state.todos]
        .sort((a, b) => Number(a.completed) - Number(b.completed));
    default:
      return [...state.todos];
  }
};

export type RootState = {
  loading: boolean;
  todos: PreparedTodos[];
  loadSortButtons: boolean;
  message: string;
  sortByField: string;
};

const initialState: RootState = {
  loading: false,
  todos: [],
  loadSortButtons: false,
  message: '',
  sortByField: '',
};

const rootReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case START_LOADING:
      return {
        ...state,
        loading: true,
        loadSortButtons: true,
      };

    case SET_TODOS:
      return {
        ...state,
        todos: [...action.todos],
      };

    case FINISH_LOADING:
      return {
        ...state,
        loading: false,
      };

    case DELETE_TODO:
      return {
        ...state,
        todos: state.todos.filter(todo => todo.id !== action.id),
      };

    case SORT_TODO:
      return {
        ...state,
        sortByField: action.sortByField,
      };

    default:
      return state;
  }
};

const store = createStore(
  rootReducer,
  composeWithDevTools(),
);

export default store;
