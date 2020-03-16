interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

interface Geo {
  lat: string;
  lng: string;
}

interface Address {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: Geo;
}

interface Company {
  name: string;
  catchPhrase: string;
  bs: string;
}

interface User {
  id: number;
  username: string;
  email: string;
  adress: Address;
  phone: string;
  website: string;
  company: Company;
}

interface PreparedTodo extends Todo {
  user: User;
}
