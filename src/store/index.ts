import { createStore, AnyAction, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { TodoInterface, UserInterface } from '../typedefs';

export const STATUS = {
  all: 'all',
  active: 'active',
  complited: 'complited',
};

// Action types - is just a constant. MUST have a unique value.
const START_LOAD = 'START_LOAD';
const SET_TODOS = 'SET_TODOS';
const SET_USER = 'SET_USER';
const CLEAR_SELECTED_USER = 'CLEAR_SELECTED_USER';
const CHANGE_TODO_STATUS = 'CHANGE_TODO_STATUS';
const SORT_STATUS = 'SORT_STATUS';
const FILTER_INPUT = 'FILTER_INPUT';
const RANDOMIZE_TODOS = 'RANDOMIZE_TODOS';
const REMOVE_TODO = 'REMOVE_TODO';

// Action creators - a function returning an action object
export const startLoad = (start: boolean) => ({ type: START_LOAD, start });
export const setTodos = (todos: TodoInterface[]) => ({ type: SET_TODOS, todos });
export const setUser = (user: UserInterface[]) => ({ type: SET_USER, user });
export const clearSelectedUser = () => ({ type: CLEAR_SELECTED_USER });
export const changeTodoStatus = (todoId: number) => ({ type: CHANGE_TODO_STATUS, todoId });
export const sortStatus = (status: string) => ({ type: SORT_STATUS, status });
export const filterInput = (input: string) => ({ type: FILTER_INPUT, input });
export const randomizeTodos = () => ({ type: RANDOMIZE_TODOS });
export const removeTodo = (todoId: number) => ({ type: REMOVE_TODO, todoId });

// Selectors - a function receiving Redux state and returning some data from it
export const currentUser = (state: RootState) => state.user;
export const todoStatus = (state: RootState) => state.status;
export const getInput = (state: RootState) => state.input;
export const startState = (state: RootState) => state.start;

// Initial state
export type RootState = {
  todos: TodoInterface[],
  user: UserInterface | null,
  status: string,
  input: string,
  start: boolean,
};

const initialState: RootState = {
  todos: [],
  user: null,
  status: '',
  input: '',
  start: false,
};

// rootReducer - this function is called after dispatching an action
const rootReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case START_LOAD:
      return { ...state, start: action.start };

    case SET_TODOS:
      return { ...state, todos: [...action.todos] };

    case SET_USER:
      return { ...state, user: action.user };
    
    case CLEAR_SELECTED_USER:
      return { ...state, user: null };
    
    case CHANGE_TODO_STATUS:
      return { ...state,
        todos: [...state.todos].map((todo: TodoInterface) => todo.id !== action.todoId
          ? todo
          : {
            ...todo,
            completed: !todo.completed,
          }
        )
      };

    case SORT_STATUS:
      return { ...state, status: action.status };

    case FILTER_INPUT:
      return { ...state, input: action.input };

    case RANDOMIZE_TODOS:
      return { ...state,
        todos: [...state.todos].sort(() => Math.random() - 0.5),
      };

    case REMOVE_TODO:
      return { ...state,
        todos: [...state.todos].filter(todo => todo.id !== action.todoId),
      };

    default:
      return state;
  }
};

export const loadTodos = (getTodos: Function) => {
  return (dispatch: Function) => {
    getTodos()
      .then((todos: any) => {
        console.log(todos)
        dispatch(setTodos(todos.data))
      })
  }
};

export const loadUser = (getUser: Function, userId: number) => {
  return (dispatch: Function) => {
    getUser(userId)
      .then((user: any) => {
        dispatch(setUser(user.data))
      })
  }
};

const searchTitle  = (todoTitle: string, input: string) => {
  if (todoTitle.toLowerCase().includes(input.toLowerCase())) {
    return true;
  }

  return false;
}

export const sortedTodos = (state: RootState) => {
  return [...state.todos]
    .filter(todo => todo.title && searchTitle(todo.title, state.input))
    .filter(todo => {
      switch (state.status) {
        case STATUS.active:
          return !todo.completed;
        case STATUS.complited:
          return todo.completed;
        default:
          return todo;
      }
    })
};

// The `store` should be passed to the <Provider store={store}> in `/src/index.tsx`
const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk)), // allows you to use http://extension.remotedev.io/
);

export default store;
