import { createSelector } from 'reselect';

const selectTodos = state => state.todoList;
const selectUsers = state => state.userList;

export const selectTodoMap = createSelector(selectTodos, selectUsers, (todos, users) => {
  if(!todos || !users) {
    return null;
  }
  return todos.map(todo => ({...todo,
    user: users.find(user => user.id === todo.userId),
  }));
});

export const selectIsLoading = state => state.todoLoading || state.userLoading;
export const selectIsLoaded = state => state.todoList && state.userList;
