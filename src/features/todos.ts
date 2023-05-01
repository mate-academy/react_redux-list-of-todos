import { Todo } from '../types/Todo';

type SetAction = { type: 'todos/set', payload: Todo[] };

const set = (todos: Todo[]): SetAction => ({
  type: 'todos/set',
  payload: todos,
});

export const actions = { set };

const todosReducer = (state: Todo[] = [], action: SetAction) => {
  if (action.type === 'todos/set') {
    return action.payload;
  }

  return state;
};

export default todosReducer;
