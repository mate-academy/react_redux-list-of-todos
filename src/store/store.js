import { createStore } from 'redux';

const START_LOADING = 'START_LOADING';
const HANDLE_SUCCESS = 'HANDLE_SUCCESS';
const HANDLE_ERROR = 'HANDLE_ERROR';
const TODO_DELETE = 'TODO_DELETE';
const TYPES_SORT_TODOS = {
  title: 'SORT_BY_TITLE',
  status: 'SORT_BY_STATUS',
  user: 'SORT_BY_USER',
};

export const createActionSortTodos = (event) => {
  const { value } = event.target;

  return {
    type: TYPES_SORT_TODOS[value],
  };
};

export const createActionStartLoading = () => ({
  type: START_LOADING,
});

export const createActionHandleSuccess = combineData => ({
  type: HANDLE_SUCCESS,
  combineData,
});

export const createActionHandleError = () => ({
  type: HANDLE_ERROR,
});

export const createActionDeleteTodo = id => ({
  type: TODO_DELETE,
  id,
});

const initialState = {
  combineData: [],
  isLoading: false,
  hasError: false,
  sortedList: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case START_LOADING:
      return {
        ...state,
        isLoading: true,
        hasError: false,
      };
    case HANDLE_SUCCESS:
      return {
        ...state,
        combineData: action.combineData,
        isLoading: false,
      };
    case HANDLE_ERROR:
      return {
        ...state,
        isLoading: false,
        hasError: true,
      };
    case TODO_DELETE:
      return {
        ...state,
        combineData: state.combineData
          .filter(todo => todo.id !== action.id),
      };
    case TYPES_SORT_TODOS.title:
      return {
        ...state,
        combineData: [...state.combineData]
          .sort((prev, next) => (prev.title.localeCompare(next.title))),
      };
    case TYPES_SORT_TODOS.status:
      return {
        ...state,
        combineData: [...state.combineData]
          .sort((prev, next) => prev.completed - next.completed),
      };
    case TYPES_SORT_TODOS.user:
      return {
        ...state,
        combineData: [...state.combineData]
          .sort((prev, next) => (prev.user.name.localeCompare(next.user.name))),
      };

    default:
      return state;
  }
};

const store = createStore(reducer, initialState);

export default store;
