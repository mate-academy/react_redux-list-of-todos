import { Todo } from '../types/Todo';

type AddTodosAction = {
  type: 'todos/ADD';
  payload: Todo[];
};

const addTodos = (todos: Todo[]): AddTodosAction => ({
  type: 'todos/ADD',
  payload: todos,
});

export const actions = { addTodos };

type Action = AddTodosAction;

const defaultState: { todos: Todo[] } = {
  todos: [],
};

const todosReducer = (state = defaultState, action: Action) => {
  switch (action.type) {
    case 'todos/ADD':
      return { ...state, todos: action.payload };

    default:
      return state;
  }
};

export default todosReducer;
