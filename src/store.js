import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import getTodosWithUsers from './getUserTodo';

const START_LOADING = 'START_LOADING';
const HANDLE_SUCCESS = 'HANDLE_SUCCESS';
const HANDLE_ERROR = 'HANDLE_ERROR';
const DELETE_TODO = 'DELETE_TODO';
const SORTED_BY_NAME = 'SORTED_BY_NAME';
const SORTED_BY_ID = 'SORTED_BY_ID';
const SORTED_BY_TITLE = 'SORTED_BY_TITLE';
const SORTED_BY_COMPLETED = 'SORTED_BY_COMPLETED';

export const sortedByCompleted = () => ({ type: SORTED_BY_COMPLETED });
export const sortedByTitle = () => ({ type: SORTED_BY_TITLE });
export const startLoading = () => ({ type: START_LOADING });
export const handleError = () => ({ type: HANDLE_ERROR });
export const handleSuccess = todos => ({
  type: HANDLE_SUCCESS,
  todos,
});
export const sortedbyId = () => ({ type: SORTED_BY_ID });
export const sortedbyName = value => ({ type: SORTED_BY_NAME });
export const deleteTodo = value => ({ type: DELETE_TODO, value });
export const loadTodos = () => (dispatch) => {
  dispatch(startLoading());

  return getTodosWithUsers()
    .then(todos => dispatch(handleSuccess(todos)))
    .catch(() => dispatch(handleError()));
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
        isLoading: false,
        todos: action.todos,
        sortedTodos: action.todos,
      };
    case HANDLE_ERROR:
      return {
        ...state,
        isLoading: false,
        hasError: true,
      };
    case SORTED_BY_NAME:
      return {
        ...state,
        order: state.order === 1 ? -1 : 1,
        todos: [...state.sortedTodos].sort((a, b) => (
          state.order * (a.user.name.localeCompare(b.user.name))
        )),
      };
    case SORTED_BY_TITLE:
      return {
        ...state,
        order: state.order === 1 ? -1 : 1,
        todos: [...state.sortedTodos].sort((a, b) => (
          state.order * (a.title.localeCompare(b.title))
        )),
      };
    case DELETE_TODO:
      return {
        ...state,
        todos: state.todos.filter(todo => todo.id !== action.value),
      };
    case SORTED_BY_ID:
      return {
        ...state,
        order: state.order === 1 ? -1 : 1,
        todos: [...state.sortedTodos].sort((a, b) => (
          a.id - b.id
        )),
      };
    case SORTED_BY_COMPLETED:
      return {
        ...state,
        order: state.order === 1 ? -1 : 1,
        todos: [...state.sortedTodos].sort((a, b) => (
          a.completed - b.completed
        )),
      };
    default:
      return state;
  }
};

const initialState = {
  todos: [],
  sortedTodos: [],
  order: 1,
  isLoading: false,
  hasError: false,
};

const store = createStore(
  reducer,
  initialState,
  applyMiddleware(thunk),
);

export default store;
