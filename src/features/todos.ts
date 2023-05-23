import { Reducer } from '../types/Reducer';
import { Todo } from '../types/Todo';

type AddTodos = { type: typeof Reducer.TODOS, payload: Todo[] };

const addTodos = (todos: Todo[]): AddTodos => ({
  type: Reducer.TODOS,
  payload: todos,
});

export const actions = { addTodos };

const todosReducer = (todoList: Todo[] = [], action: AddTodos): Todo[] => {
  if (action.type === Reducer.TODOS) {
    return action.payload;
  }

  return todoList;
};

export default todosReducer;
