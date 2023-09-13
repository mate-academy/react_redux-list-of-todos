import { Todo } from '../types/Todo';

type TodoAction = {
  type: 'currentTodos/SET',
  payload: Todo[],
};

const setTodos = (todos: Todo[]): TodoAction => ({
  type: 'currentTodos/SET',
  payload: todos,
});

type Action = TodoAction;
type State = {
  todos: Todo[],
};

const initialState: State = {
  todos: [] as Todo[],
};

export const actions = { setTodos };

const todosReducer = (state: State = initialState, action: Action) => {
  switch (action.type) {
    case 'currentTodos/SET':
      return { ...state, todos: action.payload };

    default:
      return state;
  }
};

export default todosReducer;
