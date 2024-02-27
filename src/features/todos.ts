import { Todo } from '../types/Todo';

type SetAction = { type: 'SET'; payload: Todo[] };

type Action = SetAction;
type State = Todo[] | null;

export const setData = (data: Todo[]) => ({ type: 'SET', payload: data });
export const actions = { setData };

const todosReducer = (state: State = null, action: Action): State => {
  switch (action.type) {
    case 'SET':
      return action.payload;
    default:
      return state;
  }
};

export default todosReducer;
