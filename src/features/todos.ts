import { Todo } from '../types/Todo';

type AddAction = { type: 'todos/ADD', payload: Todo[] };

const addTodos = (todos: Todo[]): AddAction => ({
  type: 'todos/ADD',
  payload: todos,
});

type Action = AddAction;

type State = Todo[] | [];

const todosReducer = (
  state: State = [],
  action: Action,
): Todo[] => {
  switch (action.type) {
    case 'todos/ADD':
      return [...action.payload];
    default:
      return state;
  }
};

export const actions = { addTodos };
export default todosReducer;
