export const LOAD = 'load';
export const DISPLAY = 'display';
export const REMOVE = 'remove';
export const SORTING = 'sorting';

export function load() {
  return (dispatch) => {
    dispatch({
      type: LOAD,
    });
    Promise.all([
      fetch('https://jsonplaceholder.typicode.com/todos')
        .then(response => response.json()),
      fetch('https://jsonplaceholder.typicode.com/users')
        .then(response => response.json()),
    ]).then(([todos, users]) => {
      const todosData = todos.map((todo) => {
        const person = users.find(user => user.id === todo.userId);
        return {
          ...todo,
          status: todo.completed ? 'Completed' : 'In process',
          user: person,
          userName: person.name,
          userEmail: person.email,
        };
      });
      dispatch(display(todosData));
    });
  };
}

export function display(value) {
  return {
    type: DISPLAY,
    value,
  };
}

export function remove(index, todos) {
  const newTodos = [...todos];
  return {
    type: REMOVE,
    data: newTodos.filter(item => item.id !== index),
  };
}

export function sorting(field, todos) {
  const newTodos = [...todos];
  return {
    type: SORTING,
    data: newTodos.sort((a, b) => a[field].localeCompare(b[field])),
  };
}
