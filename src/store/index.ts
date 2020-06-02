import { createStore, AnyAction } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

// Action types - is just a constant. MUST have a unique value.
const START_LOADING = 'START_LOADING';
const FINISH_LOADING = 'FINISH_LOADING';
const SORT_FIELD = 'SORT_FIELD';

export const BY_TITLE = 'byTitle';
export const BY_NAME = 'byName';
export const BY_COMPLETED = 'byCompleted';
const DELETE_TODO = 'delete';

// Action creators - a function returning an action object
export const startLoading = () => ({ type: START_LOADING });
export const finishLoading = (message = 'No message', todos = []) => ({
  type: FINISH_LOADING,
  message,
  todos,
});
export const setSortField = (sortField: string) => ({
  type: SORT_FIELD,
  sortField,
});

export const deleteTodo = (id: number) => ({
  type: DELETE_TODO,
  id,
});

// Selectors - a function receiving Redux state and returning some data from it
export const isLoading = (state: RootState) => state.loading;
export const getMessage = (state: RootState) => state.message;
export const getTodos = (state: RootState) => state.todos;
export const getSortField = (state: RootState) => state.sortField;
export const getVisibleTodos = (state: RootState) => {
  const visibleTodos = [...state.todos];

  switch (state.sortField) {
    case BY_TITLE:
      state.sortReverse
        ? visibleTodos.sort((a: TodoProps, b: TodoProps) => (a.title.localeCompare(b.title)))
        : visibleTodos.sort((a: TodoProps, b: TodoProps) => (b.title.localeCompare(a.title)));
      break;
    case BY_NAME:
      state.sortReverse
        ? visibleTodos.sort((a: TodoProps, b: TodoProps) => (a.user.name.localeCompare(b.user.name)))
        : visibleTodos.sort((a: TodoProps, b: TodoProps) => (b.user.name.localeCompare(a.user.name)));
      break;
    case BY_COMPLETED:
      state.sortReverse
        ? visibleTodos.sort((a: TodoProps, b: TodoProps) => (+b.completed - +a.completed))
        : visibleTodos.sort((a: TodoProps, b: TodoProps) => (+a.completed - +b.completed));
      break;
    default: return visibleTodos;
  }

  return visibleTodos;
};

// Initial state
export type RootState = {
  todos: TodoProps[];
  loading: boolean;
  message: string;
  sortField: string;
  sortReverse: boolean;
};

const initialState: RootState = {
  todos: [],
  loading: false,
  message: '',
  sortField: BY_TITLE,
  sortReverse: false,
};

// rootReducer - this function is called after dispatching an action
const rootReducer = (state = initialState, action: AnyAction) => {
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
