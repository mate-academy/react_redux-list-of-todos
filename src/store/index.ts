import { createStore, AnyAction } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

// Action types - is just a constant. MUST have a unique value.
const START_LOADING = 'START_LOADING';
const FINISH_LOADING = 'FINISH_LOADING';
const SET_TODOS = 'SET_TODOS';
const SET_SELECTED_USER_ID = 'SET_SELECTED_USER_ID';
const SET_HAS_LOADING_ERROR = 'SET_HAS_LOADING_ERROR';
const SET_SELECTED_TODO_ID = 'SET_SELECTED_TODO_ID';

// Action creators - a function returning an action object
export const startLoading = () => ({ type: START_LOADING });
export const finishLoading = (message = 'No message') => ({
  type: FINISH_LOADING,
  message,
});
export const setTodos = (todos: Todo[]) => ({
  type: SET_TODOS,
  todos,
});
export const setSelectedUserId = (selectedUserId: number) => ({
  type: SET_SELECTED_USER_ID,
  selectedUserId,
});
export const setHasLoadingError = (hasLoadingError: boolean) => ({
  type: SET_HAS_LOADING_ERROR,
  hasLoadingError,
});
export const setSelectedTodoId = (selectedTodoId: number) => ({
  type: SET_SELECTED_TODO_ID,
  selectedTodoId,
});

// Selectors - a function receiving Redux state and returning some data from it
export const isLoading = (state: RootState) => state.loading;
export const getMessage = (state: RootState) => state.message;
export const getTodos = (
  searchInput: string,
  todosFilter: string,
) => {
  return (state: RootState): Todo[] => {
    const { todos } = state;

    return todos
      .filter(todo => todo.title.includes(searchInput))
      .filter(todo => {
        const isCompleted = todo.completed;

        switch (todosFilter) {
          case 'active':
            return !isCompleted;
          case 'completed':
            return isCompleted;
          default:
            return true;
        }
      });
  };
};

export const getSelectedUserId = (state: RootState) => (
  state.selectedUserId
);
export const getHasLoadingError = (state: RootState) => (
  state.hasLoadingError
);
export const getSelectedTodoId = (state: RootState) => (
  state.selectedTodoId
);

// Initial state
export type RootState = {
  todos: Todo[],
  loading: boolean;
  message: string;
  selectedUserId: number,
  hasLoadingError: boolean,
  selectedTodoId: number,
};

const initialState: RootState = {
  todos: [],
  loading: false,
  message: '',
  selectedUserId: 0,
  hasLoadingError: false,
  selectedTodoId: 0,
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
      };

    case SET_TODOS:
      return {
        ...state,
        todos: action.todos,
      };

    case SET_SELECTED_USER_ID:
      return {
        ...state,
        selectedUserId: action.selectedUserId,
      };

    case SET_HAS_LOADING_ERROR:
      return {
        ...state,
        hasLoadingError: action.hasLoadingError,
      };

    case SET_SELECTED_TODO_ID:
      return {
        ...state,
        selectedTodoId: action.selectedTodoId,
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
