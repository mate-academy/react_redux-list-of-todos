// действия только описывают то, что произошло, но не описывают, как изменяется состояние приложения
export const LOAD = 'load';
export const DISPLAY = 'display';
export const REMOVE = 'remove';
export const SORT = 'sort';

export function load() {
  return (dispatch) => {
    dispatch({
      type: LOAD
    });

    Promise.all([
      fetch('https://jsonplaceholder.typicode.com/todos')
        .then(response => response.json()),
      fetch('https://jsonplaceholder.typicode.com/users')
        .then(response => response.json())
    ])
      .then(([todos, users]) => {
        const todosList = todos.map(todo => {
          const user = users.find(user => todo.userId === user.id);
          return {
            ...todo,
            user,
            name: user.name,
            email: user.email
          }
        });
        dispatch(display(todosList));
      })
  };

}

export function display(data) {
  return {
    type: DISPLAY,
    data
  };
}

export function removeTheItem(index) {
  return {
    type: REMOVE,
    index
  }
}

export function sortData(field) {
  return {
    type: SORT,
    field
  }
}
