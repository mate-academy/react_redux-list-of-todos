import Todo from '../types/Todo';

type SetTodoAction = {
  type: 'currentTodo/SET_TODO';
  payload: Todo;
};

type SetTodoIdAction = {
  type: 'currentTodo/SET_ID';
  payload: number;
};

type SetLoadingAction = {
  type: 'currentTodo/LOADING';
  payload: boolean;
};

type SetErrorAction = {
  type: 'currentTodo/ERROR';
  payload: boolean;
};

type ResetTodoAction = {
  type: 'currentTodo/RESET_TODO';
};

type Action = (
  SetTodoAction
  | SetTodoIdAction
  | SetLoadingAction
  | SetErrorAction
  | ResetTodoAction
);

type CurrentTodoState = {
  todo: Todo;
  error: boolean;
  loading: boolean;
};

export const initialTodo: Todo = {
  id: 0,
  title: '',
  completed: false,
  userId: 0,
};

const initialState: CurrentTodoState = {
  todo: initialTodo,
  error: false,
  loading: false,
};

const currentTodoReducer = (
  state = initialState,
  action: Action,
): CurrentTodoState => {
  switch (action.type) {
    case 'currentTodo/SET_TODO':
      return {
        ...state,
        todo: action.payload,
      };

    case 'currentTodo/SET_ID':
      return {
        ...state,
        todo: {
          ...state.todo,
          id: action.payload,
        },
      };

    case 'currentTodo/LOADING':
      return {
        ...state,
        loading: action.payload,
      };

    case 'currentTodo/ERROR':
      return {
        ...state,
        error: action.payload,
      };

    case 'currentTodo/RESET_TODO':
      return initialState;

    default:
      return state;
  }
};

export const actions = {
  setTodo: (newTodo: Todo): SetTodoAction => (
    { type: 'currentTodo/SET_TODO', payload: newTodo }
  ),

  setTodoId: (id: number): SetTodoIdAction => (
    { type: 'currentTodo/SET_ID', payload: id }
  ),

  setLoading: (loadingState: boolean): SetLoadingAction => (
    { type: 'currentTodo/LOADING', payload: loadingState }
  ),

  setError: (errorState: boolean): SetErrorAction => (
    { type: 'currentTodo/ERROR', payload: errorState }
  ),

  resetTodo: (): ResetTodoAction => (
    { type: 'currentTodo/RESET_TODO' }
  ),
};

export default currentTodoReducer;
