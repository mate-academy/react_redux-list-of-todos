import { Todo } from '../types/Todo';

type LoadAction = { type: 'todos/LOAD', payload: Todo[] };

type Action = LoadAction;

const load = (payload: Todo[]): LoadAction => ({ type: 'todos/LOAD', payload });

const todosReducer = (todos: Todo[] = [], action: Action): Todo[] => {
  switch (action.type) {
    case 'todos/LOAD': {
      return action.payload;
    }

    default:
      return todos;
  }
};

export const actions = { load };
export default todosReducer;
