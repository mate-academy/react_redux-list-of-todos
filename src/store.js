import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { getTodosAndUsers } from './api';

const START_LOADING = 'START_LOADING';
const HANDLE_SUCCESS = 'HANDLE_SUCCESS';
const HANDLE_ERROR = 'HANDLE_ERROR';
const HANDLE_SORT = ' HANDLE_SORT';
const HANDLE_REMOVE = 'HANDLE_REMOVE';

export const startLoading = () => ({ type: START_LOADING });
export const handleError = () => ({ type: HANDLE_ERROR });

export const handleSuccess = todos => ({
  type: HANDLE_SUCCESS,
  todos,
});

export const handleSort = sortField => ({
  type: HANDLE_SORT,
  sortField,
});

export const handleRemove = id => ({
  type: HANDLE_REMOVE,
  id,
});

export const getIsLoading = state => state.isLoading;
export const getIsLoaded = state => state.isLoaded;
export const getHasError = state => state.hasError;
export const getTodos = state => state.todos;
export const getSortField = state => state.sortField;
export const getSortedAsc = state => state.sortedAsc;

export const loadTodos = () => async(dispatch) => {
  dispatch(startLoading());

  try {
    const [usersFromServer, todosFromServer] = await getTodosAndUsers();
    const newTodos = todosFromServer.map(todo => ({
      ...todo,
      user: usersFromServer.find(user => user.id === todo.userId),
    }));

    dispatch(handleSuccess(newTodos));
  } catch {
    dispatch(handleError());
  }
};

const initialState = {
  todos: [],
  isLoading: false,
  isLoaded: false,
  hasError: false,
  sortField: 'id',
  sortedAsc: true,
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
        todos: action.todos,
        isLoading: false,
        isLoaded: true,
      };

    case HANDLE_ERROR:
      return {
        ...state,
        hasError: true,
        isLoading: false,
      };

    case HANDLE_SORT:
      return {
        ...state,
        sortField: action.sortField,
        sortedAsc: action.sortField === state.sortField
          ? !state.sortedAsc : true,
        todos: action.sortField === state.sortField
          ? [...state.todos].reverse()
          : [...state.todos]
            .sort((todoA, todoB) => {
              const comparator1 = todoA[action.sortField]
                || todoA.user[action.sortField];
              const comparator2 = todoB[action.sortField]
                || todoB.user[action.sortField];

              return typeof comparator1 === 'number'
                ? comparator1 - comparator2
                : String(comparator1).localeCompare(String(comparator2));
            }),
      };

    case HANDLE_REMOVE:
      return {
        ...state,
        todos: state.todos.filter(todo => todo.id !== action.id),
      };

    default:
      return state;
  }
};

const store = createStore(reducer, initialState, applyMiddleware(thunk));

export default store;
