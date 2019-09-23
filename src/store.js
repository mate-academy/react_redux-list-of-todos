import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import getTodosWithUsers from './getUserTodo';

const START_LOADING = 'START_LOADING';
const HANDLE_SUCCESS = 'HANDLE_SUCCESS';
const HANDLE_ERROR = 'HANDLE_ERROR';
const DELETE_TODO = 'DELETE_TODO';
const FILTER_TODO = 'FILTER_TODO';

export const startLoading = () => ({ type: START_LOADING });
export const handleError = () => ({ type: HANDLE_ERROR });
export const filterTodo = value => ({ type: FILTER_TODO, value });
export const handleSuccess = todos => ({
  type: HANDLE_SUCCESS,
  todos,
});
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
      };
    case HANDLE_ERROR:
      return {
        ...state,
        isLoading: false,
        hasError: true,
      };
    case DELETE_TODO:
      return {
        ...state,
        todos: state.todos.filter(todo => todo.id !== action.value),
      };
      case FILTER_TODO:
          console.log(action.value)
      return {
        ...state,
        todos: state.todos.sort((a,b) => a > b),
      };
    default:
      return state;
  }
};

const initialState = {
  todos: [],
  isLoading: false,
  hasError: false,
};

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(
    applyMiddleware(thunk)
  )
);

export default store;
