import { createStore, AnyAction, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

// Action types - is just a constant. MUST have a unique value.
const ADD_TODOS = 'ADD_TODOS';
const ADD_USER = 'ADD_USER';
const CLEAR_USER = 'CLEAR_USER';
const DELETE_TODO = 'DELETE_TODO';
const HANDLE_CHECKED = 'HANDLE_CHECKED';

// Action creators - a function returning an action object
export const addTodos = (payload: Todo[]) => ({ type: ADD_TODOS, payload });
export const addUser = (payload: User) => ({ type: ADD_USER, payload });
export const clearUser = () => ({ type: CLEAR_USER });
export const deleteTodo = (payload: number) => ({ type: DELETE_TODO, payload });
export const handleChecked = (payload: number) => ({ type: HANDLE_CHECKED, payload });

// Selectors - a function receiving Redux state and returning some data from it
export const getTodos = (state: RootState) => state.todos;
export const getUser = (state: RootState) => state.user;

// Initial state
export type RootState = {
  loading: boolean;
  message: string;
  todos: Todo[] | [],
  user: User | null,
};

const initialState: RootState = {
  loading: false,
  message: '',
  todos: [],
  user: null,
};

// rootReducer - this function is called after dispatching an action
const rootReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case ADD_TODOS:
      return { ...state, todos: [...action.payload] };

    case ADD_USER:
      return { ...state, user: action.payload };

    case CLEAR_USER:
      return { ...state, user: null };

    case DELETE_TODO:
      return { ...state, todos: state.todos.filter(todo => todo.id !== action.payload) };

    case HANDLE_CHECKED:
      return {
        ...state,
        todos: state.todos.map(todo => {
          if (todo.id === action.payload) {
            return { ...todo, completed: !todo.completed };
          }

          return todo;
        }),
      };
    default:
      return state;
  }
};

// The `store` should be passed to the <Provider store={store}> in `/src/index.tsx`
const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk)), // allows you to use http://extension.remotedev.io/
);

export default store;
