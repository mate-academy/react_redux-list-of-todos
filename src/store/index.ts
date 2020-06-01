import { createStore, AnyAction } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

// Action types - is just a constant. MUST have a unique value.
const START_LOADING = 'START_LOADING';
const FINISH_LOADING = 'FINISH_LOADING';
const REMOVE_TODO = 'REMOVE_TODO';
const SORT_TODO = 'SORT_TODO';

// Action creators - a function returning an action object
export const startLoading = () => ({
  type: START_LOADING,
});
export const finishLoading = (todos: TodosFromServer[]) => ({
  type: FINISH_LOADING,
  todos,
});
export const removeTodo = (todos: TodosFromServer[]) => ({
  type: REMOVE_TODO,
  todos,
});
export const sortTodo = (todos: TodosFromServer[]) => ({
  type: SORT_TODO,
  todos,
});

// Selectors - a function receiving Redux state and returning some data from it
export const isLoading = (state: RootState) => state.loading;
export const getTodos = (state: RootState) => state.todos;
export const loadSortButtons = (state: RootState) => state.loadSortButtons;

// Initial state
export type RootState = {
  loading: boolean;
  todos: TodosFromServer[];
  loadSortButtons: boolean;
};

const initialState: RootState = {
  loading: false,
  todos: [],
  loadSortButtons: false,
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

    case FINISH_LOADING:
      return {
        ...state,
        loading: false,
        todos: [...action.todos]
      };

    case REMOVE_TODO:
      return {
        ...state,
        todos: [...action.todos],
      };

    case SORT_TODO:
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
