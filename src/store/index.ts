import { createStore, AnyAction } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

// Action types - is just a constant. MUST have a unique value.
const START_LOADING = 'START_LOADING';
const HANDLE_SUCCES = 'HANDLE_SUCCES';
const FINISH_LOADING = 'FINISH_LOADING';
const DELETE_TODO = 'DELETE_TODO';
const SORT_TODOS = 'SORT_TODOS';

// Action creators - a function returning an action object
export const startLoading = () => ({ type: START_LOADING });
export const loadingTodos = (todosList: Todo[]) => ({ type: HANDLE_SUCCES, todosList });
export const finishLoading = () => ({ type: FINISH_LOADING });
export const deleteTodo = (todosList: Todo[]) => ({ type: DELETE_TODO, todosList });
export const sortTodos = (todosList: Todo[]) => ({ type: SORT_TODOS, todosList });
// Selectors - a function receiving Redux state and returning some data from it
export const todosList = (state: RootState) => state.todosList;
export const isLoading = (state: RootState) => state.isLoading;
export const isVisible = (state: RootState) => state.isVisible;

// Initial state
export type RootState = {
  todosList: Todo[];
  isLoading: boolean;
  isVisible: boolean;
};

const initialState: RootState = {
  todosList: [],
  isLoading: false,
  isVisible: false,
};

// rootReducer - this function is called after dispatching an action
const rootReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case START_LOADING:
      return { ...state, isLoading: true, isVisible: false };

    case HANDLE_SUCCES:
      return {
        ...state,
        todosList: action.todosList,
      };
    case FINISH_LOADING:
      return { ...state, isVisible: true, isLoading: false };

    case DELETE_TODO:
      return { ...state, todosList: action.todosList };

    default:
      return state;

    case SORT_TODOS:
      return {
        ...state,
        todosList: [...action.todosList],
      };
  }
};

// The `store` should be passed to the <Provider store={store}> in `/src/index.tsx`
const store = createStore(
  rootReducer,
  composeWithDevTools(), // allows you to use http://extension.remotedev.io/
);

export default store;
