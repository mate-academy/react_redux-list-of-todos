const API_URL = 'https://mate-academy.github.io/react_dynamic-list-of-todos/api';

const loadAllData = <T>(url: string): Promise<T[]> => {
  return fetch(`${API_URL}${url}.json`)
    .then(response => response.json());
};

export const loadUsers = () => loadAllData<User>('/users');
export const loadTodos = () => loadAllData<Todo>('/todos');
