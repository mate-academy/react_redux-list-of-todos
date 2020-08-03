import { createStore, AnyAction } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { TodosWithUser } from '../interfaces';

const TOGGLE_LOADING = 'TOGGLE_LOADING';
const GET_TODOS = 'GET_TODOS';
const SET_FILTER = 'SET_FILTER';
const DELETE_TODO = 'DELETE_TODO';

export const toggleLoading = () => ({ type: TOGGLE_LOADING });
export const getNewTodos = (todos: TodosWithUser[]) => ({ type: GET_TODOS, todos });
export const setFilter = (filterType: string) => ({ type: SET_FILTER, filterType });
export const deleteTodo = (todoId: number) => ({ type: DELETE_TODO, todoId });

export const getTodos = (state: RootState) => state.todos;
export const isLoading = (state: RootState) => state.loading;
export const getFilter = (state: RootState) => state.filterType;

export type RootState = {
  todos: TodosWithUser[];
  loading: boolean;
  filterType: string;
};

const initialState: RootState = {
  todos: [],
  loading: false,
  filterType: '',
};

const rootReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case TOGGLE_LOADING:
      return { ...state, loading: !state.loading };
    case GET_TODOS:
      return { ...state, todos: action.todos };
    case SET_FILTER:
      return { ...state, filterType: action.filterType };
    case DELETE_TODO:
      return {
        ...state,
        todos: [...state.todos].filter(todo => todo.id !== action.todoId),
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
