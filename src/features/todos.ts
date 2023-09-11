import { Todo } from '../types/Todo';

type SetTodoAction = {
  type: 'currentTodos/SET';
  payload: Todo[];
};

const setTodos = (todos: Todo[]): SetTodoAction => ({
  type: 'currentTodos/SET',
  payload: todos,
});

type Action = SetTodoAction;

const initialState = {
  todos: [] as Todo[],
};

export const actions = { setTodos };

const todosReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case 'currentTodos/SET': {
      return { ...state, todos: action.payload };
    }

    default:
      return state;
  }
};

export default todosReducer;
