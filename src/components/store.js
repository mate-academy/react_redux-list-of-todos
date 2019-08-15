import { createStore } from 'redux';

const SET_TODOS = 'setTodos';
const SET_LOADING = 'setLoading';
const SORT_BY_NAME = 'name';
const SORT_BY_TITLE = 'title';
const SORT_BY_ID = 'id';

export const getTodos = state => state.todos;
export const getIsLoaded = state => state.isLoaded;
export const getIsLoading = state => state.isLoading;

export const changeIsLoading = () => ({ type: SET_LOADING });
export const setTodos = value => ({ type: SET_TODOS, value });
export const sortById = () => ({ type: SORT_BY_ID });
export const sortByName = () => ({ type: SORT_BY_NAME });
export const sortByTitle = () => ({ type: SORT_BY_TITLE });

const reducer = (state, action) => {
  switch (action.type) {
    case SET_TODOS:
      return {
        ...state,
        todos: action.value,
        isLoaded: true,
        isLoading: false,
      };

    case SET_LOADING:
      return {
        ...state,
        isLoading: true,
      }

    case SORT_BY_NAME:
      return state.sortField === SORT_BY_NAME
        ? {
          ...state,
          todos: [...state.todos].reverse(),
        }
        : {
          ...state,
          todos: [...state.todos].sort((a, b) => a.user.name.localeCompare(b.user.name)),
          sortField: SORT_BY_NAME
        }

    case SORT_BY_TITLE:
        return state.sortField === SORT_BY_TITLE
          ? {
            ...state,
            todos: [...state.todos].reverse(),
          }
          : {
            ...state,
            todos: [...state.todos].sort((a, b) => a.title.localeCompare(b.title)),
            sortField: SORT_BY_TITLE
          }

    case SORT_BY_ID:
      return state.sortField === SORT_BY_ID
        ? {
          ...state,
          todos: [...state.todos].reverse(),
        }
        : {
          ...state,
          todos: [...state.todos].sort((a, b) => a.id - b.id),
          sortField: SORT_BY_ID
        }

    default:
      return state;
  }
}

const initialState = {
  todos: [],
  isLoaded: false,
  isLoading: false,
  sortField: 'id',
  currentField: 'id',
};

const store = createStore(reducer, initialState);

export default store;
