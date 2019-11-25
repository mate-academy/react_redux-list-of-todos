import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import loadData from '../api/api';

const START_LOADING = 'START_LOADING';
const HANDLE_ERROR = 'HANDLE_ERROR';
const HANDLE_SUCCESS = 'HANDLE_SUCCESS';
const HANDLE_SORT = 'HANDLE_SORT';
const GET_DATA = 'GET_DATA'

const usersUrl = 'https://jsonplaceholder.typicode.com/users';
const todosUrl = 'https://jsonplaceholder.typicode.com/todos';

const getTodosWithUsers = (todos, users) => ({
  type: GET_DATA,
  todos,
  users,
});

export const getData = () => (dispatch) => {
  dispatch(startLoading());

  Promise.all([loadData(todosUrl), loadData(usersUrl)])
    .then(([todos, users]) => {
      dispatch(startLoading());
      dispatch(getTodosWithUsers(todos, users));
      dispatch(handleSuccess());
    })
    .catch(() => dispatch(handleError()));
};

export const startLoading = () => ({ type: START_LOADING });
export const handleError = () => ({ type: HANDLE_ERROR });

export const handleSort = event => ({
  type: HANDLE_SORT,
  event,
});

export const handleSuccess = todosWithUsers => ({
  type: HANDLE_SUCCESS,
  todosWithUsers,
});

const initialState = {
  isLoading: false,
  todosWithUsers: [],
  hasError: false,
};

const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case HANDLE_SORT:
      return {
        ...state,
        todosWithUsers: [...state.todosWithUsers].sort((a, b) => {
          switch (action.event) {
            case 'userName':
              return a.user.name.localeCompare(b.user.name);
            case 'completed':
              return b.completed - a.completed;
            default:
              return a.title.localeCompare(b.title);
          }
        }),
      };
    case START_LOADING:
      return {
        ...state,
        isLoading: true,
        hasError: false,
      };
    case HANDLE_ERROR:
      return {
        ...state,
        isLoading: false,
        hasError: true,
      };
    case HANDLE_SUCCESS:
      return {
        ...state,
        isLoading: false,
      };
    case GET_DATA:
      return {
        ...state,
        todosWithUsers: action.todos.map(todo => ({
          ...todo,
          user: action.users.find(user => user.id === todo.userId),
        })),
      };
    default:
      return state;
  }
};

export const store = createStore(reducer, applyMiddleware(thunk));
