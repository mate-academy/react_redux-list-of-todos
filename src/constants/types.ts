export interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

interface Address {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: Geo;
}

interface Geo {
  lat: string;
  lng: string;
}

interface Company {
  name: string;
  catchPhrase: string;
  bs: string;
}

export interface UserInterface {
  id: number;
  name: string;
  username: string;
  email: string;
  address: Address;
  phone: string;
  website: string;
  company: Company;
}

export interface TodoWithUser extends Todo{
  user: UserInterface;
}

export interface State {
  todos: TodoWithUser[];
  isLoading: boolean;
}
