import { Todo } from '../types/Todo';

type AddAction = { type: 'todo/ADD', payload: Todo };
type TakeAction = { type: 'todo/TAKE', payload: Todo };
type ClearAction = { type: 'todo/CLEAR' };

type Action = AddAction | TakeAction | ClearAction;

const add = (todo: Todo): AddAction => ({ type: 'todo/ADD', payload: todo });
const take = (todo: Todo): TakeAction => ({ type: 'todo/TAKE', payload: todo });
const clear = (): ClearAction => ({ type: 'todo/CLEAR' });

export const actions = { add, take, clear };

const todosReducer = (todos: Todo[] = [], action: Action): Todo[] => {
  switch (action.type) {
    case 'todo/ADD':
      return [
        ...todos,
        action.payload,
      ];

    case 'todo/TAKE':
      return todos.filter(todo => todo !== action.payload);

    case 'todo/CLEAR':
      return [];

    default:
      return todos;
  }
};

export default todosReducer;
