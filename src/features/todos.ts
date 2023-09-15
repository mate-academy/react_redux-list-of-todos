import { Todo } from '../types/Todo';

type SetAction = {
  type: 'todos/SET',
  payload: Todo[],
};

type SetLoadingAction = {
  type: 'todos/SET_LOADING',
  payload: boolean,
};

type SetErrorAction = {
  type: 'todos/SET_ERROR',
  payload: string,
};

const set = (todos: Todo[]): SetAction => ({
  type: 'todos/SET',
  payload: todos,
});

const setLoading = (isLoading: boolean): SetLoadingAction => ({
  type: 'todos/SET_LOADING',
  payload: isLoading,
});

const setError = (error: string): SetErrorAction => ({
  type: 'todos/SET_ERROR',
  payload: error,
});

type State = {
  loading: boolean,
  todos: Todo[],
  error: string,
};

const initState = {
  loading: false,
  todos: [],
  error: '',
};

type Action = SetAction | SetLoadingAction | SetErrorAction;

export const actions = { set, setLoading, setError };

const todosReducer = (
  state = initState,
  action: Action,
): State => {
  switch (action.type) {
    case 'todos/SET':
      return {
        ...state,
        todos: action.payload,
      };
    case 'todos/SET_LOADING':
      return {
        ...state,
        loading: action.payload,
      };
    case 'todos/SET_ERROR':
      return {
        ...state,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default todosReducer;
