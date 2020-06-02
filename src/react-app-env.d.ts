// eslint-disable-next-line
/// <reference types="react-scripts" />

interface User {
  id: number | string;
  name: string;
  email: string;
  address: Address;
  phone: string;
  website: string;
  company: Company;
}

interface ToDo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

interface Geo {
  [key: string]: string;
}

interface Address {
  [key: string]: string;
  geo: Geo;
}

interface Company {
  [key: string]: string;
}

interface PreparedTodos extends ToDo {
  user: User;
}
