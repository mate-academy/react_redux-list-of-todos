import { Dispatch } from 'redux';
import {
  SelectTodo,
  Todo,
  TodosAction,
  TodosActionTypes,
  TodosFetchError,
  TodosFetchFinish,
  TodosFetchStart,
  TodosFetchSuccess,
  TodosState,
  UnselectTodo,
} from '../types/Todo';
import { getTodos } from '../api';

const initialState: TodosState = {
  todos: [],
  loading: false,
  error: null,
  selectedTodo: null,
};

export const actions = {
  startFetch: (): TodosFetchStart => ({
    type: TodosActionTypes.TodosFetchStart,
  }),
  setTodos: (todos: Todo[]): TodosFetchSuccess => ({
    type: TodosActionTypes.TodosFetchSuccess,
    payload: todos,
  }),
  setError: (error: string): TodosFetchError => ({
    type: TodosActionTypes.TodosFetchError,
    payload: error,
  }),
  finishFetch: (): TodosFetchFinish => ({
    type: TodosActionTypes.TodosFetchFinish,
  }),
  selectTodo: (todo: Todo): SelectTodo => ({
    type: TodosActionTypes.TodoSelect,
    payload: todo,
  }),
  unselectTodo: (): UnselectTodo => ({ type: TodosActionTypes.TodoUnselect }),
};

export const fetchTodos = () => {
  return (dispatch: Dispatch<TodosAction>) => {
    dispatch(actions.startFetch());

    getTodos()
      .then(todosFromServer => dispatch(actions.setTodos(todosFromServer)))
      .catch(err => dispatch(actions.setError(err)))
      .finally(() => dispatch(actions.finishFetch()));
  };
};

const todosReducer = (
  state = initialState,
  action: TodosAction,
) : TodosState => {
  switch (action.type) {
    case TodosActionTypes.TodosFetchStart:
      return {
        ...state,
        loading: true,
      };
    case TodosActionTypes.TodosFetchSuccess:
      return {
        ...state,
        todos: action.payload,
      };
    case TodosActionTypes.TodosFetchError:
      return {
        ...state,
        error: action.payload,
      };
    case TodosActionTypes.TodosFetchFinish:
      return {
        ...state,
        loading: false,
      };
    case TodosActionTypes.TodoSelect:
      return {
        ...state,
        selectedTodo: action.payload,
      };
    case TodosActionTypes.TodoUnselect:
      return {
        ...state,
        selectedTodo: null,
      };
    default:
      return state;
  }
};

export default todosReducer;
