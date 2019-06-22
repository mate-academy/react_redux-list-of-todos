export const REQUESTED = 'requested';
export const DISPLAY_USERS = 'users_ready';
export const DISPLAY_TODOS = 'todos_ready';
export const FILTER_CHANGED = 'new_filter';
export const REMOVE_TODO_ITEM = 'remove_Item';

export function handleClick() {
  return (dispatch) => {
    dispatch({
      type: 'requested',
    });

    loadData();

    async function loadData() {
      const url = 'https://jsonplaceholder.typicode.com/';
      const usersPromise = fetch(`${url}users`);
      const todosPromise = fetch(`${url}todos`);

      const [
        usersResponse,
        todosResponse,
      ] = await Promise.all([
        usersPromise,
        todosPromise,
      ]);

      const users = await usersResponse.json();
      const todos = await todosResponse.json();

      const payloadTodos = {
        loadedTodos: true,
        todos,
        filteredTodos: todos,
      };

      const payloadUsers = {
        loadedUsers: true,
        users,
      };

      dispatch(displayTodos(payloadTodos));
      dispatch(displayUsers(payloadUsers));
    }
  };
}

export function filterChanged(payload) {
  return {
    type: FILTER_CHANGED,
    payload,
  };
}

export function displayUsers(payloadUsers) {
  return {
    type: DISPLAY_USERS,
    payload: payloadUsers,
  };
}

export function displayTodos(payloadTodos) {
  return {
    type: DISPLAY_TODOS,
    payload: payloadTodos,
  };
}

export function removeTodoItem(payload) {
  return {
    type: REMOVE_TODO_ITEM,
    payload,
  };
}
