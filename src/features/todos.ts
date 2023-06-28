import { Todo } from '../types/Todo';

type SetAction = { type: 'todos/SET', payload: Todo[] };
type AddAction = { type: 'todos/ADD', payload: Todo };
type RemoveAction = { type: 'todos/REMOVE', payload: Todo };

const setTodos = (todos: Todo[]): SetAction => ({
  type: 'todos/SET',
  payload: todos,
});
const addTodo = (todo: Todo): AddAction => ({
  type: 'todos/ADD',
  payload: todo,
});
const removeTodo = (todo: Todo): RemoveAction => ({
  type: 'todos/REMOVE',
  payload: todo,
});

  type State = Todo[];
  type Action = SetAction | AddAction | RemoveAction;

const todosReducer = (state: State = [], action: Action): Todo[] => {
  const { type, payload } = action;

  switch (type) {
    case 'todos/SET':
      return [...payload];
    case 'todos/ADD':
      return [...state, payload];
    case 'todos/REMOVE':
      return state.filter(todo => todo.id !== payload.id);
    default:
      return state;
  }
};

export const actions = { setTodos, addTodo, removeTodo };
export default todosReducer;
