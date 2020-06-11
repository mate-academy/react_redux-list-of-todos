const apiUrl = 'https://mate-academy.github.io/react_dynamic-list-of-todos/api'


const getAll = <T>(url: string): Promise<T[]> => {
  return fetch(`${apiUrl}${url}.json`).then(res => res.json())

}

export const getTodos = () => getAll<Todo>('/todos');
export const getUsers = () => getAll<User>('/users');

