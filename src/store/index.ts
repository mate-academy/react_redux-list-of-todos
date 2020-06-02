import { createStore, AnyAction } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

// Action types - is just a constant. MUST have a unique value.
const START_LOADING = 'START_LOADING';
const HANLDE_SUCCESS = 'HANDLE_SUCCESS';
const HANDLE_ERROR = 'HANDLE_ERRROR';

// action creators
export const startLoading = () => ({ type: START_LOADING });
export const handleSuccess = (todos: PreparedTodos) => ({ type: HANLDE_SUCCESS, todos });
export const handleError = () => ({ type: HANDLE_ERROR });

// Initial state
export type RootState = {
  isLoading: boolean;
  hasError: boolean;
  todos: PreparedTodos[];
};

const initialState: RootState = {
  isLoading: false,
  hasError: false,
  todos: [],
};

const rootReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case START_LOADING:
      return {
        ...state,
        isLoading: true,
        hasError: false,
      };
    case HANLDE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        hasError: false,
        todos: action.todos,
      };

    case HANDLE_ERROR:
      return {
        ...state,
        isLoading: false,
        hasError: true,
      };

    default:
      return state;
  }
};

const store = createStore(
  rootReducer, composeWithDevTools(),
);

export default store;
