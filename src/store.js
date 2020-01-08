import { createStore } from 'redux';

const START_LOADING = 'START_LOADING';
const HANDLE_SUCCESS = 'HANDLE_SUCCESS';
const DELETE_TODO = 'DELETE_TODO';

export const startLoading = () => ({ type: START_LOADING });
export const handleSuccess = todos => ({
  type: HANDLE_SUCCESS, todos,
});

export const handleDelete = payload => ({
  type: DELETE_TODO, payload,
});

const reducer = (state, action) => {
  switch (action.type) {
    case START_LOADING:
      return {
        ...state,
        isLoading: true,
        hasError: false,
      };

    case HANDLE_SUCCESS:
      return {
        ...state,
        todos: action.todos,
        isLoading: true,
      };

    case DELETE_TODO:
      return {
        ...state,
        todos: state.todos.filter(item => item.id !== action.payload),
      };

    default:
      return state;
  }
};

const store = createStore(reducer, {
  isLoading: false,
  hasError: false,
  todos: [],
});

export default store;
