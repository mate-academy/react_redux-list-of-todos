import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { getTodos } from '../api/getTodos';
import { getUsers } from '../api/getUsers';

const ACTION_TYPES = {
  LOADING: 'LOADING',
  GET_DATA: 'GET_DATA',
  SORT_USER: 'SORT_USER',
  SORT_STATUS: 'SORT_STATUS',
  SORT_TITLE: 'SORT_TITLE',
};

export const loading = () => ({
  type: ACTION_TYPES.LOADING,
});

export const getData = data => ({
  type: ACTION_TYPES.GET_DATA,
  payload: data,
});

export const sortByUser = () => ({
  type: ACTION_TYPES.SORT_USER,
});

export const sortByStatus = () => ({
  type: ACTION_TYPES.SORT_STATUS,
});

export const sortByTitle = () => ({
  type: ACTION_TYPES.SORT_TITLE,
});

const getTodosWithUsers = (todoArr, userArr) => todoArr.map(todo => ({
  ...todo,
  user: userArr.find(item => item.id === todo.userId),
}));

export const dataLoading = () => (dispatch) => {
  store.dispatch(loading());
  Promise.all([getTodos(), getUsers()]).then(([todos, users]) => {
    store.dispatch(getData(getTodosWithUsers(todos, users)));
    store.dispatch(loading());
  });
};

const initialState = {
  todos: [],
  isLoading: false,
};

function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case ACTION_TYPES.LOADING:
      return {
        ...state,
        isLoading: !state.isLoading,
      };

    case ACTION_TYPES.GET_DATA:
      return {
        ...state,
        todos: action.payload,
      };

    case ACTION_TYPES.SORT_USER:
      return {
        ...state,
        todos: [...state.todos].sort((a, b) => (a.user.name - b.user.name === 1 ? 1 : -1)),
      };

    case ACTION_TYPES.SORT_STATUS:
      return {
        ...state,
        todos: [...state.todos].sort((a, b) => (a.title - b.title === 1 ? 1 : -1)),
      };

    case ACTION_TYPES.SORT_TITLE:
      return {
        ...state,
        todos: [...state.todos].sort((a, b) => (a.completed - b.completed === 1 ? 1 : -1)),
      };

    default:
      return state;
  }
}

export const store = createStore(reducer, applyMiddleware(thunk));
