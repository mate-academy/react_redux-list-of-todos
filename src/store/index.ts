import { createStore, AnyAction } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { Todos, User } from '../components/interfaces';

// Action types - is just a constant. MUST have a unique value.
const START_LOADING = 'START_LOADING';
const FINISH_LOADING = 'FINISH_LOADING';
const SORT_TODOS = 'SORT_TODOS';
const SET_TODOS = 'SET_TODOS'
const SET_USER = 'SET_USER'

export const RANDOMIZE = 'RANDOMIZE';
export const ALL = 'ALL'
export const COMPLETED = 'COMPLETED'
export const NOT_COMPLETED = 'NOT_COMPLETED'
export const REMOVE = 'REMOVE'

export const CHOOSE_USER_ID = 'CHOOSE_USER_ID';
export const CHECK_ON_COMPLETED_TODOS = 'CHECK_ON_COMPLETED_TODOS';
export const INPUT_CHANGE = 'INPUT_CHANGE'

// Action creators - a function returning an action object
export const startLoading = () => ({ type: START_LOADING });
export const finishLoading = (message = 'No message') => ({ type: FINISH_LOADING, message });

export const setSort = (sort: string) => ({ type: SORT_TODOS, sort});

export const setTodos = (todos: Todos[]) => ({ type: SET_TODOS, todos});
export const setUser = (user: User) => ({ type: SET_USER, user});
export const randomize = () => ({ type: RANDOMIZE });

export const checkOnCompletedTodos = (todoId: number) => ({ type: CHECK_ON_COMPLETED_TODOS, todoId});
export const chooseUserId = (userId: number) => ({ type: CHOOSE_USER_ID, userId});
export const removeTodo = (todoId: number) => ({ type: REMOVE, todoId});

export const sortByInput = (inputChange: string) => ({ type: INPUT_CHANGE, inputChange});

// Selectors - a function receiving Redux state and returning some data from it
export const isLoading = (state: RootState) => state.loading;
export const getIsLoaded = (state: RootState) => state.isLoaded;
export const getMessage = (state: RootState) => state.message;

export const getSort = (state: RootState) => state.sort;
export const getTodos = (state: RootState) => state.todos;
export const getUser = (state: RootState) => state.user;

export const getCheckedOnCompletedTodos = (state: RootState) => state.todoId;
export const setUserId = (state: RootState) => state.userId;

export const getInputChange = (state: RootState) => state.inputChange;

// Initial state
export type RootState = {
  loading: boolean;
  isLoaded: boolean;
  message: string;
  sort: string;
  todos: Todos[];
  user: User | null;
  todoId: number;
  userId: number;
  inputChange: string;
};

const initialState: RootState = {
  loading: false,
  isLoaded: false,
  message: '',
  sort: '',
  todos: [],
  user: null,
  todoId: 0,
  userId: 0,
  inputChange: '',
};


export const getSortTodos = (state: RootState) => {
    return [...state.todos].filter(
      (todo) => {
    switch (state.sort) {
      case ALL:
        return todo;

      case COMPLETED:
        return todo.completed;

      case NOT_COMPLETED:
        return !todo.completed;
    
      default:
        return todo;
    }
    }).filter(todo =>todo.title !== null && todo.title.toLowerCase()
  .includes(state.inputChange.toLowerCase()));
  };

// rootReducer - this function is called after dispatching an action
const rootReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case START_LOADING:
      return {
        ...state,
        loading: true,
        isLoaded: false
      };

    case SET_TODOS:
      return {
        ...state,
        todos: [...action.todos]
      };

    case SET_USER:
      return {
        ...state,
        user: {...action.user},
      };

    case SORT_TODOS:
      return {
        ...state,
        sort: action.sort,
      };

    case RANDOMIZE:
      return {
        ...state,
        todos: [...state.todos].sort(() => 0.5 - Math.random()),
      };

    case CHECK_ON_COMPLETED_TODOS:
      return {
        ...state,
        todos: state.todos.map(todo => todo.id !== action.todoId 
          ? todo 
          : ({
              ...todo,
              completed: !todo.completed,
            })
        )
      };

    case CHOOSE_USER_ID:
      return {
        ...state,
          userId: action.userId,
      };

    case INPUT_CHANGE:
      return {
        ...state,
        inputChange: action.inputChange,
      };

    case REMOVE:
      return {
        ...state,
        todos: [...state.todos].filter(todo => todo.id !== action.todoId) ,
      };

    case FINISH_LOADING:
      return {
        ...state,
        loading: false,
        isLoaded: true,
        message: action.message,
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
