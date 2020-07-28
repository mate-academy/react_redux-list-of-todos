import { createStore, AnyAction } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { Todo, PreparedTodo } from '../components/types';

// Action types - is just a constant. MUST have a unique value.
const START_LOADING = 'START_LOADING';
const FINISH_LOADING = 'FINISH_LOADING';
const DATA_LOADING = 'DATA_LOADING';
const DATA_SORT_TITLE = 'DATA_SORT_TITLE';
const DATA_SORT_COMPLETED = 'DATA_SORT_COMPLETED';
const DATA_SORT_NAME = 'DATA_SORT_NAME';
const DELETE_ITEM = 'DELETE_ITEM';

// Action creators - a function returning an action object
export const startLoading = () => ({ type: START_LOADING });
export const finishLoading = () => ({ type: FINISH_LOADING });
export const dataLoading = (todos: Todo[]) => ({ type: DATA_LOADING, todos });
export const dataSortTitle = (() => ({ type: DATA_SORT_TITLE }));
export const dataSortCompleted = (() => ({ type: DATA_SORT_COMPLETED }));
export const dataSortName = (() => ({ type: DATA_SORT_NAME }));
export const deleteItem = ((id: number) => ({ type: DELETE_ITEM, id }));

// Selectors - a function receiving Redux state and returning some data from it
export const isLoading = (state: RootState) => state.loading;
export const getData = (state: RootState) => state.todos;
export const getLoaded = (state: RootState) => state.loaded;

// Initial state
export type RootState = {
  loading: boolean;
  loaded: boolean;
  todos: PreparedTodo[];
};

const initialState: RootState = {
  loading: false,
  loaded: false,
  todos: [],
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
        loaded: true,
      };

    case DATA_LOADING:
      return {
        ...state,
        todos: action.todos,
      };

    case DATA_SORT_TITLE:

      return {
        ...state,
        todos: [...state.todos].sort((a, b) => a.title.localeCompare(b.title)),
      };

    case DATA_SORT_COMPLETED:
      return {
        ...state,
        todos: [...state.todos].sort((a: Todo, b: Todo) => {
          return Number(a.completed) - Number(b.completed);
        }),
      };

    case DATA_SORT_NAME:
      return {
        ...state,
        todos: [...state.todos].sort((a, b) => {
          if (a.user && b.user) {
            return a.user.name.localeCompare(b.user.name);
          }

          return 0;
        }),
      };

    case DELETE_ITEM:
      return {
        ...state,
        todos: [...state.todos].filter(item => item.id !== action.id),
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
