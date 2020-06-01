interface TodoFromServer {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
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

interface Address {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: Geo;
}

interface UserFromServer {
  id: number;
  name: string;
  username: string;
  email: string;
  address: Address;
  phone: string;
  website: string;
  company: Company;
}

interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
  userCatalog: UserFromServer;
}

interface Button {
  id: number;
  title: string;
  event: (sortType: string) => void;
  sortType: string;
}
