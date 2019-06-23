export const LOAD = 'load';
export const DISPLAY = 'display';
export const REMOVE = 'remove';
export const SORTING = 'sorting';

export function load() {
  return (dispatch) => {
    dispatch({
      type: LOAD,
    });

    function loadUrl(url) {
      return fetch(url)
        .then(response => response.json())
        .then(data => data);
    }

    Promise.all([
      loadUrl('https://jsonplaceholder.typicode.com/todos'),
      loadUrl('https://jsonplaceholder.typicode.com/users')
    ])
      .then(([todos, users]) => {
        const data = todos.map((todosItem) => ({
          ...todosItem,
          completed: todosItem.completed ? 'completed' : 'working',
          user: users.find(user => todosItem.userId === user.id),
          author: users.find(user => todosItem.userId === user.id).name
        }))
        dispatch(display(data));
      });
  };
}

export function display(data) {
  return {
    type: DISPLAY,
    data,
  };
}

export function remove(data, index) {
  const newData = [...data];
  return {
    type: REMOVE,
    data: newData.filter(item => item.id !== index),
  };
}

export function sorting(data, field) {
  const newData = [...data];
  return {
    type: SORTING,
    data: newData.sort((a, b) => a[field].localeCompare(b[field])),
  };
}
