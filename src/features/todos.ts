import { Todo } from '../types/Todo';

type AddAction = { type: 'todo/ADD', payload: Todo[] };

type Action = AddAction;

const addTodo = (todos: Todo[]): Action => ({
  type: 'todo/ADD',
  payload: todos,
});

export const actions = { addTodo };

const initialState: Todo[] = [];

const todosReducer = (
  todos: Todo[] = initialState,
  action: Action,
): Todo[] => {
  switch (action.type) {
    case 'todo/ADD':
      return action.payload;

    default:
      return todos;
  }
};

export default todosReducer;
