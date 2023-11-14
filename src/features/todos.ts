import { Todo } from '../types/Todo';

type SetAction = { type: 'todos/SET', payload: Todo[] };

const set = (todos: Todo[]): SetAction => ({
  type: 'todos/SET',
  payload: todos,
});

const todosReducer = (state: Todo[] = [], action: SetAction): Todo[] => {
  switch (action.type) {
    case 'todos/SET':
      return [...state, ...action.payload];

    default:
      return state;
  }
};

export const actions = { set };

export default todosReducer;
