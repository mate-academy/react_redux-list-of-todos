import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { getTodos, getUsers } from './todosApi';

const START_LOADING = 'START_LOADING';
const GET_TODOS = 'GET_TODOS';
const GET_USERS = 'GET_USERS';
const PREPARE_TODOS = 'PREPARE_TODOS';
const DELETE_TODO = 'DELETE_TODO';
const SORT_BY_ID = 'SORT_BY_ID';
const SORT_BY_TITLE = 'SORT_BY_TITLE';
const SORT_BY_STATUS = 'SORT_BY_STATUS';
const SORT_BY_USER = 'SORT_BY_USER';

export const sortByTitle = title => ({
  type: SORT_BY_TITLE,
  title,
});
export const sortById = title => ({
  type: SORT_BY_ID,
  title,
});
export const sortByUser = title => ({
  type: SORT_BY_USER,
  title,
});
export const sortByStatus = title => ({
  type: SORT_BY_STATUS,
  title,
});
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
export const getTodosWithUsers = state => state.filteredTodos;

export const loadPreparedTodos = () => async(dispatch) => {
  await dispatch(startLoading());

  const todos = await getTodos();
  const users = await getUsers();
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
  filteredTodos: [],
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
        filteredTodos: action.preparedTodos,
        isLoading: false,
        isShown: false,
      };
    case DELETE_TODO:
      return {
        ...state,
        filteredTodos:
          state.filteredTodos.filter(todo => todo.id !== action.id),
        preparedTodos:
          state.preparedTodos.filter(todo => todo.id !== action.id),

      };
    case SORT_BY_TITLE:
      return state.isSorting !== action.title
        ? {
          ...state,
          filteredTodos:
          [...state.preparedTodos]
            .sort((a, b) => a.title.localeCompare(b.title)),
          isSorting: action.title,
        }
        : {
          ...state,
          filteredTodos:
          [...state.preparedTodos]
            .sort((a, b) => b.title.localeCompare(a.title)),
          isSorting: '',
        };
    case SORT_BY_ID:
      return state.isSorting !== action.title
        ? {
          ...state,
          filteredTodos:
              [...state.preparedTodos]
                .sort((a, b) => a.id - b.id),
          isSorting: action.title,
        }
        : {
          ...state,
          filteredTodos:
              [...state.preparedTodos]
                .sort((a, b) => b.id - a.id),
          isSorting: '',
        };
    case SORT_BY_STATUS:
      return state.isSorting !== action.title
        ? {
          ...state,
          filteredTodos:
                  [...state.preparedTodos]
                    .sort((a, b) => a.completed - b.completed),
          isSorting: action.title,
        }
        : {
          ...state,
          filteredTodos:
                  [...state.preparedTodos]
                    .sort((a, b) => b.completed - a.completed),
          isSorting: '',
        };
    case SORT_BY_USER:
      return state.isSorting !== action.title
        ? {
          ...state,
          filteredTodos:
              [...state.preparedTodos]
                .sort((a, b) => a.user.name.localeCompare(b.user.name)),
          isSorting: action.title,
        }
        : {
          ...state,
          filteredTodos:
              [...state.preparedTodos]
                .sort((a, b) => b.user.name.localeCompare(a.user.name)),
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
