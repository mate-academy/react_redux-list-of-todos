import { TodoType, UserType, TodoWithUsers } from './interfaces';

export const todosWithUsers = (todos: TodoType[], users: UserType[]) => {
  return todos.map((todo) => {
    const user = users.find((person) => person.id === todo.userId) as UserType;

    return {
      ...todo,
      user,
    };
  });
};

export const sortTodos = (field: string, todos: TodoWithUsers[]) => {
  switch (field) {
    case 'sortByTitle':
      return [...todos].sort((a, b) => a.title.localeCompare(b.title));
    case 'sortByName':
      return [...todos]
        .sort((a, b) => a.user.name.localeCompare(b.user.name));
    case 'sortByCompleted':
      return [...todos].sort((a, b) => b.completed.toString()
        .localeCompare(a.completed.toString()));
    default:
      return todos;
  }
};
