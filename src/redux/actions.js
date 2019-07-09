export const REMOVE_ITEM = 'remove_item';
export const LOAD_DATA = 'load_data';
export const DISPLAY = 'display';
export const SORT = 'sort';

export function removeClicked(id) {
  return {
    type: REMOVE_ITEM,
    id,
  }
}

export function loadData() {
  return (dispatch) => {
    dispatch({
      type: LOAD_DATA
    });

    const requests = ['todos', 'users'];
    const data = {};

    Promise.all([
      fetch('https://jsonplaceholder.typicode.com/todos').
        then(response => response.json()),
      fetch('https://jsonplaceholder.typicode.com/users').
        then(response => response.json())
    ]).then(response => {
      data.todos = response[0];
      data.users = response[1];
      
      const items = [];
        for (const todoItem of data.todos) {
          const tableRowItem = {};
          tableRowItem.completed = todoItem.completed ? 'completed' : 'not completed'
          const user = data.users.find(user => user.id === todoItem.userId);
          tableRowItem.id = todoItem.id;
          tableRowItem.title = todoItem.title;
          tableRowItem.author = user.name;
          tableRowItem.email = user.email;
          items.push(tableRowItem);
        }
      dispatch(display(items));
    });
  }
}

export function display(data) {
  return {
    type: DISPLAY,
    data,
  }
}

export function sort(data) {
  return {
    type: SORT,
    data,
  }
}
