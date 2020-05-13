import {
  AppState,
  TodoWithUser,
  Todo,
  User,
} from '../constants/types';

import {
  loadTodos,
  loadUsers,
} from './api';


const sortTodosByTitle = (todos: TodoWithUser[]): TodoWithUser[] => {
  return todos
    .slice()
    .sort((todoA, todoB) => {
      return todoA.title >= todoB.title
        ? 1
        : -1;
    });
};

const sortTodosByCompleteness = (todos: TodoWithUser[]): TodoWithUser[] => {
  return todos
    .slice()
    .sort((todoA, todoB) => {
      return +todoA.completed >= +todoB.completed
        ? 1
        : -1;
    });
};

const sortTodosByName = (todos: TodoWithUser[]): TodoWithUser[] => {
  return todos
    .slice()
    .sort((todoA, todoB) => {
      return todoA.user.name >= todoB.user.name
        ? 1
        : -1;
    });
};

export const getSortedTodos = (state: AppState): TodoWithUser[] => {
  const {
    todos,
    sortOption,
  } = state;

  switch (sortOption) {
    case 'title':
      return sortTodosByTitle(todos);
    case 'completeness':
      return sortTodosByCompleteness(todos);
    case 'name':
      return sortTodosByName(todos);
    default:
      return todos;
  }
};

export const getTodos = async () => {
  const [initialTodos, initialUsers] = await Promise.all([
    loadTodos(),
    loadUsers(),
  ]);

  const todos = initialTodos.map((todo: Todo) => {
    return {
      ...todo,
      user: initialUsers.find(
        (currentUser: User) => currentUser.id === todo.userId,
      ) as User,
    };
  });

  return todos;
};
