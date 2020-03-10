// eslint-disable-next-line
/// <reference types="react-scripts" />

interface Adress {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: {
    lat: string;
    lng: string;
  };
}

interface Company {
  name: string;
  catchPhrase: string;
  bs: string;
}

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: Adress;
  phone: string;
  website: string;
  company: Company;
}

interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

interface TodoWithUser extends Todo{
  user: User;
}
