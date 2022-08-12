export interface Todo {
  id: number,
  createdAt: string,
  updatedAt: string,
  userId: number,
  title: string,
  completed: boolean,
}

export interface User {
  id: number,
  createdAt: string,
  updatedAt: string,
  name: string,
  username: string,
  email: string,
  phone: string,
  website: string,
}
