import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';

const ACTION_TYPES = {
  ADD_TODOS: 'ADD::TODOS',
  TOGGLE_LOADING: 'TOGGLE::LOADING',
  SWITCH_SORT: 'SWITCH::SORT',
  DELETE_TODO: 'DELETE::TODO',
};

const initialState = {
  todos: [],
  sortedTodos: [],
  isLoading: false,
  isLoaded: false,
  isSorted: false,
  selectedSort: 'Do not sort',
};

export const addTodos = todos => ({
  type: ACTION_TYPES.ADD_TODOS,
  payload: todos,
});

export const toggleLoading = isLoading => ({
  type: ACTION_TYPES.TOGGLE_LOADING,
  payload: isLoading,
});

export const sortTodos = value => ({
  type: ACTION_TYPES.SWITCH_SORT,
  payload: value,
});

export const deleteTodo = id => ({
  type: ACTION_TYPES.DELETE_TODO,
  payload: id,
});

export const getTodos = () => (dispatch) => {
  dispatch(toggleLoading(true));

  Promise.all([
    fetch('https://jsonplaceholder.typicode.com/todos'),
    fetch('https://jsonplaceholder.typicode.com/users'),
  ])
    .then(([todos, users]) => Promise.all([todos.json(), users.json()]))
    .then(([todos, users]) => {
      const usersMap = users
        .reduce((acc, currentUser) => ({
          ...acc,
          [currentUser.id]: currentUser.name,
        }), {});

      const preparedTodos = todos.map(todo => ({
        ...todo,
        user: usersMap[todo.userId],
      }));

      dispatch(addTodos(preparedTodos));
      dispatch(toggleLoading('loaded'));
    });
};

function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case ACTION_TYPES.ADD_TODOS: {
      return {
        ...state,
        todos: [
          ...action.payload,
        ],
        sortedTodos: [
          ...action.payload,
        ],
      };
    }

    case ACTION_TYPES.TOGGLE_LOADING: {
      return {
        ...state,
        isLoading: true,
        isLoaded: action.payload === 'loaded',
      };
    }

    case ACTION_TYPES.SWITCH_SORT: {
      return {
        ...state,
        sortedTodos: [...state.todos].sort((a, b) => {
          if (action.payload === 'By user name') {
            return a.user.localeCompare(b.user);
          }

          if (action.payload === 'By title') {
            return a.title.localeCompare(b.title);
          }

          if (action.payload === 'TODO/Completed') {
            return a.completed ? 1 : -1;
          }
        }),
        isSorted: action.payload !== 'Do not sort',
        selectedSort: action.payload,
      };
    }

    case ACTION_TYPES.DELETE_TODO: {
      const todos = state.todos.filter(el => el.id !== action.payload);
      const sortedTodos = state.sortedTodos
        .filter(el => el.id !== action.payload);

      return {
        ...state,
        todos,
        sortedTodos,
      };
    }

    default:
      return state;
  }
}

export const store = createStore(reducer, applyMiddleware(thunk));
