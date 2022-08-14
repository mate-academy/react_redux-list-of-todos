import { Todo } from '../types/Todo';

type SelectTodo = {
  type: 'SELECT_TODO'
  todo: Todo
};

type UnSelectTodo = {
  type: 'UNSELECT_TODO'
};

type TodoAction = (SelectTodo | UnSelectTodo);

export const actions = {
  selectTodo: (todo: Todo) => ({
    type: 'SELECT_TODO',
    todo,
  }),

  unSelectTodo: () => ({
    type: 'UNSELECT_TODO',
  }),
};

const todoReduser = (todo = null, action: TodoAction): Todo | null => {
  switch (action.type) {
    case 'SELECT_TODO':
      return action.todo;

    case 'UNSELECT_TODO':
      return null;

    default:
      return todo;
  }
};

export const selectors = {
  selectedTodo: (todo: Todo) => todo,
};

export default todoReduser;
