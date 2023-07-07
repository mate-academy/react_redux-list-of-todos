/* eslint-disable no-console */
import { Todo } from '../types/Todo';

interface Action {
  type: string,
  payload: Todo[],
}

export const actions = {
  set: (data: Todo[]) => ({
    type: 'set',
    payload: data,
  }),
};

const todosReducer = (state: Todo[] = [], action: Action): Todo[] => {
  if (action.type === 'set' && Array.isArray(action.payload)) {
    return [...action.payload];
  }

  return state;
};

export default todosReducer;
