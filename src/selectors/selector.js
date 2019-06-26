const selectTodosWithUsers = (state) => {
  const usersMap = state.users.reduce((acc, user) => ({ ...acc, [user.id]: user }), {});
  return state.todos.map(todo => ({ ...todo, user: usersMap[todo.userId] }));
};

const selectUsers = (state) => {
  return state.users.reduce((acc, user) => ({ ...acc, [user.id]: user }), {});
};

const selectLoading = state => {
  return state.usersLoading || state.todosLoading;
};

const selectLoaded = state => {
  return state.usersLoaded || state.todosLoaded;
};
const selectError = state => {
  return state.todosError || state.usersError;
};

export {
  selectTodosWithUsers,
  selectUsers,
  selectLoading,
  selectLoaded,
  selectError
}
