import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';

const BASE_URL = 'https://jsonplaceholder.typicode.com';

const ACTION_TYPES = {
  START_LOADING: 'TOGGLE_LOADING',
  HANDLE_SUCCESS: 'HANDLE_SUCCESS',
  HANDLE_ERROR: 'HANDLE_ERROR',
  SORT_BY_TITLE: 'SORT_BY_TITLE',
  DELETE_ITEM: 'DELETE_ITEM',
};

export const startLoading = () => ({
  type: ACTION_TYPES.START_LOADING,
});

export const addData = data => ({
  type: ACTION_TYPES.HANDLE_SUCCESS,
  payload: data,
});

export const handleError = () => ({
  type: ACTION_TYPES.HANDLE_ERROR,
});

export const sortByTitle = () => ({
  type: ACTION_TYPES.SORT_BY_TITLE,
});

export const deleteTodo = id => ({
  type: ACTION_TYPES.DELETE_ITEM,
  payload: id,
});

export const loadTodos = () => (dispatch) => {
  dispatch(startLoading());

  Promise.all([
    fetch(`${BASE_URL}/todos`),
    fetch(`${BASE_URL}/users`),
  ])
    .then(([todos, users]) => Promise.all([todos.json(), users.json()]))
    .then(([todos, users]) => {
      const todosWithUsers = todos.map(todo => ({
        ...todo,
        user: users.find(user => user.id === todo.userId),
      }));

      dispatch(addData(todosWithUsers));
    })
    .catch(() => dispatch(handleError()));
};

const initialState = {
  todos: [],
  isLoaded: false,
  isLoading: false,
  hasError: false,
};

function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case ACTION_TYPES.START_LOADING: {
      return {
        ...state,
        isLoading: true,
        hasError: false,
      };
    }

    case ACTION_TYPES.HANDLE_SUCCESS: {
      return {
        ...state,
        todos: action.payload,
        isLoaded: true,
        isLoading: false,
      };
    }

    case ACTION_TYPES.HANDLE_ERROR: {
      return {
        ...state,
        hasError: true,
        isLoading: false,
      };
    }

    case ACTION_TYPES.SORT_BY_TITLE: {
      return {
        ...state,
        todos: [...state.todos]
          .sort((a, b) => (a.title > b.title ? 1 : -1)),
      };
    }

    case ACTION_TYPES.DELETE_ITEM: {
      return {
        ...state,
        todos: state.todos.filter(todo => todo.id !== action.payload),
      };
    }

    default:
      return state;
  }
}

export const store = createStore(
  reducer,
  applyMiddleware(thunk),
);
