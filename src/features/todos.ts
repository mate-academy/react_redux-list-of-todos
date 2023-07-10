import { Todo } from '../types/Todo';

type SetTodosAction = { type: 'todos/LOAD', payload: Todo[] };

const setTodos = (todos: Todo[]): SetTodosAction => ({
  type: 'todos/LOAD', payload: todos,
});

type State = Todo[];
type Action = SetTodosAction;

const todosReducer = (state: State = [], action: Action): Todo[] => {
  switch (action.type) {
    case 'todos/LOAD':
      return [...action.payload];

    default:
      return state;
  }
};

export default todosReducer;
export const actions = { setTodos };
