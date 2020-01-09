import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { getTodosFromServer } from './api/todos';
import { getUsersFromServer } from './api/users';

const LOADING = 'LOADING';
const STARTED = 'STARTED';
const HANDLE_SUCCESS = 'HANDLE_SUCCESS';
const DELETE_TODO = 'DELETE_TODO';
const SORT_BY_TITLE = 'SORT_BY_TITLE';
const SORT_BY_LENGTH = 'SORT_BY_LENGTH';

export const isLoading = () => ({ type: LOADING });
export const isStarted = () => ({ type: STARTED });
export const handleSuccess = todosWithUsers => ({
  type: HANDLE_SUCCESS, todosWithUsers,
});
export const deleteTodo = id => ({
  type: DELETE_TODO, id,
});
export const sortByTitle = () => ({ type: SORT_BY_TITLE });
export const sortByLength = () => ({ type: SORT_BY_LENGTH });

export const loadTodos = () => async(dispatch) => {
  dispatch(isLoading());

  const todos = await getTodosFromServer();
  const users = await getUsersFromServer();

  dispatch(handleSuccess(todos.map(todo => ({
    ...todo,
    user: users.find(user => user.id === todo.userId),
  }))),
  dispatch(isStarted));
};

const initialState = {
  todosWithUsers: [],
  handleSuccess: [],
  isLoading: false,
  isStarted: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case LOADING:
      return {
        ...state,
        isLoading: true,
        isStarted: true,
      };

    case STARTED:
      return {
        ...state,
        isLoading: false,
        isStarted: true,
      };

    case HANDLE_SUCCESS:
      return {
        ...state,
        todosWithUsers: action.todosWithUsers,
        isLoading: false,
        isStarted: true,
      };

    case DELETE_TODO:
      return {
        ...state,
        todosWithUsers: state.todosWithUsers
          .filter(todo => todo.id !== action.id),
      };

    case SORT_BY_TITLE:
      return {
        ...state,
        todosWithUsers: state.todosWithUsers
          .sort((a, b) => a.title.localeCompare(b.title)),
      };

    case SORT_BY_LENGTH:
      return {
        ...state,
        todosWithUsers: state.todosWithUsers
          .sort((a, b) => a.title.length - b.title.length),
      };

    default:
      return state;
  }
};

const store = createStore(
  reducer,
  initialState,
  applyMiddleware(thunk),
);

export default store;
