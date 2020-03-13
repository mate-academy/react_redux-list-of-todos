export interface TodoType {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

export interface UserType {
  id: number;
  name: string;
  username: string;
  email: string;
  address: AddressType;
  phone: string;
  website: string;
  company: CompanyType;
}

interface AddressType {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: GeoType;
}

interface GeoType {
  lat: number;
  lng: number;
}

interface CompanyType {
  name: string;
  catchPhrase: string;
  bs: string;
}

export interface PreparedTodoType extends TodoType {
  user: UserType;
}

export interface StoreType {
  todos: PreparedTodoType[];
  isLoading: boolean;
  isLoaded: boolean;
  sortField: string;
}
