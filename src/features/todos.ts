import { Todo } from '../types/Todo';

type SetTodosAction = {
  type: 'currentTodos/SET';
  payload: Todo[];
};

const setTodos = (todos: Todo[]): SetTodosAction => ({
  type: 'currentTodos/SET',
  payload: todos,
});

export const actions = { setTodos };

type State = Todo[];
type Action = SetTodosAction;

const todosReducer = (state: State = [], action: Action): Todo[] => {
  if (action.type === 'currentTodos/SET') {
    return action.payload;
  }

  return state;
};

export default todosReducer;
