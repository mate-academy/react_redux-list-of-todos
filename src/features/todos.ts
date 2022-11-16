import { Todo } from '../types/Todo';

type AddTodosAction = {
  type: 'todos/ADD';
  payload: Todo[];
};

const addTodos = (todos: Todo[]): AddTodosAction => ({
  type: 'todos/ADD',
  payload: todos,
});

export const actions = { addTodos };

type Action = AddTodosAction;

const todosReducer = (state: Todo[] = [], action: Action): Todo[] => {
  switch (action.type) {
    case 'todos/ADD':
      return action.payload;
    default:
      return state;
  }
};

export default todosReducer;
