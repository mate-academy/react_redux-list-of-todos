import { Todo } from '../types/Todo';

type SetAction = {
  type: 'todos/SET';
  payload: Todo[];
};

const setTodos = (todos: Todo[]): SetAction => ({
  type: 'todos/SET',
  payload: todos,
});

const initialState: Todo[] = [];
/* eslint-disable-next-line*/
const todosReducer = (state = initialState, action: SetAction): Todo[] => {
  switch (action.type) {
    case 'todos/SET': {
      return action.payload || [];
    }

    default:
      return state;
  }
};

export const actions = { setTodos };
export default todosReducer;
