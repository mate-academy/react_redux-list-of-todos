
import {CustomTodo, Todo, User} from './types';

export const getUsers = () => {
  return fetch("https://mate-academy.github.io/react_dynamic-list-of-todos/api/users.json")
    .then(responce => responce.json())
    .then(users => users)
}
export const getTodos = () => {
  return fetch("https://mate-academy.github.io/react_dynamic-list-of-todos/api/todos.json")
    .then(responce => responce.json())
    .then(todos=> todos )
}

export const getCustomTodos = () => {
  return Promise.all([getUsers(), getTodos()]).then(([users, todos]) => {
    console.log(users, todos)
      const customTodos: CustomTodo[] = todos.map((todo:Todo) => {
        return ({
          ...todo,
          user: users.filter((user:User) => user.id === todo.userId)[0]
        })
      })
      return customTodos;

  })
}



