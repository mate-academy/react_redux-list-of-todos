export interface Todo {
  id: number,
  userId: string,
  completed: boolean,
  title: string,
  createdAT: string,
  updatedAt: string,
}

export interface User {
  id: number,
  name: string,
  username: string,
  email: string,
  phone: string,
}
