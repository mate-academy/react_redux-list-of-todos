import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import getDataFromServer from '../api/apiData';

const APIUSERS_URl = 'https://jsonplaceholder.typicode.com/users';
const APITODOS_URl = 'https://jsonplaceholder.typicode.com/todos';

function getTodosWithUsers(todos, users) {
  return todos.map(todo => (
    {
      ...todo,
      user: users.find(user => user.id === todo.userId),
    }
  ));
}

const ACTION_TYPES = {
  SORT_TODOS: 'TODOS::SORT',
  RESET_TODOS: 'TODOS::RESET',
  SET_DATA_TO_STORE: 'TODOS::TO-STORE',
  ISLOADING_TODOS: 'TODOS::ISLOADING',
  DELETE_TODO: 'TODOS::DELETE-TODO',
};

export const sortTodos = () => ({
  type: ACTION_TYPES.SORT_TODOS,
});

export const resetTodos = () => ({
  type: ACTION_TYPES.RESET_TODOS,
});

export const deleteTodo = itemId => ({
  type: ACTION_TYPES.DELETE_TODO,
  payload: itemId,
});

const dataToStore = data => ({
  type: ACTION_TYPES.SET_DATA_TO_STORE,
  payload: data,
});

const toogleLoadingMode = () => ({
  type: ACTION_TYPES.ISLOADING_TODOS,
});

export const getTodos = () => (dispatch) => {
  console.log('fetch');
  store.dispatch(toogleLoadingMode());
  Promise
    .all([getDataFromServer(APITODOS_URl), getDataFromServer(APIUSERS_URl)])
    .then(([todos, users]) => {
      store.dispatch(dataToStore(getTodosWithUsers(todos, users)));
      store.dispatch(toogleLoadingMode());
    });
};

const initialState = {
  todos: [],
  originalTodos: [],
  isLoading: false,
};

function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case ACTION_TYPES.SORT_TODOS:
      return {
        ...state,
        todos: [...state.todos].sort((a, b) => {
          if (a.title > b.title) {
            return 1;
          }
          if (a.title < b.title) {
            return -1;
          }
          return 0;
        }),
      };
    case ACTION_TYPES.SET_DATA_TO_STORE:
      return {
        ...state,
        todos: action.payload,
        originalTodos: action.payload,
      };
    case ACTION_TYPES.ISLOADING_TODOS:
      return {
        ...state,
        isLoading: !state.isLoading,
      };
    case ACTION_TYPES.RESET_TODOS:
      return {
        ...state,
        todos: [...state.originalTodos],
      };
    case ACTION_TYPES.DELETE_TODO:
      return {
        ...state,
        todos: [...state.todos].filter(item => item.id !== action.payload),
      };
    default:
      return state;
  }
}

export const store = createStore(
  reducer,
  applyMiddleware(thunk),
);
