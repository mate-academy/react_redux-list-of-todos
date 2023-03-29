import { Todo } from '../types/Todo';

type AddTodosAction = { type: 'addTodos/SET', payload: Todo[] };

const addTodos = (list:Todo[]): AddTodosAction => {
  return { type: 'addTodos/SET', payload: list };
};

export const actions = { addTodos };

type State = Todo[];
type Action = AddTodosAction;

const todosReducer = (
  state: State = [],
  action: Action,
): State => {
  switch (action.type) {
    case 'addTodos/SET':
      return state.concat(action.payload);
    default:
      return state;
  }
};

export default todosReducer;
