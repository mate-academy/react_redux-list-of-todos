import { Todo } from '../types/Todo';

type AddAction = {
  type: 'todos/ADD';
  payload: Todo[];
};

type TakeAction = {
  type: 'todos/TAKE';
};

type Action = AddAction | TakeAction;

const add = (value: Todo[]) => ({ type: 'todos/ADD', payload: value });
const take = () => ({ type: 'todos/TAKE' });

export const actions = { add, take };

const todosReducer = (todos: Todo[] = [], action: Action): Todo[] => {
  switch (action.type) {
    case 'todos/ADD':
      return [...action.payload];

    default:
      return todos;
  }
};

export default todosReducer;
