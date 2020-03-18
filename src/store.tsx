import {
  AnyAction, createStore, applyMiddleware, Dispatch,
} from 'redux';
import thunk from 'redux-thunk';
import { getData } from './components/getData/getData';

const SET_IS_LOADING = 'IS_LOADING';
const SET_TODOS = 'SET_TODOS';
const DELETE_TODO = 'DELETE_TODO';
const FILTER_BY_TITLE = 'FILTER_BY_TITLE';
const FILTER_BY_NAME = 'FILTER_BY_NAME';
const FILTER_BY_COMPLETE = 'FILTER_BY_COMPLETE';

export const setIsLoad = (isLoading: boolean) => ({ type: SET_IS_LOADING, isLoading });
export const setTodosWithUsers = (todos: TodoWithUser[] | []) => ({ type: SET_TODOS, todos });
export const deleteSomeTodo = (idTodos: number) => ({ type: DELETE_TODO, idTodos });
export const filterByTitle = () => ({ type: FILTER_BY_TITLE });
export const filterByName = () => ({ type: FILTER_BY_NAME });
export const filterByComplete = () => ({ type: FILTER_BY_COMPLETE });

export interface State {
  todos: TodoWithUser[] | [];
  isLoading: boolean;
}

const initialSate: State = {
  todos: [],
  isLoading: false,
};

export const loadTodos = () => {
  return async (dispatch: Dispatch) => {
    dispatch(setIsLoad(true));
    const todosFromServer = await getData();

    dispatch(setTodosWithUsers(todosFromServer));
    dispatch(setIsLoad(false));
  };
};


const reducerTodos = (state: State = initialSate, action: AnyAction) => {
  switch (action.type) {
    case SET_IS_LOADING:
      return {
        ...state,
        isLoading: action.isLoading,
      };
    case SET_TODOS:
      return {
        ...state,
        todos: [...action.todos],
      };
    case FILTER_BY_TITLE:
      return {
        ...state,
        todos: [...state.todos]
          .sort((a, b) => a.title.localeCompare(b.title)),
      };
    case FILTER_BY_NAME:
      return {
        ...state,
        todos: [...state.todos]
          .sort((a, b) => +a.completed - +b.completed),
      };
    case FILTER_BY_COMPLETE:
      return {
        ...state,
        todos: [...state.todos]
          .sort((a, b) => a.user.name.localeCompare(b.user.name)),
      };
    case DELETE_TODO:
      return {
        ...state,
        todos: state.todos.filter((todo: TodoWithUser) => todo.id !== action.idTodos),
      };
    default:
      return state;
  }
};

const store = createStore(
  reducerTodos,
  initialSate,
  applyMiddleware(thunk),
);

export default store;
