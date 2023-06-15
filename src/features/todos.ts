import { Todo } from '../types/Todo';

type AddAction = {
  type: 'todos/ADD',
  payload: Todo[],
};

const addTodos = (todos: Todo[]): AddAction => ({
  type: 'todos/ADD',
  payload: todos,
});

export const actions = { addTodos };

type Action = AddAction;
type State = Todo[];

const initialState: Todo[] = [];

const todosReducer = (
  state: State = initialState,
  action: Action,
): Todo[] => {
  switch (action.type) {
    case 'todos/ADD':
      return action.payload;

    default:
      return state;
  }
};

export default todosReducer;
