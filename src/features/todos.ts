import { Todo } from '../types/Todo';

type TodosAction = { type: 'todos/GET', todos: Todo[] };

const setTodo = (todos: Todo[]): TodosAction => ({
  type: 'todos/GET',
  todos,
});

export const actions = { setTodo };

const todosReducer = (todos: Todo[] = [], action: TodosAction): Todo[] => {
  switch (action.type) {
    case 'todos/GET':
      return action.todos;
    default:
      return todos;
  }
};

export default todosReducer;
