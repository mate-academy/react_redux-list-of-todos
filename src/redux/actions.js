export const REMOVE_ITEM = 'remove_item';
export const LOAD_DATA = 'load_data';
export const DISPLAY = 'display';
export const SORT = 'sort';

export function removeClicked(id) {
  return {
    type: REMOVE_ITEM,
    id
  }
}

export function loadData() {
  return (dispatch) => {
    dispatch({
      type: LOAD_DATA
    });
    
    const requests = ['todos', 'users'];
    const data = {};
    
    requests.forEach((item) => {
      const request = new XMLHttpRequest();
      request.open('GET', `https://jsonplaceholder.typicode.com/${item}`);
      request.addEventListener('load', () => {
      data[item] = JSON.parse(request.response);
        if (data.todos && data.users) {
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
        }
      });
      request.send();
    });
  }
}

export function display(data) {
  return {
    type: DISPLAY,
    data
  }
}

export function sort(data) {
  return {
    type: SORT,
    data
  }
}

