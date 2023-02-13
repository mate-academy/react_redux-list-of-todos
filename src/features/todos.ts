import { Todo } from '../types/Todo';

type SetAction = { type: 'todos/SET', payload: Todo[] };
type AddAction = { type: 'todos/ADD', payload: Todo };
type RemoveAction = { type: 'todos/REMOVE', payload: Todo };

const set = (todos: Todo[]) => ({ type: 'todos/SET', payload: todos });
const add = (todo: Todo) => ({ type: 'todos/ADD', payload: todo });
const remove = (todo: Todo) => ({ type: 'todos/REMOVE', payload: todo });

export const actions = { set, add, remove };

type Action = SetAction | AddAction | RemoveAction;
type State = Todo[];

const todosReducer = (
  state: State = [],
  action: Action,
): State => {
  switch (action.type) {
    case 'todos/SET':
      return [...action.payload];

    case 'todos/ADD':
      return [...state, action.payload];

    case 'todos/REMOVE':
      return state.filter(t => t.id !== action.payload.id);

    default:
      return state;
  }
};

export default todosReducer;
