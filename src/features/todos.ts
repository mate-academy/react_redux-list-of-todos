import { Todo } from '../types/Todo';

type TodosAction = { type: 'TODOS/SET', payload: Todo[] };

const setTodos = (todos: Todo []):TodosAction => {
  return { type: 'TODOS/SET', payload: todos };
};

type State = Todo[] | [];
type Action = TodosAction;

export const actions = { setTodos };

const todosReducer = (
  state: State = [],
  action: Action,
): Todo[] => {
  switch (action.type) {
    case 'TODOS/SET':
      return action.payload;
    default:
      return state;
  }
};

export default todosReducer;
