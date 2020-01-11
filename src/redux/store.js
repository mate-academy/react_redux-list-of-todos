import { createStore } from 'redux';
import getData from '../api/getData';

const todosURL = 'https://jsonplaceholder.typicode.com/todos';
const usersURL = 'https://jsonplaceholder.typicode.com/users';

const initialState = {
  todos: [],
  sortField: 'id',
  isLoading: false,
  isLoaded: false,
  filterUsed: false,
};

export const loadTodos = async(state) => {
  state.isLoading = true;

  const [loadedTodos, loadedUsers] = await Promise.all(
    [getData(todosURL), getData(usersURL)]
  );

  state.todos = [...loadedTodos]
    .map((todo) => {
      const user = loadedUsers.find(person => person.id === state.todo.userId);

      return {
        ...todo, user,
      };
    });
  state.isLoading = false;
};

export const getSortedTodos = ({ todos, filterUsed, sortField }) => {
  const visibleTodos = [...todos];

  switch (sortField) {
    case 'id': visibleTodos
      .sort((a, b) => b.id - a.id);
      break;
    case 'completed': visibleTodos
      .sort(a => (a.completed ? -1 : 1));
      break;
    case 'user.username': visibleTodos
      .sort((a, b) => b.user.username.localeCompare(a.user.username));
      break;
    default: visibleTodos
      .sort((a, b) => b.title.localeCompare(a.title));
  }

  if (filterUsed) {
    visibleTodos.reverse();
    filterUsed = !filterUsed;
  } else {
    filterUsed = !filterUsed;
  }

  return visibleTodos;
};

const rootReducer = (state, action) => {
  switch (action.type) {
    case 'LOAD_TODOS':
      return {
        ...state,
        todos: action.sortField,
      };
    case 'SET_SORT_FIELD':
      return {
        ...state,
        todos: action.sortField,
      };
    case 'SET_LOADING':
      return {
        ...state,
        todos: action.isLoading,
      };
    case 'SET_LOADED':
      return {
        ...state,
        todos: action.isLoaded,
      };
    default:
      return state;
  }
};

const store = createStore(rootReducer, initialState);

export default store;
