import { Todo } from '../types/Todo';

type AddAction = { type: 'todos/ADD', payload: Todo | Todo[] };

type Action = AddAction;

export const actions = {
  add: (payload: Todo | Todo[]): AddAction => ({ type: 'todos/ADD', payload }),
};

const todosReducer = (todos: Todo[] = [], action: Action): Todo[] => {
  switch (action.type) {
    case 'todos/ADD': {
      if (Array.isArray(action.payload)) {
        return [...todos, ...action.payload];
      }

      return [...todos, action.payload];
    }

    default:
      return todos;
  }
};

export default todosReducer;
