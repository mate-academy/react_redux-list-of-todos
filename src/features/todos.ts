import { Todo } from '../types/Todo';

type SetTodos = {
  type: 'todos/SET';
  payload: Todo[];
};

type TodosAreLoading = {
  type: 'todos/TODOS_ARE_LOADING';
  payload: boolean;
};

type Action = SetTodos | TodosAreLoading;

type State = {
  todos: Todo[];
  isLoading: boolean;
};

const setTodosAction = (todos: Todo[]): SetTodos => {
  return {
    type: 'todos/SET',
    payload: todos,
  };
};

const todosAreLoadingAction = (value: boolean): TodosAreLoading => {
  return {
    type: 'todos/TODOS_ARE_LOADING',
    payload: value,
  };
};

export const actions = { setTodosAction, todosAreLoadingAction };

const initialState: State = {
  todos: [],
  isLoading: false,
};

export const todosReducer = (
  state: State = initialState,
  action: Action,
): State => {
  switch (action.type) {
    case 'todos/SET':
      return {
        ...state,
        todos: action.payload,
      };
    case 'todos/TODOS_ARE_LOADING':
      return {
        ...state,
        isLoading: action.payload,
      };
    default:
      return state;
  }
};
