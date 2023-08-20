import { Todo } from '../types/Todo';

type SetTodosAction = {
  type: 'todos/SET';
  payload: Todo[];
};

const setTodos = (todos: Todo[]): SetTodosAction => ({
  type: 'todos/SET',
  payload: todos,
});

export const actions = { setTodos };

type State = Todo[];
type Action = SetTodosAction;

/*
// we use string literal as a type to avoid mistype in future
type RemoveTodoAction = { type: 'currentTodo/REMOVE' };

// payload is a typical name for an action data
type SetTodoAction = {
  type: 'currentTodo/SET';
  payload: Todo;
};

// Action creator return type protect us from a mistype
const removeTodo = (): RemoveTodoAction => ({ type: 'currentTodo/REMOVE' });

const setTodo = (todo: Todo): SetTodoAction => ({
  type: 'currentTodo/SET',
  payload: todo,
});

// These actions will be used in the application
export const actions = { setTodo, removeTodo };

type State = Todo | null;
type Action = SetTodoAction | RemoveTodoAction;
*/

const todosReducer = (
  state: State = [],
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
