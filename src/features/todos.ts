import { Todo } from '../types/Todo';

const SET_TODOS = 'todos/Set';

type SetTodosAction = {
  type: typeof SET_TODOS;
  payload: Todo[];
};

const setTodos = (todos: Todo[]): SetTodosAction => ({
  type: SET_TODOS,
  payload: todos,
});

export const actions = { setTodos };

type State = Todo[];

// eslint-disable-next-line @typescript-eslint/default-param-last
const todosReducer = (state: State = [], action: SetTodosAction): Todo[] => {
  switch (action.type) {
    case SET_TODOS:
      return action.payload;
    default:
      return state;
  }
};

export default todosReducer;
