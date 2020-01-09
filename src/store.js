import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { getTodos, getUsers } from './todosApi';

const START_LOADING = 'START_LOADING';
const GET_TODOS = 'GET_TODOS';
const GET_USERS = 'GET_USERS';
const PREPARE_TODOS = 'PREPARE_TODOS';
const DELETE_TODO = 'DELETE_TODO';
const SORT_BY_TYPE = 'SORT_BY_TYPE';

export const sortByType = title => ({
  type: SORT_BY_TYPE,
  title,
});

const getSortMethod = (title) => {
  switch (title) {
    case 'id':
      return (a, b) => a[title] - b[title];

    case 'title':
      return (a, b) => a[title].localeCompare(b[title]);

    case 'status':
      return (a, b) => a.completed - b.completed;

    case 'user':
      return (a, b) => a.user.name.localeCompare(b.user.name);

    default: return undefined;
  }
};

export const startLoading = () => ({ type: START_LOADING });
export const deleteTodo = id => ({
  type: DELETE_TODO,
  id,
});

export const getTodosFromServer = todos => ({
  type: GET_TODOS,
  todos,
});
export const getUsersFromServer = users => ({
  type: GET_USERS,
  users,
});
export const prepareTodos = preparedTodos => ({
  type: PREPARE_TODOS,
  preparedTodos,
});

export const getIsloading = state => state.isLoading;
export const getisShown = state => state.isShown;
export const getTodosWithUsers = state => state.preparedTodos;

export const loadPreparedTodos = () => async(dispatch) => {
  await dispatch(startLoading());

  const [todos, users] = await Promise.all([getTodos(), getUsers()]);

  const preparedTodos = await todos.map((todo) => {
    const user = users.find(person => person.id === todo.userId);

    return {
      ...todo,
      user,
    };
  });

  dispatch(getTodosFromServer(todos));
  dispatch(getUsersFromServer(users));
  dispatch(prepareTodos(preparedTodos));
};

const initialState = {
  todos: [],
  users: [],
  isLoading: false,
  isShown: true,
  isSorting: 'id',
  preparedTodos: [],
};

const reducer = (state = null, action) => {
  switch (action.type) {
    case START_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case GET_TODOS:
      return {
        ...state,
        todos: action.todos,

      };
    case GET_USERS:
      return {
        ...state,
        users: action.users,
      };
    case PREPARE_TODOS:
      return {
        ...state,
        preparedTodos: action.preparedTodos,
        isLoading: false,
        isShown: false,
      };
    case DELETE_TODO:
      return {
        ...state,
        preparedTodos:
          state.preparedTodos.filter(todo => todo.id !== action.id),

      };
    case SORT_BY_TYPE:
      return state.isSorting !== action.title
        ? {
          ...state,
          preparedTodos:
          [...state.preparedTodos]
            .sort(getSortMethod(action.title)),
          isSorting: action.title,
        }
        : {
          ...state,
          preparedTodos:
            [...state.preparedTodos].reverse(),
          isSorting: '',
        };
    default: return state;
  }
};

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;
