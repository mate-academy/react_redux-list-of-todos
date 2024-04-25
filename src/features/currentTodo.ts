import { Todo } from '../types/Todo';

// Actions type
type RemoveTodoAction = { type: 'currentTodo/REMOVE' };

type SetTodoAction = {
  type: 'currentTodo/SET';
  payload: Todo | null;
};

// dispatch Functions
const removeTodo = (): RemoveTodoAction => ({ type: 'currentTodo/REMOVE' });

const setTodo = (currentTodo: Todo): SetTodoAction => ({
  type: 'currentTodo/SET',
  payload: currentTodo,
});

// These actions will be used in the application
export const actions = { setTodo, removeTodo };

// Type for initial State
type State = {
  currentTodo: Todo | null;
};

type Action = SetTodoAction | RemoveTodoAction;

const initialState: State = {
  currentTodo: null,
};

const currentTodoReducer = (
  // eslint-disable-next-line @typescript-eslint/default-param-last
  state: State = initialState,
  action: Action,
): State => {
  switch (action.type) {
    case 'currentTodo/SET':
      return {
        ...state,
        currentTodo: action.payload,
      };
    case 'currentTodo/REMOVE':
      return {
        ...state,
        currentTodo: null,
      };

    default:
      return state;
  }
};

export default currentTodoReducer;
