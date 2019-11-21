import { createStore } from 'redux';

const START_LOADING = 'START_LOADING';
const HANDLE_ERROR = 'HANDLE_ERROR';
const HANDLE_SUCCESS = 'HANDLE_SUCCESS';
const HANDLE_SORT = 'HANDLE_SORT';

export const startLoading = () => ({ type: START_LOADING });
export const handleError = () => ({ type: HANDLE_ERROR });

export const handleSort = event => ({
  type: HANDLE_SORT,
  event,
});

export const handleSuccess = todosWithUsers => ({
  type: HANDLE_SUCCESS,
  todosWithUsers,
});

const initialState = {
  isLoading: false,
  todosWithUsers: [],
  hasError: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case HANDLE_SORT:
      return {
        ...state,
        todosWithUsers: [...state.todosWithUsers].sort((a, b) => {
          switch (action.event) {
            case 'userName':
              return a.user.name.localeCompare(b.user.name);
            case 'completed':
              return b.completed - a.completed;
            default:
              return a.title.localeCompare(b.title);
          }
        }),
      };
    case START_LOADING:
      return {
        ...state,
        isLoading: true,
        hasError: false,
      };
    case HANDLE_ERROR:
      return {
        ...state,
        isLoading: false,
        hasError: true,
      };
    case HANDLE_SUCCESS:
      return {
        ...state,
        todosWithUsers: action.todosWithUsers,
        isLoading: false,
      };
    default:
      return state;
  }
};

export const store = createStore(reducer, initialState);
