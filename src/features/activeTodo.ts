import { Todo } from '../types/Todo';

type AddTodo = { type: 'todo/ADD', arr: Todo };
type RemoveTodo = { type : 'todo/REMOVE' };

const addTodo = (todo: Todo): AddTodo => ({ type: 'todo/ADD', arr: todo });
const removeTodo = (): RemoveTodo => ({ type: 'todo/REMOVE' });

export const actions = { addTodo, removeTodo };

type Actions = AddTodo | RemoveTodo;
type State = Todo | null;

export const todosReducer = (state: State = null, payload: Actions) => {
  switch (payload.type) {
    case 'todo/ADD':
      return payload.arr;

    case 'todo/REMOVE':
      return null;

    default:
      return state;
  }
};

export default todosReducer;
