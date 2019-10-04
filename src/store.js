import { createStore } from 'redux';

const initialState = {
  todosList: [],
  sortedTodosList: [],
  isLoaded: false,
  isLoading: false,
  isError: false,
  buttonText: 'Load',
};

const START_LOADING = 'START_LOADING';
const HANDLE_SUCCESS = 'HANDLE_SUCCESS';
const HANDLE_ERROR = 'HANDLE_ERROR';

export const startLoading = () => ({
  type: START_LOADING,
});

export const handleSuccess = todosList => ({
  type: HANDLE_SUCCESS,
  todosList,
});

export const handleError = () => ({
  type: HANDLE_ERROR,
});

const reducer = (state, action) => {
  switch (action.type) {
    case START_LOADING:
      return {
        ...state,
        buttonText: 'loading...',
        isLoading: true,
      };

    case HANDLE_SUCCESS:
      return {
        ...state,
        todosList: action.todosList,
        isLoaded: true,
        isLoading: false,
        isError: false,
      };

    case HANDLE_ERROR:
      return {
        buttonText: 'try again',
        isError: true,
        isLoading: false,
      };
    default: return state;
  }
};

const store = createStore(reducer, initialState);

export default store;
