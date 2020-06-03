// eslint-disable-next-line
/// <reference types="react-scripts" />

interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: Address;
  geo: Geo;
}

interface Address {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
}

interface Geo {
  lat: string;
  lng: string;
}

interface PrepareTodo {
  userId: User;
  id: number;
  title: string;
  completed: boolean;
}
