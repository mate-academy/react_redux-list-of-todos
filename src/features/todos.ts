import { Todo } from '../types/Todo';

type AddTodoAction = {
  type: 'todos/ADD';
  payload: Todo[];
};

const addTodo = (todos: Todo[]):AddTodoAction => ({
  type: 'todos/ADD',
  payload: todos,
});

export const actions = { addTodo };

const todosReducer = (state: Todo[] = [], action: AddTodoAction):
Todo[] => {
  switch (action.type) {
    case 'todos/ADD':
      return [...action.payload];
    default:
      return state;
  }
};

export default todosReducer;
