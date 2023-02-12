import { Todo } from '../types/Todo';

type SetTodosAction = {
  type: 'todos/SET',
  payload: Todo[],
};

type SetLoadingAction = {
  type: 'todos/LOADING',
  payload: boolean,
};

const setTodos = (todos: Todo[]): SetTodosAction => ({
  type: 'todos/SET',
  payload: todos,
});

const setLoading = (loadingState: boolean): SetLoadingAction => ({
  type: 'todos/LOADING',
  payload: loadingState,
});

type State = { todos: Todo[], loading: boolean };
type Action = SetLoadingAction | SetTodosAction;

export const actions = { setTodos, setLoading };

const defaultState: State = { todos: [], loading: false };

const todosReducer = (
  state: State = defaultState,
  action: Action,
): State => {
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
    default:
      return state;
  }
};

export default todosReducer;
