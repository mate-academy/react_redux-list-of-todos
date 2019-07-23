export const LOAD_DATA = 'load_data';
export const REMOVE_ITEM = 'remove_item';
export const DISPLAY_DATA = 'display_data';
export const SORT_DATA = 'sort_data';

export function loadData() {
  return (dispatch) => {
    dispatch({
      type: LOAD_DATA,
    });

    Promise.all([
      fetch('https://jsonplaceholder.typicode.com/todos')
        .then(response => response.json()),
      fetch('https://jsonplaceholder.typicode.com/users')
        .then(response => response.json()),
    ])
      .then(([todos, users]) => {
        const todosData = todos.map((todo) => {
          const user = users.find(user => todo.userId === user.id);
          return {
            ...todo,
            status: todo.completed ? 'completed' : 'not completed',
            user,
            userName: user.name,
            userEmail: user.email,
          };
        });
        dispatch(displayData(todosData));
      });
  };
}

export function displayData(data) {
  return {
    type: DISPLAY_DATA,
    data,
  };
}

export function removeItem(id) {
  return {
    type: REMOVE_ITEM,
    id,
  };
}

export function sortData(string) {
  return {
    type: SORT_DATA,
    string,
  };
}
