import { createStore, AnyAction } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createSelector } from 'reselect';

// Action types - is just a constant. MUST have a unique value.
const START_LOADING = 'START_LOADING';
const HANDLE_SUCCESS = 'HANDLE_SUCCESS';
const HANDLE_ERROR = 'HANDLE_ERROR';
const FINISH_LOADING = 'FINISH_LOADING';
const SORT_BY = 'SORT_BY';
const ASC = 'ASC';
const DESC = 'DESC';
const REVERSE = 'REVERSE';

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

export const setReverse = () => ({ type: REVERSE });

// Selectors - a function receiving Redux state and returning some data from it
export const getIsLoading = (state: RootState) => state.isLoading;
export const getFinishLoading = (state: RootState) => state.loaded;
export const getError = (state: RootState) => state.hasError;
export const getTodos = (state: RootState) => state.todos;
export const getSortField = (state: RootState) => state.sortField;

export const getSortOrder = (state: RootState) => state.order;

export const getVisibleTodos = createSelector(
  getTodos,
  getSortField,
  getSortOrder,

  (todos: PrepareTodo[], sortField: string, sortOrder: string) => {
    let callback: (a: PrepareTodo, b: PrepareTodo) => number = () => 0;

    switch (sortField) {
      case 'completed':
        callback = (a, b) => +a[sortField] - +b[sortField];
        break;
      case 'title':
        callback = (a, b) => a[sortField].localeCompare(b[sortField]);
        break;
      case 'name':
        callback = (a, b) => a.userId[sortField].localeCompare(b.userId[sortField]);
        break;
      default:
    }

    const visibleTodos = [...todos].sort(callback);

    if (sortOrder === DESC) {
      visibleTodos.reverse();
    }

    return visibleTodos;
  },
);


// Initial state
export type RootState = {
  isLoading: boolean;
  hasError: boolean;
  loaded: boolean;
  todos: PrepareTodo[];
  sortField: string;
  // sortReverse: boolean;
  order: typeof ASC | typeof DESC;
};

const initialState: RootState = {
  isLoading: false,
  hasError: false,
  loaded: false,
  todos: [],
  sortField: '',
  // sortReverse: false,
  order: ASC,
};

// rootReducer - this function is called after dispatching an action
const rootReducer = (state = initialState, action: AnyAction): RootState => {
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
      };

    case REVERSE:
      return {
        ...state,
        order: state.order === ASC ? DESC : ASC,
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
