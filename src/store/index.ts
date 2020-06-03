import { createStore, AnyAction } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createSelector } from 'reselect';

// Action types - is just a constant. MUST have a unique value.
const START_LOADING = 'START_LOADING';
const FINISH_LOADING = 'FINISH_LOADING';
const SORT_BY = 'SORT_BY';
const REMOVED_TODO = 'REMOVED_TODO';

// Action creators - a function returning an action object
export const startLoading = () => ({ type: START_LOADING });
export const finishLoading = (message: string, todos: Todo[]) => ({
  type: FINISH_LOADING,
  message,
  todos,
});

export const removedTodo = (todos: GetTodos[]) => ({
  type: REMOVED_TODO,
  todos,
});

export const setSortField = (field: string) => ({
  type: SORT_BY,
  field,
});


// Selectors - a function receiving Redux state and returning some data from it
export const isLoading = (state: RootState) => state.loading;
export const getTodos = (state: RootState) => state.todos;
export const sortBy = (state: RootState) => state.sortField;
export const setUnvisibleButton = (state: RootState) => state.visibleButton;

export const getVisibleTodos = createSelector(
  getTodos,
  sortBy,

  (todos: GetTodos[], sortField: string) => {
    let callback: (a: GetTodos, b: GetTodos) => number;

    switch (sortField) {
      case 'title':
        callback = (a, b) => a.title.localeCompare(b.title);
        break;
      case 'userName':
        callback = (a, b) => a.user.name.localeCompare(b.user.name);
        break;
      case 'status':
        callback = (a, b) => +a.completed - +b.completed;
        break;
      default: callback = () => 0;
    }

    const visibleTodos = [...todos].sort(callback);

    return visibleTodos;
  },
);

// Initial state
export type RootState = {
  todos: GetTodos[];
  loading: boolean;
  sortField: string;
  visibleButton: boolean;
};

const initialState: RootState = {
  todos: [],
  loading: false,
  sortField: '',
  visibleButton: true,
};

// rootReducer - this function is called after dispatching an action
const rootReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case START_LOADING:
      return {
        ...state,
        loading: true,
        visibleButton: false,
      };

    case FINISH_LOADING:
      return {
        ...state,
        loading: false,
        todos: action.todos,
      };

    case REMOVED_TODO:
      return {
        ...state,
        todos: action.todos,
      }

    case SORT_BY:
      return {
        ...state,
        sortField: action.field,
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
