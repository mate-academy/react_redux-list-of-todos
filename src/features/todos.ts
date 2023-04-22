import { Todo } from '../types/Todo';

type SetAction = { type: 'todos/SET', payload: Todo[] };
type AddAction = { type: 'todos/ADD', payload: Todo };
type RemoveAction = { type: 'todos/REMOVE', payload : Todo };

type Action = SetAction | AddAction | RemoveAction;
type State = Todo[] | [];

const setTodos = (value: Todo[]): SetAction => ({
  type: 'todos/SET',
  payload: value,
});

export const actions = { setTodos };

const todosReducer = (
  state: State = [],
  action: Action,
): Todo[] => {
  switch (action.type) {
    case 'todos/SET':
      return action.payload;
    default:
      return state;
  }
};

export default todosReducer;
