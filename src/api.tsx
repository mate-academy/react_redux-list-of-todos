
import { WithUserTodo, Todo, User } from './types';

const baseURL = "https://mate-academy.github.io/react_dynamic-list-of-todos/api/"

export const getUsers = () => {
  return fetch(baseURL + "users.json")
    .then(responce => responce.json())
}
export const getTodos = () => {
  return fetch(baseURL + "todos.json")
    .then(responce => responce.json())
}

export const getWithUserTodos = () => {
  return Promise.all([getUsers(), getTodos()]).then(([users, todos]) => {
    const withUserTodos: WithUserTodo[] = todos.map((todo: Todo) => {
      return ({
        ...todo,
        user: users.filter((user: User) => user.id === todo.userId)[0]
      })
    })
    return withUserTodos;
  })
}



