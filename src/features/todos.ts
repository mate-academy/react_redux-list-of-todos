import { Todo } from '../types/Todo';

// payload is a typical name for an action data
type SetTodosAction = {
  type: 'todos/SET';
  payload: Todo[];
};

// Action creator return type protect us from a mistype
const setTodos = (todos: Todo[]): SetTodosAction => ({
  type: 'todos/SET',
  payload: todos,
});

const initialState: Todo[] = [];

// These actions will be used in the application
export const actions = { setTodos };

type Action = SetTodosAction;

const todosReducer = (
  state = initialState,
  action: Action,
): Todo[] => {
  switch (action.type) {
    case 'todos/SET':
      return action.payload;
    default:
      return state;
  }
};

export default todosReducer;
