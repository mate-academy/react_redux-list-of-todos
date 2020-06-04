import { createStore, Action } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

// Action types - is just a constant. MUST have a unique value.
const START_LOADING = 'START_LOADING';
const FINISH_LOADING = 'FINISH_LOADING';
const SORT_FIELD = 'SORT_FIELD';
const LOADING_ERROR = 'LOADING_ERROR';

export const SORT_BY_TITLE = 'byTitle';
export const SORT_BY_NAME = 'byName';
export const SORT_BY_COMPLETED = 'byCompleted';
const DELETE_TODO = 'delete';

type StartLoading = Action<typeof START_LOADING>;
type FinishLoading = Action<typeof FINISH_LOADING> & {
  message: string;
  todos: Todo[];
};
type SortLoading = Action<typeof SORT_FIELD> & {
  sortField: string;
};
type DeleteTodo = Action<typeof DELETE_TODO> & {
  id: number;
};
type ErrorLoading = Action<typeof LOADING_ERROR> & {
  message: string;
};

// Action creators - a function returning an action object
export const startLoading = (): StartLoading => ({ type: START_LOADING });
export const finishLoading = (message: string, todos: Todo[]): FinishLoading => ({
  type: FINISH_LOADING,
  message,
  todos,
});

export const setSortField = (sortField: string): SortLoading => ({
  type: SORT_FIELD,
  sortField,
});

export const deleteTodo = (id: number): DeleteTodo => ({
  type: DELETE_TODO,
  id,
});

export const errorLoading = (message: string): ErrorLoading => ({
  type: LOADING_ERROR,
  message,
});

// Selectors - a function receiving Redux state and returning some data from it
export const getIsLoading = (state: RootState) => state.loading;
export const getMessage = (state: RootState) => state.message;
export const getTodos = (state: RootState) => state.todos;
export const getSortField = (state: RootState) => state.sortField;
export const getVisibleTodos = (state: RootState) => {
  const visibleTodos = [...state.todos];

  switch (state.sortField) {
    case SORT_BY_TITLE:
      if (state.sortReverse) {
        visibleTodos.sort((a: Todo, b: Todo) => (a.title.localeCompare(b.title)));
      } else {
        visibleTodos.sort((a: Todo, b: Todo) => (b.title.localeCompare(a.title)));
      }

      break;
    case SORT_BY_NAME:
      if (state.sortReverse) {
        visibleTodos.sort((a: Todo, b: Todo) => {
          if (a.user === undefined || b.user === undefined) {
            throw new TypeError('ERROR');
          }

          return a.user.name.localeCompare(b.user.name);
        });
      } else {
        visibleTodos.sort((a: Todo, b: Todo) => {
          if (a.user === undefined || b.user === undefined) {
            throw new TypeError('ERROR');
          }

          return b.user.name.localeCompare(a.user.name);
        });
      }

      break;
    case SORT_BY_COMPLETED:
      if (state.sortReverse) {
        visibleTodos.sort((a: Todo, b: Todo) => (+b.completed - +a.completed));
      } else {
        visibleTodos.sort((a: Todo, b: Todo) => (+a.completed - +b.completed));
      }

      break;
    case LOADING_ERROR:
      throw new TypeError('ERROR_LOADING');
      break;
    default: return visibleTodos;
  }

  return visibleTodos;
};

// Initial state
export type RootState = {
  todos: Todo[];
  loading: boolean;
  message: string;
  sortField: string;
  sortReverse: boolean;
};

const initialState: RootState = {
  todos: [],
  loading: false,
  message: '',
  sortField: SORT_BY_TITLE,
  sortReverse: false,
};

type AllAction = StartLoading | FinishLoading | SortLoading | DeleteTodo | ErrorLoading;

// rootReducer - this function is called after dispatching an action
const rootReducer = (state = initialState, action: AllAction) => {
  switch (action.type) {
    case START_LOADING:
      return { ...state, loading: true };

    case FINISH_LOADING:
      return {
        ...state,
        loading: false,
        message: action.message,
        todos: action.todos,
      };

    case SORT_FIELD:
      return {
        ...state,
        sortField: action.sortField,
        sortReverse: !state.sortReverse,
      };

    case DELETE_TODO:
      return {
        ...state,
        todos: state.todos.filter(todo => todo.id !== action.id),
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
