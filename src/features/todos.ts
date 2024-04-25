import { Todo } from '../types/Todo';

// Actions type
type LoadTodos = { type: 'todos/LoadTodos'; payload: Todo[] };

// dispatch Functions
const loadTodos = (todos: Todo[]): LoadTodos => ({
  type: 'todos/LoadTodos',
  payload: todos,
});

// These actions will be used in the application
export const actions = { loadTodos };

// Type for initial State
type State = {
  todos: Todo[];
};

type Action = LoadTodos;

const initialState: State = {
  todos: [],
};

// eslint-disable-next-line @typescript-eslint/default-param-last
const todosReducer = (state: State = initialState, action: Action): State => {
  switch (action.type) {
    case 'todos/LoadTodos':
      return { ...state, todos: action.payload };
    default:
      return state;
  }
};

export default todosReducer;
