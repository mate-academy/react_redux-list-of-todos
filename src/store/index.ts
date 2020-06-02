import { createStore, AnyAction } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

// Action types - is just a constant. MUST have a unique value.
const START_LOADING = 'START_LOADING';
const HANDLE_SUCCESS = 'HANDLE_SUCCESS';
const HANDLE_ERROR = 'HANDLE_ERROR';
const FINISH_LOADING = 'FINISH_LOADING';
const SORT_BY = 'SORT_BY';

export const BY_TITLE = 'title';
export const BY_NAME = 'name';
export const BY_COMPLETED = 'completed';


// Action creators - a function returning an action object
export const startLoading = () => ({ type: START_LOADING });
export const finishLoading = () => ({ type: FINISH_LOADING });
export const handleSuccess = (todos: PrepareTodo[]) => ({
  type: HANDLE_SUCCESS,
  todos,
});
export const handleError = () => ({
  type: HANDLE_ERROR,
});
export const setSortField = (sortField: string) => ({
  type: SORT_BY,
  sortField,
});

// Selectors - a function receiving Redux state and returning some data from it
export const getIsLoading = (state: RootState) => state.isLoading;
export const getFinishLoading = (state: RootState) => state.loaded;
export const getError = (state: RootState) => state.hasError;
export const getTodos = (state: RootState) => state.todos;
export const getSortField = (state: RootState) => state.sortField;
export const getVisibleTodos = (state: RootState) => {
  const visibleTodos = [...state.todos];

  switch (state.sortField) {
    case BY_COMPLETED:
      return state.sortReverse
        ? visibleTodos.sort((a: PrepareTodo, b: PrepareTodo) => +a.completed - +b.completed)
        : visibleTodos.sort((a: PrepareTodo, b: PrepareTodo) => +b.completed - +a.completed);
      break;

    case BY_TITLE:
      return state.sortReverse
        ? visibleTodos.sort(
          (a: PrepareTodo, b: PrepareTodo) => a.title.localeCompare(b.title),
        )
        : visibleTodos.sort((a: PrepareTodo, b: PrepareTodo) => b.title.localeCompare(a.title));
      break;

    case BY_NAME:
      return state.sortReverse
        ? visibleTodos.sort(
          (a: PrepareTodo, b: PrepareTodo) => a.userId.name.localeCompare(b.userId.name),
        )
        : visibleTodos.sort(
          (a: PrepareTodo, b: PrepareTodo) => b.userId.name.localeCompare(a.userId.name),
        );
      break;

    default:
      return visibleTodos;
  }

  return visibleTodos;
};

// Initial state
export type RootState = {
  isLoading: boolean;
  hasError: boolean;
  loaded: boolean;
  todos: PrepareTodo[];
  sortField: string;
  sortReverse: boolean;
};

const initialState: RootState = {
  isLoading: false,
  hasError: false,
  loaded: false,
  todos: [],
  sortField: '',
  sortReverse: false,
};

// rootReducer - this function is called after dispatching an action
const rootReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case START_LOADING:
      return {
        ...state,
        isLoading: true,
        hasError: false,
      };

    case FINISH_LOADING:
      return {
        ...state,
        isLoading: false,
        hasError: false,
        loaded: true,
      };

    case HANDLE_SUCCESS:
      return {
        ...state,
        todos: action.todos,
        isLoading: false,
      };

    case HANDLE_ERROR:
      return {
        ...state,
        isLoading: false,
        hasError: true,
      };

    case SORT_BY:
      return {
        ...state,
        sortField: action.sortField,
        sortReverse: !state.sortReverse,
      };

    default:
      return state;
  }
};

// The `store` should be passed to the <Provider store={store}> in `/src/index.tsx`
const store = createStore(
  rootReducer,
  composeWithDevTools(), // allows you to use http://extension.remotedev.io/
);

export default store;
