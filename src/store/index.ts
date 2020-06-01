import { createStore, AnyAction } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

// Action types - is just a constant. MUST have a unique value.
const START_LOADING = 'START_LOADING';
const FINISH_LOADING = 'FINISH_LOADING';
const SORT_TODOS = 'SORT_TODOS';
const DELETE_TODO = 'DELETE_TODO';

// Action creators - a function returning an action object
export const startLoading = () => ({ type: START_LOADING });
export const finishLoading = (todos: Todo[]) => ({
  type: FINISH_LOADING,
  todos,
});
export const sortedTodos = (todos: Todo[]) => ({
  type: SORT_TODOS,
  todos,
});
export const deletedTodo = (todos: Todo[]) => ({
  type: DELETE_TODO,
  todos,
});

// Selectors - a function receiving Redux state and returning some data from it
export const getTodos = (state: RootState) => state.todos;
export const isLoading = (state: RootState) => state.loading;
export const isVisibleSortButtons = (state: RootState) => state.visibleSortButtons;

// Initial state
export type RootState = {
  todos: Todo[],
  loading: boolean;
  visibleSortButtons: boolean,
};

const initialState: RootState = {
  todos: [],
  loading: false,
  visibleSortButtons: false,
};

// rootReducer - this function is called after dispatching an action
const rootReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case START_LOADING:
      return {
        ...state,
        loading: true,
        visibleSortButtons: true,
      };

    case FINISH_LOADING:
      return {
        ...state,
        loading: false,
        todos: [...action.todos],
      };

    case SORT_TODOS:
      return {
        ...state,
        todos: [...action.todos],
      };

    case DELETE_TODO:
      return {
        ...state,
        todos: [...action.todos],
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
