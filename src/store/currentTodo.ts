import { Todo } from '../types/Todo';

type TodoAction = {
  type: 'SET_TODO',
  todo: Todo,
};

export const todoState: Todo = {
  id: 0,
  title: '',
  completed: false,
  userId: 0,
};

export const actions = {
  setTodos: (todo: Todo) => ({ type: 'SET_TODO', todo }),
};

const todoReducer = (todo = todoState, action: TodoAction): Todo => {
  switch (action.type) {
    case 'SET_TODO':
      return action.todo;
    default:
      return todo;
  }
};

export default todoReducer;
