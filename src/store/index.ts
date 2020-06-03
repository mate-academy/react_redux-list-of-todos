import { createStore, AnyAction } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createSelector } from 'reselect';

// Action types - is just a constant. MUST have a unique value.
const START_LOADING = 'START_LOADING';
const FINISH_LOADING = 'FINISH_LOADING';
const DELETE_TODO = 'DELETE_TODO';
const SET_SORT_FIELD = 'SET_SORT_FIELD';

// Action creators - a function returning an action object
export const startLoading = () => ({ type: START_LOADING });
export const finishLoading = (todos: Todo[]) => ({
  type: FINISH_LOADING,
  todos,
});
export const deletedTodo = (todos: Todo[]) => ({
  type: DELETE_TODO,
  todos,
});
export const setSortField = (sortField: string) => ({
  type: SET_SORT_FIELD,
  sortField,
});

// Selectors - a function receiving Redux state and returning some data from it
export const getTodos = (state: RootState) => state.todos;
export const getSortType = (state: RootState) => state.sortField;
export const isLoading = (state: RootState) => state.loading;
export const isVisibleSortButtons = (state: RootState) => state.visibleSortButtons;
export const getOrder = (state: RootState) => state.order;
export const getVisibleTodos = createSelector(
  getTodos,
  getSortType,
  getOrder,

  (todos: Todo[], sortField: string, order: string) => {
    let callback: (a: Todo, b: Todo) => number;
    const sortDirection = (order === 'ASC') ? 1 : -1;

    switch (sortField) {
      case 'title':
        callback = (a, b) => (a.title.localeCompare(b.title)* sortDirection);
        break;
      case 'complete':
        callback = (a, b) => (+a.completed - +b.completed)* sortDirection;
        break;
      case 'user':
        callback = (a, b) => (a.userCatalog.name.localeCompare(b.userCatalog.name))* sortDirection;
        break;
      default: callback = () => 0;
    }

    const visiblePeople = [...todos].sort(callback);

    return visiblePeople;
  }
)

// Initial state
export type RootState = {
  todos: Todo[],
  loading: boolean;
  visibleSortButtons: boolean,
  sortField: string,
  order: string;
};

const initialState: RootState = {
  todos: [],
  loading: false,
  visibleSortButtons: false,
  sortField: '',
  order: 'ASC',
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
        todos: action.todos,
      };

    case DELETE_TODO:
      return {
        ...state,
        todos: action.todos,
      };

    case SET_SORT_FIELD:
      if (state.sortField === action.sortField) {
        return {
          ...state,
          order: state.order === 'ASC' ? 'DESC' : 'ASC',
        };
      }
      return {
        ...state,
        order: 'ASC',
        sortField: action.sortField,
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
