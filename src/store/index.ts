import { createStore, AnyAction } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

// Action types - is just a constant. MUST have a unique value.
const START_LOADING = 'START_LOADING';
const FINISH_LOADING = 'FINISH_LOADING';
const TODOS = 'TODOS';
const VISIBLE_CONTENT = 'VISIBLE_CONTENT';
const DELETE_TODO = 'DELETE_TODO';
const SORT_FIELD = 'SORT_FIELD';

// Action creators - a function returning an action object
export const startLoading = () => ({ type: START_LOADING });
export const finishLoading = (message = 'No message') => ({ type: FINISH_LOADING, message });
export const setTodos = (todos: Todo[] = []) => ({ type: TODOS, todos });
export const setVisibleContent = () => ({ type: VISIBLE_CONTENT });
export const setDelete = (index: number) => ({ type: DELETE_TODO, index });
export const setSortField = (sort: string) => ({ type: SORT_FIELD, sort });


// Selectors - a function receiving Redux state and returning some data from it
export const isLoading = (state: RootState) => state.loading;
export const getMessage = (state: RootState) => state.message;
export const getTodos = (state: RootState) => state.todos;
export const getVisibleContent = (state: RootState) => state.visible;


// Initial state
export type RootState = {
  loading: boolean;
  visible: boolean;
  message: string;
  todos: CompletedTodo[];
  error: string;
};

const initialState: RootState = {
  loading: false,
  visible: false,
  message: '',
  todos: [],
  error: '',
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
    case TODOS:
      return {
        ...state,
        todos: [...action.todos],
      };
    case VISIBLE_CONTENT:
      return {
        ...state,
        visible: true,
      };
    case DELETE_TODO:
      return {
        ...state,
        todos: [...state.todos].filter(todo => todo.id !== action.index),
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
