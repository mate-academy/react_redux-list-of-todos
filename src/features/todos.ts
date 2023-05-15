import { Todo } from '../types/Todo';

type SetTodosAction = { type: 'todos/SET', payload: Todo[] };
type SetIsLoadingAction = { type: 'isLoading/SET', payload: boolean };
type SetErrorAction = { type: 'error/SET', payload: string };

type Action = SetTodosAction | SetIsLoadingAction | SetErrorAction;

type State = {
  isLoading: boolean;
  error: string;
  data: Todo[];
};

const setTodos = (value: Todo[]): SetTodosAction => ({
  type: 'todos/SET',
  payload: value,
});

const setIsLoading = (value: boolean): SetIsLoadingAction => ({
  type: 'isLoading/SET',
  payload: value,
});

const setError = (value: string): SetErrorAction => ({
  type: 'error/SET',
  payload: value,
});

const initialState: State = {
  isLoading: false,
  error: '',
  data: [],
};

export const actions = { setTodos, setIsLoading, setError };

const todosReducer = (
  state: State = initialState,
  action: Action,
): State => {
  switch (action.type) {
    case 'todos/SET':
      return {
        ...state,
        data: action.payload,
      };

    case 'isLoading/SET':
      return {
        ...state,
        isLoading: action.payload,
      };

    case 'error/SET':
      return {
        ...state,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default todosReducer;
