import { Todo } from '../types/Todo';

type TodosState = {
  todos: Todo[],
  loading: boolean,
  error: string,
};

type SetTodosAction = {
  type: 'todos/SET',
  payload: Todo[],
};

type SetLoadingAction = {
  type: 'todos/LOADING',
  payload: boolean,
};

type SetErrorAction = {
  type: 'todos/ERROR',
  payload: string,
};

const setTodos = (todos: Todo[]) : SetTodosAction => ({
  type: 'todos/SET',
  payload: todos,
});

const setTodosLoading = (status: boolean): SetLoadingAction => ({
  type: 'todos/LOADING',
  payload: status,
});

const setTodosError = (error: string): SetErrorAction => ({
  type: 'todos/ERROR',
  payload: error,
});

export const actions = { setTodos, setTodosLoading, setTodosError };

const initialState = {
  todos: [],
  loading: false,
  error: '',
};

type TodosAction = SetTodosAction | SetLoadingAction | SetErrorAction;
const todosReducer = (
  state: TodosState = initialState,
  action: TodosAction,
): TodosState => {
  switch (action.type) {
    case 'todos/SET':
      return {
        ...state,
        todos: action.payload,
      };
    case 'todos/LOADING':
      return {
        ...state,
        loading: action.payload,
      };
    case 'todos/ERROR':
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default todosReducer;
