import { Todo } from '../types/Todo';

// we use string literal as a type to avoid mistype in future
type RemoveTodoAction = {
  type: 'currentTodo/REMOVE',
};

// payload is a typical name for an action data
type SetTodoAction = {
  type: 'currentTodo/SET';
  payload: Todo;
};

// These actions will be used in the application
export const actions = {
  setTodo(todo: Todo): SetTodoAction {
    return {
      type: 'currentTodo/SET',
      payload: todo,
    };
  },
  removeTodo(): RemoveTodoAction {
    return {
      type: 'currentTodo/REMOVE',
    };
  },
};

type State = Todo | null;
type Action = SetTodoAction | RemoveTodoAction;

const currentTodoReducer = (
  state: State = null,
  action: Action,
): State => {
  switch (action.type) {
    // Implement all actions here
    case 'currentTodo/SET': {
      return action.payload;
    }

    case 'currentTodo/REMOVE': {
      return null;
    }

    default:
      return state;
  }
};

export default currentTodoReducer;
