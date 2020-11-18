import { createStore, AnyAction, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { TodoInterface, UserInterface } from '../components/interfaces';

// Action types - is just a constant. MUST have a unique value.
const START_LOADING = 'START_LOADING';
const FINISH_LOADING = 'FINISH_LOADING';
const SET_TODOS = 'SET_TODOS';
const SET_USER = 'SET_USER';
const CLEAR_SELECTED_USER = 'CLEAR_SELECTED_USER';
const CHANGE_TODO_STATUS = 'CHANGE_TODO_STATUS';

// Action creators - a function returning an action object
export const startLoading = () => ({ type: START_LOADING });
export const finishLoading = (message = 'No message') => ({ type: FINISH_LOADING, message });
export const setTodos = (todos: TodoInterface[]) => ({ type: SET_TODOS, todos });
export const setUser = (user: UserInterface[]) => ({ type: SET_USER, user });
export const clearSelectedUser = () => ({ type: CLEAR_SELECTED_USER });
export const changeTodoStatus = (todoId: number) => ({ type: CHANGE_TODO_STATUS, todoId });

// Selectors - a function receiving Redux state and returning some data from it
export const isLoading = (state: RootState) => state.loading;
export const getMessage = (state: RootState) => state.message;

export const allTodos = (state: RootState) => state.todos;
export const currentUser = (state: RootState) => state.user;


// Initial state
export type RootState = {
  loading: boolean;
  message: string;
  todos: TodoInterface[],
  user: UserInterface | null,
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
    case START_LOADING:
      return { ...state, loading: true };

    case SET_TODOS:
      return { ...state, todos: [...action.todos] };

    case SET_USER:
      return { ...state, user: action.user };
    
    case CLEAR_SELECTED_USER:
      return { ...state, user: null };
    
    case CHANGE_TODO_STATUS:
      return { ...state,
        todos: state.todos.map((todo: TodoInterface) => todo.id !== action.todoId
          ? todo
          : {
            ...todo,
            completed: !todo.completed,
          }
        )
      }

    case FINISH_LOADING:
      return {
        ...state,
        loading: false,
        message: action.message,
      };

    default:
      return state;
  }
};

export const loadTodos = (getTodos: any) => {
  return (dispatch: any) => {
    getTodos()
      .then((todos: any) => {
        dispatch(setTodos(todos.data))
      })
  }
};

export const loadUser = (getUser: any, userId: number) => {
  return (dispatch: any) => {
    getUser(userId)
      .then((user: any) => {
        dispatch(setUser(user.data))
      })
  }
};

// The `store` should be passed to the <Provider store={store}> in `/src/index.tsx`
const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk)), // allows you to use http://extension.remotedev.io/
);

export default store;
