import { Todo } from '../types/Todo';

type RemoveTodoAction = { type: 'allTodos/REMOVE' };
type SetTodoAction = { type: 'allTodos/SET'; arr: Todo[] };

// Action creator return type protect us from a mistype
const removeTodos = (): RemoveTodoAction => ({ type: 'allTodos/REMOVE' });
const setTodos = (todo: Todo[])
: SetTodoAction => ({ type: 'allTodos/SET', arr: todo });

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
      return [...action.arr];

    case 'allTodos/REMOVE':
      return [];

    default:
      return state;
  }
};

export default allTodosReducer;
