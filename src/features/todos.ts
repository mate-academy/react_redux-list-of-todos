import { Todo } from '../types/Todo';

type AddAction = { type: 'todos/add'; payload: Todo[]; };

const add = (todos: Todo[]): AddAction => (
  { type: 'todos/add', payload: todos }
);

const todosReducer = (todos: Todo[] = [], action: AddAction): Todo[] => {
  if (action.type === 'todos/add') {
    return [...todos, ...action.payload];
  }

  return todos;
};

export const actions = { add };
export default todosReducer;
