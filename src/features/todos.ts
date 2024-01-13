import { Todo } from '../types/Todo';

enum ReducerType {
  SET = 'todos/SET',
}

type Action = { type: ReducerType.SET, payload: Todo[] };

export const actions = {
  set: (payload: Todo[]) => ({
    type: ReducerType.SET,
    payload,
  }),
};

const todosReducer = (state: Todo[] = [], action: Action): Todo[] => {
  switch (action.type) {
    case ReducerType.SET:
      return action.payload;

    default:
      return state;
  }
};

export default todosReducer;
