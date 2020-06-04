// eslint-disable-next-line
/// <reference types="react-scripts" />
type RootState = {
  todos: Todo[];
  loading: boolean;
  loaded: boolean;
  sortBy: string;
  isReversed: boolean;
  error: string;
};

interface User {
  id: number;
  name: string;
  email: string;
  address: Address;
  geo: Geo;
  phone: string;
  website: string;
  company: Company;
}

interface TodoFromServer {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
  user: User;
}

interface Address {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
}

interface Company {
  name: string;
  catchPhrase: string;
  bs: string;
}

interface Geo {
  lat: string;
  lng: string;
}

interface Sorts {
  id: number;
  name: string;
  title: string;
}
