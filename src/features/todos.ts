import { Todo } from '../types/Todo';

type CreateAction = {
  type: 'todos/CREATE';
  payload: Todo[];
};

type AddAction = {
  type: 'todos/ADD',
  payload: Todo,
};

type Action = CreateAction | AddAction;

const create = (todos: Todo[]): CreateAction => ({
  type: 'todos/CREATE',
  payload: todos,
});

const add = (todo: Todo): AddAction => ({
  type: 'todos/ADD',
  payload: todo,
});

export const actions = { create, add };

const todosReducer = (todos: Todo[] = [], action: Action): Todo[] => {
  switch (action.type) {
    case 'todos/CREATE':
      return [...todos];

    case 'todos/ADD':
      return [...todos, action.payload];

    default:
      return todos;
  }
};

export default todosReducer;
