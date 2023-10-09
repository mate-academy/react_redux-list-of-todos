import { Todo } from '../types/Todo';

type AddAction = {
  type: 'todos/ADD',
  payload: Todo[]
};

type Actions = AddAction;

const add = (todos: Todo[]) => ({ type: 'todos/ADD', payload: todos });

export const actions = { add };

const todosReducer = (todos: Todo[] = [], action: Actions): Todo[] => {
  if (action.type === 'todos/ADD') {
    return [...todos, ...action.payload];
  }

  return todos;
};

export default todosReducer;
