import { createStore, AnyAction } from 'redux';
import { Todos } from '../api/api';

// Action types - is just a constant. MUST have a unique value.
const START_LOADING = 'START_LOADING';
const FINISH_LOADING = 'FINISH_LOADING';
const SET_SORT_TYPE = 'SET_SORT_TYPE';
const DELETE_TODO = 'DELETE_TODO';

// Action creators - a function returning an action object
export const startLoading = () => ({ type: START_LOADING });
export const finishLoading = (todos: Todos[]) => ({ type: FINISH_LOADING, todos });
export const setSortType = (sortType: string) => ({type: SET_SORT_TYPE, sortType});
export const deleteTodo = (todos: Todos[]) => ({type: DELETE_TODO, todos});


// Selectors - a function receiving Redux state and returning some data from it
export const isLoading = (state: RootState) => state.loading;
export const getTodos = (state: RootState) => state.todos;
export const getSortType = (state: RootState) => state.sortType;

//Initial state
export type RootState = {
  loading: boolean;
  todos: Todos[],
  sortType: string,
};

const initialState: RootState = {
  loading: false,
  todos: [],
  sortType:'',
};

// rootReducer - this function is called after dispatching an action
const rootReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case START_LOADING:
      return {
        ...state,
        loading: true,
      }
    case FINISH_LOADING:
      return {
        ...state,
        loading: false,
        todos: action.todos,
      }

    case SET_SORT_TYPE:
      return {
        ...state,
        sortType: action.sortType,
      }

    case DELETE_TODO:
      return {
        ...state,
        todos: action.todos,
      }

    default:
    return {
      ...state
    }
  }
}

// The `store` should be passed to the <Provider store={store}> in `/src/index.tsx`
const store = createStore(
  rootReducer,
  initialState // allows you to use http://extension.remotedev.io/
);

export default store;
