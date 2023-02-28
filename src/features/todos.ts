import { Todo } from '../types/Todo';

type SetAction = {
  type: 'todo/SET',
  payload: Todo[],
};

type AddAction = {
  type: 'todo/ADD',
  payload: Todo,
};

type DeleteAction = {
  type: 'todo/DELETE'
  payload: Todo,
};

const set = (todos: Todo[]): SetAction => ({
  type: 'todo/SET',
  payload: todos,
});

const add = (todo: Todo): AddAction => ({
  type: 'todo/ADD',
  payload: todo,
});

const del = (todo: Todo): DeleteAction => ({
  type: 'todo/DELETE',
  payload: todo,
});

type Action = DeleteAction | SetAction | AddAction;
type State = Todo[];

export const actions = { set, add, del };

const todosReducer = (state: State = [], action: Action): State => {
  switch (action.type) {
    case 'todo/SET':
      return [...action.payload];

    case 'todo/DELETE':
      return state
        .filter(todo => todo.id !== action.payload.id);

    case 'todo/ADD':
      return [...state, action.payload];

    default:
      return state;
  }
};

export default todosReducer;
