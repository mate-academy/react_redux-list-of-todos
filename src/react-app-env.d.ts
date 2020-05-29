// eslint-disable-next-line
/// <reference types="react-scripts" />
interface RootState {
  loading: boolean;
  loaded: boolean;
  sortType: string;
  isReverse: boolean;
  todos: Todo[];
}

interface Address {
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
  [key: string]: number | string | Address | Company;
  username: string;
  address: Address;
  company: Company;
}

interface Todo {
  [key: string]: number | string | boolean | User;
  title: string;
  id: number;
  userId: number;
  user: User;
  completed: boolean;
}
