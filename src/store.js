import { createStore } from 'redux';

export const todosURL = 'https://jsonplaceholder.typicode.com/todos';
export const usersURL = 'https://jsonplaceholder.typicode.com/users';

export const titles = ['id', 'title', 'completed', 'user', 'remove'];

const initialState = {
  fullTodos: [],
  currentSortingTitle: '',
};

export const SET_FULL_TODOS = 'setFullTodos';
export const SET_SORTING_TITLE = 'setSortingTitle';

const reducer = (state, action) => {
  switch (action.type) {
    case SET_FULL_TODOS:
      return {
        ...state,
        fullTodos: action.value,
      };
    case SET_SORTING_TITLE:
      return {
        ...state,
        currentSortingTitle: action.value,
      };
    default:
      return state;
  }
};

const store = createStore(reducer, initialState);

export default store;
