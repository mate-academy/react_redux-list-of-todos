import { createStore, AnyAction } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { User, Todo } from '../react-app-env';
// import { RootState } from '.';

// import actions from './Actions';
import {
  LOAD_TODOS,
  LOAD_USER,
  LOAD_ERROR,
  DELETE_TODO,
} from './actions';

// Action types - is just a constant. MUST have a unique value.
// const START_LOADING = 'START_LOADING';
// const FINISH_LOADING = 'FINISH_LOADING';

export const selectors = {
  loadUserSelector: (state: RootState) => state.user,
  getUsersIdSelector: (state: RootState) => state.userId,
  loadTodosSelector: (state: RootState) => state.todos,
  loadErrorSelector: (state: RootState) => state.errorLoading,
  // deleteTodoSelector: (state: RootState) => state.userId,
};

// Action creators - a function returning an action object
// export const startLoading = () => ({ type: START_LOADING });
export const finishLoading = (message = 'No message') => ({
  // type: FINISH_LOADING,
  message,
});

// Selectors - a function receiving Redux state and returning some data from it
// export const isLoading = (state: RootState) => state.loading;
// export const getMessage = (state: RootState) => state.message;

// Initial state
export type RootState = {
  user: User | null,
  userId: number,
  todos: Todo[],
  // loading: boolean;
  // message: string;
  errorLoading: string,
};

const initialState: RootState = {
  // loading: false,
  // message: '',
  user: null,
  userId: 0,
  todos: [],
  errorLoading: '',
};

// rootReducer - this function is called after dispatching an action
const rootReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    // case START_LOADING:
    //   return { ...state, loading: true };

    // case FINISH_LOADING:
    //   return {
    //     ...state,
    //     loading: false,
    //     message: action.message,
    //   };
    case LOAD_TODOS:
      return {
        ...state,
        todos: action.todos,
      };
    case LOAD_USER:
      return {
        ...state,
        user: action.user,
      };
    case DELETE_TODO:
      return {
        ...state,
        todos: state.todos.filter(todo => todo.id !== action.id),
      };
    case LOAD_ERROR:
      return {
        ...state,
        errorLoading: action.message,
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
