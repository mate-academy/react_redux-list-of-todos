// eslint-disable-next-line
/// <reference types="react-scripts" />
interface Ikey {
  [key: string]: T;
}

interface Todo extends Ikey {
  id: number;
  userId: number;
  title: string;
  completed: boolean;
  user?: User | undefined;
}

interface User extends Ikey {
  id: number;
  name: string;
  username: string;
  email: string;
  address: Address;
  phone: string;
  website: string;
  company: Company;
}

interface Address {
  street: string;
  suite: string;
  sity: string;
  zipcode: string;
  geo: Geo;
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
