import { Dispatch } from 'redux';
import { getTodos } from '../api';
import { Todo } from '../types/Todo';

interface State {
  todos: Todo[],
  isLoading: boolean,
  error: string | null,
}

const initialState: State = {
  todos: [],
  isLoading: false,
  error: null,
};

type IsLoadingAction = {
  type: 'todos/LOAD'
  payload: boolean,
};

const isLoadingActionCreator = (isLoading: boolean):IsLoadingAction => ({
  type: 'todos/LOAD',
  payload: isLoading,
});

type ErrorAction = {
  type: 'todos/ERROR'
  payload: string,
};

const errorActionCreator = (errorMessage: string): ErrorAction => ({
  type: 'todos/ERROR',
  payload: errorMessage,
});

type GetTodosAction = {
  type: 'todos/GET',
  payload: Todo[],
};

const getTodosActionCreator = (todos: Todo[]): GetTodosAction => ({
  type: 'todos/GET',
  payload: todos,
});

const loadTodosFromServerAction = async (
  dispatch: Dispatch<Action>,
) => {
  try {
    dispatch(isLoadingActionCreator(true));

    const todos = await getTodos();

    dispatch(getTodosActionCreator(todos));
  } catch (error) {
    dispatch(errorActionCreator(`${error}`));
  } finally {
    dispatch(isLoadingActionCreator(false));
  }
};

export const TODOS_ACTIONS = {
  getTodos: getTodosActionCreator,
  loadTodos: loadTodosFromServerAction,
};

type Action = GetTodosAction
| IsLoadingAction
| ErrorAction;

const todosReducer = (
  todosState: State = initialState,
  action: Action,
): State => {
  switch (action.type) {
    case 'todos/GET':
      return {
        ...todosState,
        todos: [...action.payload],
      };

    case 'todos/LOAD':
      return {
        ...todosState,
        isLoading: action.payload,
      };

    case 'todos/ERROR':
      return {
        ...todosState,
        error: action.payload,
      };

    default:
      return todosState;
  }
};

export default todosReducer;
