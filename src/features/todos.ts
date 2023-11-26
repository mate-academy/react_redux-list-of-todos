import { Todo } from '../types/Todo';

type AddAction = { type: 'features/ADD'; payload: Todo[] };

export const actions = {
  add: (todos: Todo[]): AddAction => ({ type: 'features/ADD', payload: todos }),
};

const todosReducer = (todos: Todo[] = [], action: AddAction): Todo[] => {
  switch (action.type) {
    case 'features/ADD':
      return [...todos, ...action.payload];
    default:
      return todos;
  }
};

export default todosReducer;
