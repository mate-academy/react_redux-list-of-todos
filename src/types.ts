export interface Todo {
  userId: number
  id: number
  title: string
  completed: boolean
}

export interface Geo {
  lat: string
  lng: string
}

export interface Сompany {
  name: string
  catchPhrase: string
  bs: string
}

export interface Adress {
  street: string
  suite: string
  city: string
  zipcode: string
  geo: Geo
}

export interface User {
  id: number
  name: string
  username: string
  email: string
  address: Adress
  phone: string
  website: string
  company: Сompany
}

export interface PreparedTodo {
  userId: number
  id: number
  title: string
  completed: boolean
  user: User | undefined
}
