import { Todo } from '../types/Todo';

// we use string literal as a type to avoid mistype in future
type RemoveTodoAction = { type: 'currentTodo/REMOVE' };

// payload is a typical name for an action data
type SetTodoAction = {
  type: 'currentTodo/SET';
  payload: Todo;
};

type SetIsLoadingAction = {
  type: 'currentTodo/SET_loading';
  payload: boolean;
};

// Action creator return type protect us from a mistype
const removeTodo = (): RemoveTodoAction => (
  { type: 'currentTodo/REMOVE' }
);

const setTodo = (todo: Todo): SetTodoAction => ({
  type: 'currentTodo/SET',
  payload: todo,
});

const setIsTodoLoading = (isLoading: boolean): SetIsLoadingAction => ({
  type: 'currentTodo/SET_loading',
  payload: isLoading,
});

// These actions will be used in the application
export const actions = { setTodo, removeTodo, setIsTodoLoading };

interface State {
  todo: Todo | null,
  isTodoLoading: boolean,
}

const initialState: State = {
  todo: null,
  isTodoLoading: false,
};

type Action = SetTodoAction | RemoveTodoAction | SetIsLoadingAction;

const currentTodoReducer = (
  state = initialState,
  action: Action,
): State => {
  switch (action.type) {
    case 'currentTodo/REMOVE':
      return {
        ...state,
        todo: null,
      };
    case 'currentTodo/SET':
      return {
        ...state,
        todo: action.payload,
      };
    case 'currentTodo/SET_loading':
      return {
        ...state,
        isTodoLoading: action.payload,
      };
    default:
      return state;
  }
};

export default currentTodoReducer;
