import { AnyAction, createStore } from 'redux';

export const initialState: RootState = {
  isLoading: false,
  todos: [],
  typeOfSort: '',
};

export const IS_LOADING = 'IS_LOADING';
export const SET_TODOS = 'SET_TODOS';
export const SET_SORT_TYPE = 'SET_SORT_TYPE';
export const DELETE_TODO = 'DELETE_TODO';

export const setIsLoadind = (val: boolean) => ({
  type: IS_LOADING,
  isLoading: val,
});

export const setTodos = (preparedTodos: PreparedTodo[]) => ({
  type: SET_TODOS,
  todos: preparedTodos,
});

export const deleteTodo = (id: number) => ({
  type: DELETE_TODO,
  id,
});

export const setSortType = (sortType: string) => ({
  type: SET_SORT_TYPE,
  typeOfSort: sortType,
});

export const rootReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case IS_LOADING:
      return {
        ...state,
        isLoading: action.isLoading,
      };
    case SET_TODOS:
      return {
        ...state,
        todos: action.todos,
      };
    case setSortType:
      return {
        ...state,
        typeOfSort: action.typeOfSort,
      };
    default:
      return state;
  }
};

export const store = createStore(rootReducer, initialState);
