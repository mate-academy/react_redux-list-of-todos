import { createStore, AnyAction } from 'redux';

interface RootState {
  todos: Todo[];
  isLoaded: boolean;
}

const initialState: RootState = {
  todos: [],
  isLoaded: false
}

const SET_LOADED_STATUS = 'SET_LOADED_STATUS';
const SET_TODOS = 'SET_TODOS';
const TODOS_SORT_USER = 'TODOS_SORT_USER';
const TODOS_SORT_TITLE = 'TODOS_SORT_TITLE';
const TODOS_SORT_COMPLETED = 'TODOS_SORT_COMPLETED';
const DELETE_TODO = 'DELETE_TODO';

export const setTodos = (todos: Todo[]) => ({ type: SET_TODOS, payload: todos});
export const setLoadingStatus = () => ({ type: SET_LOADED_STATUS});
export const todosSortUser = () => ({ type: TODOS_SORT_USER });
export const todosSortTitle = () => ({ type: TODOS_SORT_TITLE });
export const todosSortCompleted = () => ({ type: TODOS_SORT_COMPLETED });
export const deleteTodo = (id: Number) => ({ type: DELETE_TODO, payload: id });

export const selectTodos = (state: RootState) => state.todos;
export const getLoadingStatus = (state: RootState) => state.isLoaded;

const reducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case SET_TODOS:
      return {
        ...state,
        todos: action.payload
      };
    case SET_LOADED_STATUS:
      return {
        ...state,
        isLoaded: true
      };
    case TODOS_SORT_USER:
      return {
        ...state,
        todos: [...state.todos].sort((first, second) => first.user.name.localeCompare(second.user.name))
      };
    case TODOS_SORT_TITLE:
      return {
        ...state,
        todos: [...state.todos].sort((first, second) => first.title.localeCompare(second.title))
      };
    case TODOS_SORT_COMPLETED:
      return {
        ...state,
        todos: [...state.todos].sort((first, second) => Number(second.completed) - Number(first.completed))
      };
    case DELETE_TODO:
      return {
        ...state,
        todos: [...state.todos].filter(todo => todo.id !== action.payload)
      };
    default:
      return state;
  }
};

const store = createStore(reducer, initialState);

export default store;
