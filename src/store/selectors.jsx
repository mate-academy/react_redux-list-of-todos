
export const getUserId = state => state.userReducer.selectedUser;
export const getUserProfile = state => state.userReducer.user;
export const sortByCategory = state => state.todosReducer.sortedBy;
export const fetchedTodos = state => state.todosReducer.cachedTodos;
