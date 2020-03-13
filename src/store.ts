import { createStore, AnyAction } from 'redux';
import { StoreType, PreparedTodoType } from './utils/interfaces';

export const SET_TODOS = 'SET_TODOS';
export const SET_LOADING = 'SET_LOADING';
export const SET_LOADED = 'SET_LOADED';
export const SET_SORT_FIELD = 'SET_SORT_FIELD';
export const DELETE_TODO = 'DELETE_TODO';

export const setTodosAC = (value: PreparedTodoType[] | []) => ({
  type: SET_TODOS, value,
});
export const setLoadingAC = (value: boolean) => ({
  type: SET_LOADING, value,
});
export const setLoadedAC = (value: boolean) => ({
  type: SET_LOADED, value,
});
export const setSortFieldAC = (value: string) => ({
  type: SET_SORT_FIELD, value,
});
export const setDeleteTodoAC = (value: number) => ({
  type: DELETE_TODO, value,
});


export const getTodos = (state: StoreType) => state.todos;
export const getIsLoading = (state: StoreType) => state.isLoading;
export const getIsLoaded = (state: StoreType) => state.isLoaded;
export const getSortfield = (state: StoreType) => state.sortField;


const initialState: StoreType = {
  todos: [],
  isLoading: false,
  isLoaded: false,
  sortField: '',
};

const rootReduser = (state: StoreType | undefined, action: AnyAction): StoreType => {
  if (state === undefined) {
    return { ...initialState };
  }

  switch (action.type) {
    case SET_TODOS:
      return {
        ...state,
        todos: action.value,
      };
    case SET_LOADING:
      return {
        ...state,
        isLoading: action.value,
      };
    case SET_LOADED:
      return {
        ...state,
        isLoaded: action.value,
      };
    case SET_SORT_FIELD:
      return {
        ...state,
        sortField: action.value,
      };

    case DELETE_TODO: {
      const newTodos = state.todos.filter(todo => todo.id !== action.value);

      return {
        ...state,
        todos: newTodos,
      };
    }

    default:
      return state;
  }
};

const store = createStore(rootReduser, initialState);

export default store;
