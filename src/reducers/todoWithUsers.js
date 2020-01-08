const initialState = {
  todosWithUsers: [],
  isLoadingStart: false,
  isDataLoaded: false,
};

export default function todosWithUsers(state = initialState, action) {
  switch (action.type) {
    case 'TODOS_WITH_USERS_FETCH_DATA_SUCCESS':
      return {
        isLoadingStart: false,
        isDataLoaded: true,
        todosWithUsers: action.todosWithUsers,
      };

    case 'IS_LOADING_START':
      return {
        ...state,
        isLoadingStart: true,
      };

    case 'DELETE_TODO':
      console.log(todosWithUsers);
      return {
        ...state,
        todosWithUsers: state.todosWithUsers.filter(todo => (
          todo.id !== action.payload)),
      };

    default:
      return state;
  }
}
