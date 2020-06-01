
export type RootState = {
  loading: boolean;
  buttonText: string;
  todos: Todo[];
  users: User[];
  sortField: string;
  withUserTodos: WithUserTodo[];
  isLoaded: boolean;
};

export interface User {
  id: 1;
  name: string;
  username: string;
  email: string;
  address: Address;
  phone: string;
  website: string;
  company: Company;
}

export interface Todo {
  [key: string]: any;
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

export interface WithUserTodo extends Todo {
  'user': User;
}

export interface Address {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: Geo;
}

export interface Company {
  name:string;
  catchPhrase: string;
  bs: string;
}

export interface Geo {
  lat: string;
  lng: string;
}
