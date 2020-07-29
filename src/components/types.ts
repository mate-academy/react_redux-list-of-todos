export interface Geo {
  lat?: string;
  lng?: string;
}

export interface Company {
  name?: string;
  catchPhrase?: string;
  bs?: string;
}

export interface Address {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: Geo;
  phone?: string;
  website?: string;
  company?: Company;
}

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: Address;
}

export interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

export interface PreparedTodo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
  user: User | undefined;
}

export interface Props {
  preparedTodos: PreparedTodo[];
}

export interface UserProps {
  name: string | undefined;
}
