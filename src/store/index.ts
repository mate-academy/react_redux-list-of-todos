import { createStore, AnyAction } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { Todo } from '../components/Interfaces';

// Action types - is just a constant. MUST have a unique value.
const START_LOADING = 'START_LOADING';
const SET_TODOS = 'SET_TODOS';
const SET_SORT_FIELD = 'SET_SORT_FIELD';

// Action creators - a function returning an action object
export const startLoading = () => ({ type: START_LOADING });
export const setTodos = (todos: Todo[]) => ({ type: SET_TODOS, payload: todos });
export const setSortField = (value: string) => ({ type: SET_SORT_FIELD, sortField: value });

// Selectors - a function receiving Redux state and returning some data from it
export const isLoading = (state: RootState) => state.loading;
export const getTodos = (state: RootState) => state.todos;
export const getSortField = (state: RootState) => state.sortField;

export const getSortedTodos = (sortField: string) => {
  switch (sortField) {
    case 'completed':
      return (a: Todo, b: Todo) => {
        if (a.completed === b.completed) {
          return 0;
        }

        if (a.completed) {
          return -1;
        }

        return 1;
      };

    case 'title':
      return (a: Todo, b: Todo) => a.title.localeCompare(b.title);

    case 'userName':
      return (a: Todo, b: Todo) => {
        if (a.userName && b.userName) {
          return a.userName.localeCompare(b.userName);
        }

        return 0;
      };

    default:
      return () => 0;
  }
};

// Initial state
export type RootState = {
  loading: boolean;
  todos: Todo[];
  sortField: string;
};

const initialState: RootState = {
  loading: false,
  todos: [],
  sortField: '',
};

// rootReducer - this function is called after dispatching an action
const rootReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case START_LOADING:
      return { ...state, loading: true };

    case SET_TODOS:
      return {
        ...state,
        loading: false,
        todos: action.payload,
      };

    case SET_SORT_FIELD:
      return {
        ...state,
        sortField: action.sortField,
      };

    default:
      return state;
  }
};

// The `store` should be passed to the <Provider store={store}> in `/src/index.tsx`
export const store = createStore(
  rootReducer,
  composeWithDevTools(), // allows you to use http://extension.remotedev.io/
);

export default store;
