import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import getDataServer from '../api';

export const loadTodosAndUsers = () => (dispatch) => {
  dispatch(startLoad());
  return Promise.all([
    getDataServer('todos'),
    getDataServer('users')])
    .then(([listTodo, listUsers]) => {
      const todos = listTodo
        .map(item => ({
          ...item, user: listUsers.find(person => person.id === item.userId),
        }));

      dispatch(loadData(todos, listUsers));
    })
    .catch(() => dispatch(errorOccur()));
};

export const ACTION_TYPES = {
  DELETE_TODO: 'DELETE_TODO',
  LOAD_DATA: 'LOAD_DATA',
  START_LOAD: 'START_LOAD',
  HAS_ERROR: 'HAS_ERROR',
};

export const deleteTodo = id => ({
  type: ACTION_TYPES.DELETE_TODO,
  idForDelete: id,
});

export const loadData = (todos, users) => ({
  type: ACTION_TYPES.LOAD_DATA,
  todos,
  users,
});

export const startLoad = () => ({
  type: ACTION_TYPES.START_LOAD,
});

export const errorOccur = () => ({
  type: ACTION_TYPES.HAS_ERROR,
});

const initialState = {
  todos: [],
  users: [],
  isLoading: false,
  hasError: false,
};

function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case ACTION_TYPES.DELETE_TODO:
      return ({
        ...state,
        todos: [...state.todos.filter(item => item.id !== action.idForDelete)],
      });
    case ACTION_TYPES.LOAD_DATA:
      return ({
        ...state,
        todos: [...action.todos],
        users: [...action.users],
        isLoading: false,
      });
    case ACTION_TYPES.START_LOAD:
      return ({
        ...state,
        isLoading: true,
        hasError: false,
      });
    case ACTION_TYPES.HAS_ERROR:
      return ({
        ...state,
        hasError: true,
        isLoading: false,
      });
    default:
      return state;
  }
}

export const getTodos = state => state.todos;

export const store = createStore(
  reducer,
  initialState,
  applyMiddleware(thunk)
);
