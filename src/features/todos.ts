import { Todo } from '../types/Todo';

type AddTodosAction = { type: 'todos/ADD', payload: Todo[] };

const addTodos = (todos: Todo[]): AddTodosAction => ({
  type: 'todos/ADD', payload: todos,
});

type Action = AddTodosAction;
export const actions = { addTodos };

const todosReducer = (todos: Todo[] = [], action: Action): Todo[] => {
  switch (action.type) {
    case 'todos/ADD':
      return action.payload;
    default:
      return todos;
  }
};

export default todosReducer;
