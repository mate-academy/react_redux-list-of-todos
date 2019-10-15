import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

const TODOS_URL = 'https://jsonplaceholder.typicode.com/todos';
const USERS_URL = 'https://jsonplaceholder.typicode.com/users';

const initialState = {
  todos: [],
  users: [],
  preparedTodos: [],
  sortMethod: 'default',
  isLoading: false,
};

function getTodosWithUsers(todosList, usersList) {
  return todosList.map(todo => ({
    ...todo,
    user: usersList.find(user => user.id === todo.userId),
  }));
}

const ACTION_TYPES = {
  START_DATA_LOADING: 'START_DATA_LOADING',
  SET_DATA_TO_STORE: 'SET_DATA_TO-STORE',
  SORT_DATA: 'SORT_DATA',
  SORT_TYPE: 'SORT_TYPE',

};

const startLoading = data => ({
  type: ACTION_TYPES.START_DATA_LOADING,
  payload: data,
});

const setDataToStore = data => ({
  type: ACTION_TYPES.SET_DATA_TO_STORE,
  payload: data,
});

const sortData = () => ({
  type: ACTION_TYPES.SORT_DATA,
});

export function sortType(value) {
  return {
    type: ACTION_TYPES.SORT_TYPE,
    payload: value,
  };
}

export const loadData = () => (dispatch) => {
  store.dispatch(startLoading());
  Promise.all([
    fetch(TODOS_URL),
    fetch(USERS_URL),
  ])
    .then(([resTodos, resUsers]) => Promise.all(
      [resTodos.json(), resUsers.json()]
    ))
    .then(([dataTodos, dataUsers]) => {
      store.dispatch(setDataToStore(getTodosWithUsers(dataTodos, dataUsers)));
      store.dispatch(startLoading());
    });
};

export const sortTodos = (todos, sortMethod) => {
  switch (sortMethod) {
    case 'title':
      return todos.sort((a, b) => (a.title.localeCompare(b.title)));
    case 'status':
      return todos.sort((a, b) => a.completed - b.completed);
    case 'user':
      return todos.sort((a, b) => a.user.name.localeCompare(b.user.name));
    default:
      return todos;
  }
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_TYPES.START_DATA_LOADING:
      return {
        ...state,
        isLoading: !state.isLoading,
      };
    case ACTION_TYPES.SET_DATA_TO_STORE:
      return {
        ...state,
        todos: action.payload,
      };
    case ACTION_TYPES.SORT_TYPE:
      const { todos } = state;

      return {
        ...state,
        sortMethod: action.payload,
        todos: sortTodos(todos, action.payload),
      };
    case ACTION_TYPES.SORT_DATA:

      return {
        ...state,
        todos: sortTodos(state.todos, state.sortMethod),
      };
    default:
      return state;
  }
};

const store = createStore(
  reducer,
  applyMiddleware(thunk),
);

export default store;
