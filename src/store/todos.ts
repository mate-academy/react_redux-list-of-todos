import { Action } from 'redux';

const TODOS = 'TODOS';

type Todos = Action<typeof TODOS> & { todos: Todo[] };

export const setTodosAction = (todos: Todo[]): Todos => ({ type: TODOS, todos });

const todosReducer = (state = [] as Todo[], action: Todos) => {
  switch (action.type) {
    case TODOS:
      return action.todos;

    default:
      return state;
  }
};

export default todosReducer;
