import { createSelector } from 'reselect';

export const prepareTodos = (todos: Todo[], users: User[]): Todo[] => {
  const usersMap = users.reduce<Record<number, User>>((acc, user) => ({
    ...acc,
    [user.id]: user,
  }), {});

  return todos.map((todo) => {
    return {
      ...todo,
      user: usersMap[todo.userId] as User,
    };
  });
};

const selectTodos = (state: TodoState) => state.todos;
const selectUsers = (state: TodoState) => state.users;

export const selectTodosWithUser = createSelector(
  selectTodos,
  selectUsers,
  (todos, users) => {
    return users.length
      ? prepareTodos(todos, users)
      : [];
  },
);
