import { Todo } from '../types/Todo';

type SetAction = {
  type: 'todos/SET',
  payload: Todo[],
};

const set = (todos: Todo[]): SetAction => ({
  type: 'todos/SET',
  payload: todos,
});

export const actions = { set };

type State = Todo[];

const todosReducer = (state: State = [], action: SetAction): Todo[] => {
  switch (action.type) {
    case 'todos/SET':
      return action.payload;

    default:
      return state;
  }
};

export default todosReducer;
