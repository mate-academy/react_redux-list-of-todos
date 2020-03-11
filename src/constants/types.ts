export interface AppState {
  isLoading: boolean;
  todos: TodoWithUser[];
  dataWasLoaded: boolean;
  sortOption: SortOption;
}

export interface Todo {
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

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: Address;
  phone: string;
  website: string;
  company: Company;
}

export interface TodoWithUser extends Todo {
  user: User;
}

export type SortOption = 'title' | 'completeness' | 'name' | 'default';

export interface IsLoadingAction {
  type: string;
  payload: boolean;
}

export interface DataWasLoadedAction {
  type: string;
}

export interface SortOptionAction {
  type: string;
  payload: string;
}

export interface LoadDataAction {
  type: string;
  payload: TodoWithUser[];
}

export interface DeleteTodoAction {
  type: string;
  payload: number;
}

export type TodosAction = LoadDataAction | DeleteTodoAction;
