import { Todo } from '../types/Todo';

type TodoAction = {
  type: 'SET_TODO',
  todo: Todo,
};

export type TodoType = {
  id: number,
  title: string,
  completed: boolean,
  userId: number,
};

export const todoState: TodoType = {
  id: 0,
  title: '',
  completed: false,
  userId: 0,
};

export const actions = {
  setTodos: (todo: Todo) => ({ type: 'SET_TODO', todo }),
};

const todoReducer = (todo = todoState, action: TodoAction): TodoType => {
  switch (action.type) {
    case 'SET_TODO':
      return action.todo;
    default:
      return todo;
  }
};

export default todoReducer;
