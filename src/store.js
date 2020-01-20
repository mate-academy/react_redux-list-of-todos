import { createStore } from 'redux';

const initialState = {
  todos: [],
  isLoading: false,
  hasError: false,
  sortType: '',
  isReversed: false,
};

// action types
const START_LOADING = 'START_LOADING';
const HANDLE_SUCCESS = 'HANDLE_SUCCESS';
const HANDLE_SORT_TYPE = 'HANDLE_SORT_TYPE';
const HANDLE_ERROR = 'HANDLE_ERROR';
const IS_REVERSED = 'IS_REVERSED';

// action creators
export const startLoading = () => ({ type: START_LOADING });
export const handleSuccess = todos => (
  {
    type: HANDLE_SUCCESS, todos,
  }
);
export const handleSortType = sortType => (
  {
    type: HANDLE_SORT_TYPE, sortType,
  }
);
export const handleError = () => ({ type: HANDLE_ERROR });
export const handleIsReversed = isReversed => (
  {
    type: IS_REVERSED, isReversed,
  }
);

// selectors
export const getTodos = state => state.todos;
export const getLoading = state => state.isLoading;
export const getSortType = state => state.sortType;
export const getError = state => state.hasError;
export const getIsReversed = state => state.isReversed;

// reducer
const reducer = (state = initialState, action) => {
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
        isLoading: false,
        hasError: false,
      };

    case HANDLE_ERROR:
      return {
        ...state,
        isLoading: false,
        hasError: true,
      };

    case HANDLE_SORT_TYPE:
      return {
        ...state,
        sortType: action.sortType,
        isLoading: false,
        hasError: false,
      };

    case IS_REVERSED:
      return {
        ...state,
        isReversed: action.isReversed,
      };

    default:
      return state;
  }
};

const store = createStore(reducer, initialState);

export default store;
