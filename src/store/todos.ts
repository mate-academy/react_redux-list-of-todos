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
    type: TodosActionTypes.todos_FETCH_START,
  }),
  setTodos: (todos: Todo[]): TodosFetchSuccess => ({
    type: TodosActionTypes.todos_FETCH_SUCCESS,
    payload: todos,
  }),
  setError: (error: string): TodosFetchError => ({
    type: TodosActionTypes.todos_FETCH_ERROR,
    payload: error,
  }),
  finishFetch: (): TodosFetchFinish => ({
    type: TodosActionTypes.todos_FETCH_FINISH,
  }),
  selectTodo: (todo: Todo): SelectTodo => ({
    type: TodosActionTypes.todo_SELECT,
    payload: todo,
  }),
  unselectTodo: (): UnselectTodo => ({ type: TodosActionTypes.todo_UNSELECT }),
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
    case TodosActionTypes.todos_FETCH_START:
      return {
        ...state,
        loading: true,
      };
    case TodosActionTypes.todos_FETCH_SUCCESS:
      return {
        ...state,
        todos: action.payload,
      };
    case TodosActionTypes.todos_FETCH_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    case TodosActionTypes.todos_FETCH_FINISH:
      return {
        ...state,
        loading: false,
      };
    case TodosActionTypes.todo_SELECT:
      return {
        ...state,
        selectedTodo: action.payload,
      };
    case TodosActionTypes.todo_UNSELECT:
      return {
        ...state,
        selectedTodo: null,
      };
    default:
      return state;
  }
};

export default todosReducer;
