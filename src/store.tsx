import { AnyAction, createStore } from 'redux';

const IS_LOADING = 'IS_LOADING';
const SET_TODOS = 'SET_TODOS';
const DELETE_TODO = 'DELETE_TODO';

export const setIsLoad = (isLoading: boolean) => ({ type: IS_LOADING, isLoading });
export const setTodosWithUsers = (todos: TodoWithUser[] | []) => ({ type: SET_TODOS, todos });
export const deleteSomeTodo = (idTodos: number) => ({ type: DELETE_TODO, idTodos });

export interface State {
  todos: TodoWithUser[] | [];
  isLoading: boolean;
}

const initialSate: State = {
  todos: [],
  isLoading: false,
};


const reducerTodos = (state: State = initialSate, action: AnyAction) => {
  switch (action.type) {
    case IS_LOADING:
      return {
        ...state,
        isLoading: action.isLoading,
      };
    case SET_TODOS:
      return {
        ...state,
        todos: [...action.todos],
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

const store = createStore(reducerTodos, initialSate);

export default store;
