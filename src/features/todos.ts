import { Todo } from '../types/Todo';

type AddTodosAction = { type: 'todos/ADDALL'; payload: Todo[] };

const addTodos = (todos: Todo[]): AddTodosAction => ({
  type: 'todos/ADDALL',
  payload: todos,
});

export const actions = { addTodos };

type State = Todo[] | [];

// eslint-disable-next-line @typescript-eslint/default-param-last
const todosReducer = (state: State = [], action: AddTodosAction): Todo[] => {
  switch (action.type) {
    case 'todos/ADDALL': {
      return action.payload;
    }

    default:
      return state;
  }
};

export default todosReducer;
