import { Todo } from '../types/Todo';

type RemoveTodoAction = { type: 'allTodos/REMOVE' };
type SetTodoAction = { type: 'allTodos/SET'; todos: Todo[] };

// Action creator return type protect us from a mistype
const removeTodos = (): RemoveTodoAction => ({ type: 'allTodos/REMOVE' });
const setTodos = (todos: Todo[])
: SetTodoAction => ({ type: 'allTodos/SET', todos });

// These actions will be used in the application
export const actions = { setTodos, removeTodos };

type State = Todo[] | [];
type Action = SetTodoAction | RemoveTodoAction;

export const allTodosReducer = (
  state: State = [],
  action: Action,
): State => {
  switch (action.type) {
    case 'allTodos/SET':
      return [...action.todos];

    case 'allTodos/REMOVE':
      return [];

    default:
      return state;
  }
};

export default allTodosReducer;
