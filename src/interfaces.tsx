export interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

interface Geo {
  lat: string;
  lng: string;
}

interface Address {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: Geo;
}

export interface User {
  id: number;
  name: string;
  userName: string;
  email: string;
  address: Address;
}

export interface PreparedTodo extends Todo {
  user: User;
}

export interface State {
  todos: PreparedTodo[];
}
