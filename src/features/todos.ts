import { Todo } from '../types/Todo';

type AddAction = { type: 'todo/add', payload: Todo[] };
type RemoveAction = { type: 'todo/remove', payload: Todo[] };
type ClearAction = { type: 'todo/clear' };

type Action = AddAction | RemoveAction | ClearAction;

const add = (todos: Todo[]): AddAction => ({
  type: 'todo/add',
  payload: todos,
});

const remove = (todos: Todo[]): RemoveAction => ({
  type: 'todo/remove',
  payload: todos,
});

const clear = (): ClearAction => ({ type: 'todo/clear' });

export const actions = { add, remove, clear };

const todosReducer = (todos = [], action: Action): Todo[] => {
  switch (action.type) {
    case 'todo/add':
      return [...todos, ...action.payload];

    case 'todo/remove':
      return todos
        .filter(({ id }) => !action.payload
          .map(todo => todo.id).includes(id));

    case 'todo/clear':
      return [];

    default:
      return todos;
  }
};

export default todosReducer;
