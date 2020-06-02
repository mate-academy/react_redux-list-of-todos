import { createStore, AnyAction } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

// Action types - is just a constant. MUST have a unique value.
const START_LOADING = 'START_LOADING';
const SET_TODOS = 'SET_TODOS';
const SET_ERROR = 'SET_ERROR';
const FINISH_LOADING = 'FINISH_LOADING';
const REMOVE_TODO = 'REMOVE_TODO';
const SORT_TODO = 'SORT_TODO';


// Action creators - a function returning an action object
export const startLoading = () => ({
  type: START_LOADING,
});
export const setTodos = (todos: TodosFromServer[]) => ({
  type: SET_TODOS,
  todos,
});

export const setError = (error = '') => ({
  type: SET_ERROR,
  error,
});

export const finishLoading = (message = '') => ({
  type: FINISH_LOADING,
  message,
});
export const removeTodo = (data: number) => ({
  type: REMOVE_TODO,
  id: data,
});
export const sortTodo = (sortByField: string) => ({
  type: SORT_TODO,
  sortByField,
});

// Selectors - a function receiving Redux state and returning some data from it
export const isLoading = (state: RootState) => state.loading;
export const getTodos = (state: RootState) => state.todos;
export const getSortByField = (state: RootState) => state.sortByField;
export const loadSortButtons = (state: RootState) => state.loadSortButtons;
export const getSortedTodos = (state: RootState) => {
  switch (state.sortByField) {
    case 'userName':
      return [...state.todos].sort((a, b) => a.user.name.localeCompare(b.user.name));
      break;
    case 'title':
      return [...state.todos].sort((a, b) => a.title.localeCompare(b.title));
      break;
    case 'status':
      return [...state.todos].sort((a, b) => +a.completed - +b.completed);
      break;
    default: return [...state.todos];
  }
};

// Initial state
export type RootState = {
  loading: boolean;
  todos: TodosFromServer[];
  loadSortButtons: boolean;
  message: string;
  sortByField: string;
};

const initialState: RootState = {
  loading: false,
  todos: [],
  loadSortButtons: false,
  message: '',
  sortByField: 'userName',
};

// rootReducer - this function is called after dispatching an action
const rootReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case START_LOADING:
      return {
        ...state,
        loading: true,
        loadSortButtons: true,
      };

    case SET_TODOS:
      return {
        ...state,
        todos: [...action.todos],
      };

    case FINISH_LOADING:
      return {
        ...state,
        loading: false,
      };

    case REMOVE_TODO:
      return {
        ...state,
        todos: state.todos.filter(todo => todo.id !== action.id),
      };

    case SORT_TODO:
      return {
        ...state,
        sortByField: action.sortByField,
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
