import { Todo } from '../types/Todo';

type AddTodosActions = { type: 'TODOS/SET', payload: Todo[] };

const addTodos = (list: Todo[]): AddTodosActions => (
  { type: 'TODOS/SET', payload: list }
);

export const actions = { addTodos };

const todosReducer = (
  state: Todo[] = [],
  action: AddTodosActions,
): Todo[] => {
  switch (action.type) {
    case 'TODOS/SET':
      return state.concat(action.payload);

    default:
      return state;
  }
};

export default todosReducer;
