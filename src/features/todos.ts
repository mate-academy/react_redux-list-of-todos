import { Todo } from '../types/Todo';

type SetTodosAction = {
  type: 'todos/SET';
  payload: Todo[];
};

type SetTodosIsLoadingAction = {
  type: 'todos/SET_TODOS_IS_LOADING';
  payload: boolean;
};

const setTodosIsLoading = (value: boolean): SetTodosIsLoadingAction => ({
  type: 'todos/SET_TODOS_IS_LOADING',
  payload: value,
});

const setTodos = (todos: Todo[]): SetTodosAction => ({
  type: 'todos/SET',
  payload: todos,
});

export const actions = { setTodos, setTodosIsLoading };

type State = {
  todos: Todo[],
  isLoading: boolean,
};

type Action = SetTodosAction | SetTodosIsLoadingAction;

const initialState: State = {
  todos: [],
  isLoading: false,
};

const todosReducer = (
  state: State = initialState,
  action: Action,
): State => {
  switch (action.type) {
    case 'todos/SET':
      return {
        ...state,
        todos: action.payload,
      };

    case 'todos/SET_TODOS_IS_LOADING':
      return {
        ...state,
        isLoading: action.payload,
      };

    default:
      return state;
  }
};

export default todosReducer;
