import { Todo } from '../types/Todo';

type AddAction = { type: 'todos/ADD', payload: Todo[] };

type Action = AddAction;

const addTodos = (todos: Todo[]): AddAction => (
  { type: 'todos/ADD', payload: todos });

export const actions = { addTodos };

type State = Todo[] | [];

const todosReducer = (state: State = [], action: Action): Todo[] => {
  switch (action.type) {
    case 'todos/ADD':
      return [...action.payload];
    default:
      return state;
  }
};

export default todosReducer;
