import { createStore, AnyAction } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

// Action types - is just a constant. MUST have a unique value.
const START_LOADING = 'START_LOADING';
const SET_LOADED = 'IS_LOADED';
const SET_ERROR = 'SET_ERROR';
const FINISH_LOADING = 'FINISH_LOADING';
const INIT_TODOS = 'INIT_TODOS';
// const DELETE_TODO = 'DELETE_TODO';
// const SET_QUERY = 'SET_QUERY';

// Action creators - a function returning an action object
export const startLoading = () => ({ type: START_LOADING });
export const setLoaded = () => ({ type: SET_LOADED });
export const setError = (error = '') => ({
  type: SET_ERROR,
  error,
});
export const finishLoading = () => ({ type: FINISH_LOADING });
export const initTodos = (todos: Todo[]) => ({
  type: INIT_TODOS,
  todos,
});
// export const deleteTodo = (todoId: number) => ({
//   type: DELETE_TODO,
//   todoId,
// });
// export const setQuery = (query: string) => ({
//   type: SET_QUERY,
//   query,
// });


// Selectors - a function receiving Redux state and returning some data from it
export const getLoading = (state: RootState) => state.loading;
export const getLoaded = (state: RootState) => state.loaded;
export const getError = (state: RootState) => state.error;
export const getTodos = (state: RootState) => state.todos;
// export const getQuery = (state: RootState) => state.query;
//
// export const getVisibleTodos = (state: RootState) => {
//   return state.todos
//     .filter(todo => todo.title.includes(state.query))
//     .sort((a, b) => {
//       return a.title.localeCompare(b.title);
//     })
//     .slice(5, 10);
// };

// Initial state
export type RootState = {
  loading: boolean;
  loaded: boolean;
  error: string;
  todos: Todo[];
  // query: string;
};

const initialState: RootState = {
  loading: false,
  loaded: false,
  error: '',
  todos: [],
  // query: '',
};

// rootReducer - this function is called after dispatching an action
const rootReducer = (state = initialState, action: AnyAction): RootState => {
  switch (action.type) {
    // case SET_QUERY:
    //   return { ...state, query: action.query };
    // case DELETE_TODO:
    //   return {
    //     ...state,
    //     todos: state.todos.filter(todo => action.todoId !== todo.id),
    //   };
    case START_LOADING:
      return { ...state, loading: true };
    case SET_LOADED:
      return { ...state, loaded: true };
    case SET_ERROR:
      return { ...state, error: action.error };
    case FINISH_LOADING:
      return { ...state, loading: false };
    case INIT_TODOS:
      return { ...state, todos: action.todos };
    default:
      return state;
  }
};

const store = createStore(
  rootReducer,
  composeWithDevTools(),
);

store.subscribe(() => {
  localStorage.setItem('data', JSON.stringify(store.getState()));
});

export default store;
