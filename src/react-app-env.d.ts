// eslint-disable-next-line
/// <reference types="react-scripts" />

interface Geo {
  lat: string;
  lng: string;
}

interface Company {
  name: string;
  catchPhrase: string;
  bs: string;
}

interface Address {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: Geo;
}

interface PersonFromServer {
  name: string;
  id: number;
  username: string;
  email: string;
  address: Address;
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
  user: PersonFromServer | '';
}
