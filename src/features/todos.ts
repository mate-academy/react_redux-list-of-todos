import { Todo } from '../types/Todo';

const GET_TODOS = 'get/godos';

type SetTodos = {
  type: typeof GET_TODOS,
  payload: Todo[]
};

export const setTodos = (payload: Todo []): SetTodos => ({
  type: GET_TODOS,
  payload,
});

type State = Todo[];

const todosReducer = (state: State = [], action: SetTodos): Todo[] => {
  switch (action.type) {
    case 'get/godos':
      return action.payload;

    default:
      return state;
  }
};

export const actions = { setTodos };

export default todosReducer;
