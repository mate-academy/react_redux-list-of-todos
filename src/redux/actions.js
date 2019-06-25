export const LOAD_DATA = 'load_data';
export const FILL_DATA = 'fill_data';
export const REMOVE_TODO = 'remove_todo';
export const SORT_TODOS = 'sort_todos';

export function load() {
  return dispatch => {
    dispatch({
        type: LOAD_DATA
    });

    Promise.all([
      fetch('https://jsonplaceholder.typicode.com/todos')
        .then(res => res.json()),
      fetch('https://jsonplaceholder.typicode.com/users')
        .then(res => res.json())
    ])
    .then(([todos, users]) => {
      const todosData = todos.map((todo) => {
        const owner = users.find(user => todo.userId === user.id);
        return {
          ...todo,
          status: todo.completed ? 'completed' : 'not completed',
          user: owner,
          userName: owner.name,
          userEmail: owner.email
        }
      });
      dispatch(fillData(todosData));
    })
  }
}

export function fillData(data) {
  return {
    type: FILL_DATA,
    data
  }
}

export function removeTodo(index) {
  return {
    type: REMOVE_TODO,
    index
  }
}

export function sortTodos(field) {
  return {
    type: SORT_TODOS,
    field
  }
}
