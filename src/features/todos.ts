import { Todo } from '../types/Todo';

type AddTodosAction = {
  type: 'todos/ADD',
  payload: Todo,
};

const add = (payload: Todo): AddTodosAction => ({
  type: 'todos/ADD',
  payload,
});

type RemoveTodosAction = {
  type: 'todos/REMOVE',
  payload: number,
};

const remove = (payload: number): RemoveTodosAction => ({
  type: 'todos/REMOVE',
  payload,
});

type SetTodosAction = {
  type: 'todos/SET',
  payload: Todo[],
};

const set = (payload: Todo[]): SetTodosAction => ({
  type: 'todos/SET',
  payload,
});

export const actions = { add, remove, set };

type Action = AddTodosAction | RemoveTodosAction | SetTodosAction;

const todosReducer = (
  state: Todo[] = [],
  action: Action,
): Todo[] => {
  switch (action.type) {
    case 'todos/SET':
      return action.payload;

    case 'todos/ADD':
      return [...state, action.payload];

    case 'todos/REMOVE':
      return state.filter(todo => todo.id !== action.payload);

    default:
      return state;
  }
};

export default todosReducer;
