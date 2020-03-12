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


export const SET_TODOS = 'SET_TODOS';
export const SET_LOADING = 'SET_LOADING';
export const SET_DELETE = 'SET_DELETE';
export const SORT_BY_TITLE = 'SORT_BY_TITLE';
export const SORT_BY_NAME = 'SORT_BY_NAME';
export const SORT_BY_ID = 'SORT_BY_ID';
export const SORT_BY_STATUS = 'SORT_BY_STATUS';
